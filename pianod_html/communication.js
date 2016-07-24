/* pianod web client - communication class
   Copr. 2013-2015 Perette Barella/Devious Fish
   All rights reserved.
*/


/* Message number definitions */
MSG = {
	PLAYING: 1,
	PAUSED: 2,
	STALLED: 3,
	TRACKCOMPLETE: 4,
	INTERTRACK: 5,
	IDLE: 6,
	
	STOPPED: 7,
	REQUESTS: 8,
	RANDOMPLAY: 9,
	
	SELECTEDSOURCE: 11,
	SELECTEDPLAYLIST: 12,

	MIX_CHANGED: 21,
	PLAYLISTS_CHANGED: 22,
	USERRATINGS_CHANGED: 23,
	SOURCES_CHANGED: 24,

	YELL: 31,
	ACTIVITY: 32,
	STATUS: 33,
	SOURCESTATUS: 34,
	QUEUERANDOMIZE: 41,

	WELCOME: 100,

	ID: 111,
	ALBUM: 112,
	ARTIST: 113,
	SONG: 114,
	PLAYLIST: 115,
	RATING: 116,
	URL: 117,
	ART: 118,
	GENRE:119,
	PLAYLISTRATING:120,
	EXPLANATION:121,
	OWNER:122,
	SOURCE:123,
	NAME:124,
	YEAR:125,
	DURATION:126,
	ACTIONS:127,
	INFO:132,
	PRIVILEGES: 136,
	VOLUME: 141,
	HISTORYSIZE: 142,
	AUDIOQUALITY: 143,
	AUTOTUNE_MODE: 144,
	PAUSE_TIMEOUT: 146,
	PLAYLIST_TIMEOUT: 147,

	PROXY: 161,
	CONTROLPROXY: 162,
	RPCHOST: 163,
	RPCTLSPORT: 164,
	PARTNERUSER: 165,
	PARTNERPASSWORD: 166,
	DEVICE: 167,
	ENCRYPTION_PASSWORD: 168,
	DECRYPTION_PASSWORD: 169,
	SOURCE_USER: 170,
	SOURCE_PASSWORD: 171,
	TLSFINGERPRINT: 172,
	OUTPUT_DRIVER: 181,
	OUTPUT_DEVICE: 182,
	OUTPUT_ID: 183,
	OUTPUT_SERVER: 184,

	S_OK: 200,
	DATA_START: 203,
	DATA_END: 204,
	S_MATCH:206,
	S_ROUNDING: 207,
	S_PENDING: 210,

	EVENT_START: 0,
	EVENT_END: 99,
	INFO_START: 100,
	INFO_END: 199,
	SUCCESS_START: 200,
	SUCCESS_END: 299,
	DIAG_START: 300,
	DIAG_END: 399,
	ERROR_START: 400,
	WRONG_STATE: 405,
	ERROR_END: 499,
	FAILURE_START: 500,
	FAILURE_PLAYER_EMPTY: 501,
	FAILURE_END: 599
};


/* Open a connection to pianod.
   wsurl - Websocket URL is required.
   username, password - If not given, operates without authentication (guest).
*/
function PianoConnection (piano_url, successcb, disconnectcb) {
	/* Constants */
	var STATE = {
		COMMAND: 1,
		DISCRETE: 2
	};
	var PARSE_RULES = {
		111: { name: 'id' },
		112: { name: 'album' },
		113: { name: 'artist' },
		114: { name: 'song' },
		115: { name: 'playlist' },
		116: {
			name: 'rating',
			words: [ 'seed', 'albumseed', 'artistseed' ]
		},
		117: { name: 'url' },
		118: { name: 'art' },
		119: { name: 'genre' },
		120: {
			name: 'playlistrating',
			words: [ ]
		},
		121: { name: 'explanation' },
		122: { name: 'owner' },
		123: { name: 'source' },
		124: { name: 'sourcename' },
		125: { name: 'year' },
		126: { name: 'duration' },
		127: {
			name: 'action',
			words: [ 'rate', 'request', 'seed', 'albumseed', 'artistseed' ]
		},
		132: { name: 'info' },
		136: {
			name: 'privilege',
			words: ['disabled', 'guest', 'listener', 'admin', 'user',
				   'service', 'influence', 'tuner' ]
		},
		148: { name: 'room' }
	};

	/* Private variables */
	var debug = false;
	// assert (debug = true);			// Stripped on release, ensuring debug mode is off
	var commands = { 0: { 'id': 0, 'command':'connect', 'handler': successcb||'' } };
	var commandid = 1;				/* Increments when command sent */
	var responseid = 0;				/* Increments on response, to match req/resp */
	var response;					/* Collects response */
	var record = { };				/* Received records bits */
	var subscriptions = { };		/* Message subscriptions */
	var backissues = { };			/* Previous statuses */
	var close_functions = [ ];		/* Things to call on close */
	var state = STATE.DISCRETE;
	var socket = new WebSocket (piano_url);

	/* Private functions */
	function empty_response () {
		// basic_response = { code#, tag, text, value, words, optional { wordflags } }
		return {
			// code					// 2xx/4xx response
			// ok					// Set to true if 2xx response
			// tag, text, etc.		// basic response stuff
			diagnostics: [ ],		// 3xx messages
			data: [ ],				// # -> { basic_response}
			record: [ ],				// name -> value
		};
	}
	
	function isNumeric(str) {
		return !isNaN (parseFloat (str)) && isFinite (str);
	}
	
	function basic_response (message) {
		var msg = {
			code: parseInt (message.substring (0, 3), 10),
			text: message.substring (4)
		};
		var pieces = msg.text.split (': ');
		msg.tag = pieces [0];
		msg.rawvalue = pieces.splice (1).join (': ');	/* Remove first piece */
		msg.words = msg.rawvalue.split (/\s+/);
		if (msg.code in PARSE_RULES &&
			'words' in PARSE_RULES [msg.code]) {
			var flags = PARSE_RULES [msg.code].words;
			msg.wordflags = { };
			for (var i = 0; i < flags.length; i++) {
				msg.wordflags [flags [i]] = (msg.words.indexOf (flags [i]) >= 0);
			}
			// If there are wordflags, there might be a rating.
			// Extract it if there is.
			if (msg.words.length >= 2 && isNumeric (msg.words [1])) {
				msg.wordflags.rated = parseFloat (msg.words [1]);
			}
		}
		msg.value = msg.wordflags || msg.rawvalue;
		return msg;
	}
	
	function merge (from, into) {
		for (var key in from) {
			assert (!(key in into));
			into [key] = from [key];
		}
	}
	
	function command_complete (msg) {
		var cmd = commands [responseid];
		if (typeof (cmd) == 'undefined') {
			alert ('Excess 200/400 Success/Failure responses received!');
			console.log ('Excess 200/400 Success/Failure responses received!');
		} else {
			delete commands [responseid++];
			msg.ok = (msg.code >= MSG.SUCCESS_START && msg.code <= MSG.SUCCESS_END);
			if (debug) {
				console.log ("Received response: ", msg);
			}
			assert (typeof (cmd.handler) == 'function');
			cmd.handler (msg);
		}
	}

	/** Extract the best data field and stick it in response.record.
	    Push the complete record in the data field, and reset. */
	function push_record () {
		var parsed = { };
		for (var field in record) {
			assert (field in PARSE_RULES);
			parsed [PARSE_RULES [field].name] = record [field].value;
		}
		response.data.push (record);
		response.record.push (parsed);
		record = { };
	}

	function receive_message (event) {
		if (debug) {
			console.log (event.data);
		}
		var msg = basic_response (event.data);

		if ((msg.code == MSG.DATA_START || msg.code == MSG.DATA_END) &&
			 Object.keys (record).length > 0) {
			 push_record ();
		}
		if (msg.code == MSG.DATA_START) {
			/* Start of data/start of record */
			state = STATE.COMMAND;
		} else if ((msg.code >= MSG.SUCCESS_START && msg.code <= MSG.SUCCESS_END) ||
				   (msg.code >= MSG.ERROR_START && msg.code <= MSG.ERROR_END)) {
			/* End of data/no data/command success/command failure */
			assert (Object.keys (record).length === 0);
			assert (response.data.length === 0 || msg.code == MSG.DATA_END);
			if (state == STATE.COMMAND && msg.code != MSG.DATA_END) {
				alert ('Received ' + msg.code + ' instead of ' + MSG.DATA_END);
				console.log ('Received ', msg.code, ' instead of ', MSG.DATA_END);
				console.log ('Command: ', commands [responseid].command);
			}
			msg.command = commands [responseid].command;
			merge (msg, response);
			if (response.record.length == 1) {
				merge (response.record [0], response);
			}
			// Juggle so response is clear now, in case command handler
			// botches and doesn't return.
			msg = response;
			response = empty_response ();
			command_complete (msg);
			state = STATE.DISCRETE;
		}
		if (state == STATE.COMMAND &&
			msg.code >= MSG.INFO_START && msg.code <= MSG.ERROR_END) {
			/* Message is part of DATA */
			if (msg.code >= MSG.INFO_START && msg.code <= MSG.INFO_END) {
				if (msg.code in record) {
					/* Must be a single type list */
					assert (Object.keys (record).length == 1);
					push_record ();
				}
				record [msg.code] = msg;
			} else if (msg.code >= MSG.DIAG_START && msg.code <= MSG.DIAG_END) {
				response.diagnostics.push (msg);
			}
		} else {
			/* Message is spontaneous data, event or failure */
			/* If there are subscriptions for this code, deliver */
			var scripts = subscriptions [msg.code] || [];
			for (var i = 0; i < scripts.length; i++) {
				(scripts [i]) (msg);
			}
			/* Store a backissue to catch up new subscriptions */
			backissues [msg.code] = msg;
		}
	}

	function closed (event) {
		/* Call on_close functions in reverse registration order, */
		/* so last one will be the callback passed when instantiating */
		/* this class. */
		for (var i = close_functions.length - 1; i >= 0; i--) {
			close_functions [i] (event);
		}
	}

	response = empty_response();
	if (typeof (disconnectcb) == 'function') {
		close_functions.push (disconnectcb);
	}
	/* Set up the connection */
	socket.onmessage = function (event) {
		receive_message (event);
	};
	socket.onopen = function (event) {
		/* Do nothing: success will be reported via the success
		   callback when we get a 200 from the server. */
	};
	socket.onclose = function (event) {
		closed (event);
	};
	socket.onerror = function (event) {
		closed (event);
	};

	/* Return the public API, which will see all of
	   the above via the closure. */
	return ({
		'request_time_status': function () {
			socket.send (' ');
		},
		'send_command': function (command, func) {
			if (typeof (command) == 'object') {
				for (var i = 0; i < command.length; i++) {
					command [i] = command [i].toString().replace (/" /g, ' ');
				}
				command = '"' + command.join ('" "') + '"';
			}
			func = func || function () {};
			assert (typeof (func) == 'function');
			var cmd = {
				'id': commandid,
				'command': command,
				'handler': func
			};
			commands [commandid++] = cmd;
			socket.send (command);
		},
		'on_close': function (func) {
			close_functions.push (func);
		},
		'subscribe': function (response, func, ketchup) {
			if (typeof (response) != 'object') {
					response = [ response ];
			}
			if (typeof (ketchup) == 'undefined')
				ketchup = true;

			for (var i = 0; i < response.length; i++) {
				var code = response [i];
				if (!(code in subscriptions)) {
					subscriptions [code] = [ ];
				}
				subscriptions [code].push (func);
				if (debug) {
					console.log ('subscribed ', func, ' to ', code);
				}
				if (ketchup && code in backissues) {
					func (backissues [code]);
				}
			}
		},
		'is_success': function (code) {
			return (code >= MSG.SUCCESS_START && code <= MSG.SUCCESS_END);
		},
		'is_error': function (code) {
			return (code >= MSG.ERROR_START && code <= MSG.ERROR_END);
		},
		'get_sorted_column': function (response, field) {
			var data = [ ];
			// Extract the requested field from the response
			for (var i = 0; i < response.length; i++) {
				data.push (response [i][field]);
			}
			// Sort and return the data
			data.sort (function (a, b) {
				var alc = a.toLowerCase();
				var blc = b.toLowerCase();
				return (alc < blc ? -1 : alc > blc ? 1 : 0);
			});
			return data;
		},
		/** Sort an array of associative arrays.
			@param response The array of items to sort.
			@param fields The keys to sort on. */
		'sort_on_field': function (response, fields) {
			if (typeof (fields) != "object") {
				fields = [fields];
			}
			return response.sort (function (a, b) {
				for (var i = 0; i < fields.length; i++) {
					var alc = '', blc = '';
					if (fields [i] in a)
						alc = a [fields [i]].toLowerCase();
					if (fields [i] in b)
						blc = b [fields [i]].toLowerCase() || '';
					if (alc < blc) return -1;
					if (alc > blc) return 1;
				}
				return 0;
			});
		}
	});
}


PianodFinder = {
	'parse_query_strings': function () {
		var query_strings = { };
		var url = window.location.toString().split ('?');
		if (url.length > 1) {
			var pairs = url [1].split ('&');
			for (var i = 0; i < pairs.length; i++) {
				var param = pairs [i].split ('=');
				query_strings [param [0]] = param [1];
			}
		}
		return query_strings;
	},
	'get_url_info': function () {
		var url = window.location.toString().split ('?');
		if (url.length < 1) return;
		var result = { };
		result.url = url;

		var domains = url [0].split ('/');
		if (domains.length <= 3) return;

		result.service = domains [3] || '';
		result.path = domains.splice (3).join ('/');

		var scheme = domains [0];
		if (scheme != 'http:' && scheme != 'https:') return;
		result.scheme = scheme;
		result.secure = (scheme == 'https:');

		var domain = domains [2].toLowerCase();
		result.domain = domain;
		result.fromweb = domain.match ('deviousfish.com');
		return result;
	},
	'get_pianod_url': function () {
		var url = PianodFinder.get_url_info();
		if (typeof (url) == 'undefined') return;
		if (url.fromweb) return;
		return (url.secure ? 'wss://' : 'ws://') + url.domain + '/' + url.service;
	},
	'get_best_url': function () {
		var query_params = PianodFinder.parse_query_strings ();
		if ('server' in query_params) {
			var server = query_params.server;
			var room = query_params.room || 'pianod';
			if (typeof (server) != 'undefined' && server !== '') {
				return 'ws://' + server + '/' + room;
			}
		}
		var url = PianodFinder.get_pianod_url ();
		if (typeof (url) != 'undefined') return url;
		return 'ws://house.perette.barella.org:4446/pianod';
	}
};
