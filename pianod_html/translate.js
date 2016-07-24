/* pianod web client - internationalization/translation support
   Copr. 2015 Perette Barella/Devious Fish
   All rights reserved.
*/


function Translate () {
	/* Constants */
	var ERRORS = {


		200: "Success",
		203: "Start of data",
		204: "No data or end of data",
		206: "Match found",
		207: "Value has been approximated",
		210: "Command acknowledged but action is pending",
		300: "Detail",
		301: "Proxy settings invalid",
		303: "Invalid playlist",
		304: "Item not found",
		400: "Bad command",
		401: "Not authorized for requested action",
		402: "Action failed",
		403: "Already exists",
		404: "Requested item not found",
		405: "Action is not applicable to current state",
		406: "Invalid login or password",
		407: "Invalid parameter",
		408: "Playlist personalization failed",
		409: "Conflict encountered",
		410: "Temporary failure, future completion unknown",
		411: "Quota exceeded",
		412: "Must be logged in",
		413: "Not supported",
		414: "Insufficient resources",
		415: "Limit has been reached",
		416: "Operation only valid on primary playlists",
		417: "Wrong type for action",
		418: "Persistent expression or value required",
		460: "Action not supported by source",
		461: "Value is not supported by source",
		462: "Action not possible on media manager",
		498: "There is a bug in pianod",
		499: "Not implemented",
		500: "Internal server error",
		501: "Nothing to play",
		502: "Network failure",
		503: "Service shutting down",
		504: "Authentication failure",
		505: "Insufficent resources",
		507: "Error communicating with Pandora",
		508: "Command execution incomplete",
		509: "Permission denied",
		510: "Exception",
		511: "Network timeout",
		512: "Cannot open audio output",
		'Bogus': 'Bogosity'
	};




	var MESSAGES = {
		
		
		
		
		
		
		
		
		
		
		
		
		
			
		
		
		"No playlists": "",
			
		
		
		
		
		
		
		
		

		"PROMPT_OLD_PASSWORD": "Old password",
		"PROMPT_NEW_PASSWORD": "New password",
		"PROMPT_PIANOD_PASSWORD": "pianod password",
		"PROMPT_SYSTEM_PASSWORD": "System password",

		"HEADING_ALBUM": "Album",
		"HEADING_ARTIST": "Artist",
		"HEADING_SONG": "Title",
		"HEADING_GENRE": "Genre",
		"HEADING_TYPE": "Type",
		"HEADING_SEEDTYPE": "Seed Type",
		"HEADING_PLAYLIST": "Playlist",
		"HEADING_YEAR": "Year",
		"HEADING_ACTIONS": "Actions",
		"HEADING_DURATION": "Length",
		"HEADING_ACTION": "Actions",

		"ADDSOURCE_NULL_PATH": "Please specify path/folder for music.",

		'Bogus': 'Bogosity'
	};
	
	/* Private variables */

	/* Private functions */
	if (typeof (assert) == 'undefined') {
		var assert = function () { };
	}

	/* Return a function object, which will see all of
	   the above via the closure. */
	return (function (value) {
		if (typeof (value) == 'string') {
			// Translate a string
			var message = value in MESSAGES ? MESSAGES [value] : value;
			// Perform printf-style positional string substitutions.
			for (var i = 1; i < arguments.length; arguments++) {
				message = message.replace (RegExp ("%" + i + "\\$s", "g"), arguments [i]);
			}
			return message;
		}
		// Translate a Football comm response.
		assert (arguments.length == 1);
		assert (typeof (value) == 'object');
		assert ('code' in value);
		if (typeof (value) != 'object' || !('code' in value)) {
			return 'Bad translation request';
		}
		return (value.code in ERRORS ? ERRORS [value.code] : value.text);
	});
}


