<!DOCTYPE html>
<html lang="en-US">
<head>
<meta name="generator" content=
"HTML Tidy for HTML5 for Mac OS X version 5.1.25">
<meta charset="UTF-8">
<title>Utilidad de consola pianod2</title>
<meta name="viewport" content="width=device-width">
<meta name="application-name" content="pianod-console">
<link href="console.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="/Pianod/pianod-icon.gif">
<link rel="apple-touch-icon-precomposed" href=
"/Pianod/pianod-button.gif">
<script type="application/javascript" src=
"//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"
onload="jquery_loaded=true;">
</script>
<script type="application/javascript" src="console-engine.min.js">
</script>
</head>
<body>
<noscript>
<h1>Utilidad de consola pianod2</h1>
sentimos, se requiere Javascript para utilizar esta página.</noscript>
<div id="pianodconsole">
<div id="player" class="idle playing">
<div class="idle">Nada de jugar.</div>
<div class="playing">
<div id="playlistname"><span class="value">&nbsp;</span></div>
<a class="button" onclick="console.execute ('PLAY');" title=
"Resume">▶</a> <a class="button" onclick=
"console.execute ('PAUSE');" title="Pause">&nbsp;||&nbsp;</a>
<a id="skip" class="button" onclick="console.execute ('SKIP')"
title="Skip.">&nbsp;»&nbsp;</a>
<div id="albumcover"><img src="no-art.jpeg" id="albumart" alt=''
ondblclick="trackview.showart ();">
<div id="stalled" class="playbackstatus"><span>〈•••〉</span><br>
Reproducción estancó<br>
Compruebe la conexión de red </div>
<div id="paused" class="playbackstatus"><span>||</span><br>
Pausa</div>
<div id="controller">
<div id="statusbar">
<div id="progressbar" style="width:50%;"><span style=
"display:none;">&nbsp;</span></div>
</div>
</div>
</div>
<span id="timepoint" class="time">&nbsp;</span> <span id="duration"
class="time">&nbsp;</span>
<div id="trackname"><span class="value">&nbsp;</span></div>
<div id="artistname">by <span class="value">&nbsp;</span></div>
<div id="albumname">on <span class="value">&nbsp;</span></div>
<div id="songplaylist">from <span class="value">&nbsp;</span></div>
</div>
</div>
<div id="actions" class="playing idle">Sources:
<ul>
<li><a onclick=
"console.execute (['SOURCE', 'LIST', 'ENABLED']);">List</a></li>
<li><a onclick=
"console.execute (['SOURCE', 'LIST', 'AVAILABLE']);">Available</a></li>
<li><a onclick=
"console.execute (['SOURCE', 'SELECT', 'ID', '1']);">Manager</a></li>
</ul>
Play:
<ul>
<li><a onclick=
"console.execute (['PLAY', 'REQUEST']);">Requests</a></li>
<li><a onclick="console.execute (['PLAY', 'MIX']);">Mix</a></li>
<li><a onclick=
"console.execute (['PLAY', 'EVERYTHING']);">Everything</a></li>
<li><a onclick="console.execute ('STOP');">Stop</a></li>
<li><a onclick="console.execute (['STATUS']);">Status</a></li>
<li><a onclick=
"console.execute (['QUEUE', 'LIST']);">Queue</a></li>
<li><a onclick=
"console.execute (['HISTORY', 'LIST']);">History</a></li>
</ul>
Playlists:
<ul>
<li><a onclick=
"console.execute (['PLAYLIST', 'LIST']);">List</a></li>
<li><a onclick="console.execute (['MIX', 'LIST', 'INCLUDED']);">In
mix</a></li>
<li><a onclick=
"console.execute (['MIX', 'LIST', 'EXCLUDED']);">Omitted</a></li>
</ul>
Users:
<ul>
<li><a onclick="console.execute (['USERS', 'LIST']);">List</a></li>
<li><a onclick=
"console.execute (['USERS', 'ONLINE']);">Online</a></li>
</ul>
Other:
<ul>
<li><a onclick="console.execute ('QUIT');">Salir</a></li>
<li><a onclick=
"if (confirm ('Are you sure you want to shutdown pianod?')) console.execute ('SHUTDOWN');">
Apagado</a></li>
</ul>
</div>
<div class="offline">
<h1>Pianod2 Console utility</h1>
<p>No seleccionar un servidor por favor comunicado:</p>
<a id="here" class="button" onclick="login_here();" title=
"Connect to current host">Aquí</a> <input id=
"server1" class="server" type="text"> <input id="server2" class=
"server" type="text"> <input id="server3" class="server" type=
"text"> <input id="server4" class="server" type="text"> <input id=
"server5" class="server" type="text">
<p>Recuerde números de puerto! Especificar esquema (WSS: //) para usar TLS.</p>
<p><a href="index.html">Uso reproductor estándar</a> • <a href=
"viewer.html">Visor</a></p>
</div>
<div id="commandpane" class="playing idle"><input id="command1"
class="command password" type="password"> <input id="command2"
class="command" type="text"> <input id="command3" class="command"
type="text"> <input id="command4" class="command" type="text">
<input id="command5" class="command" type="text"> <a class="button"
onclick="console.previous_page();">↑</a> <a class="button" onclick=
"console.next_page();">↓</a> <input id="show111" class="switch"
type="checkbox" checked> <label for="show111">111</label>
<input id="show118" class="switch" type="checkbox" checked>
<label for="show118">118</label>
<div id="commandinput">Command <span id=
"page">&nbsp;</span>/<span id="pagecount">&nbsp;</span>:
<span class="value">&nbsp;</span> Result: <span class=
"result">&nbsp;</span></div>
<div id="commandoutput">
<p>Utilidad de consola pianod2<br>
Derechos de Autor 2011-2016 Fish Devious<br>
Todos los derechos reservados.<br>
Publicado bajo la licencia MIT.</p>
</div>
</div>
<div id="statuspane" class="playing idle"></div>
</div>
<script type="text/javascript">
        function login_here () {
            var url = PianodFinder.get_pianod_url();
            if (typeof (url) != 'undefined') {
                console = new PianodConsole (url);
                $('#here').show();
            }
        }

        var query_string = PianodFinder.parse_query_strings();
        var server = '';
        if ('server' in query_string) {
            server = query_string ['server'];
        }
        if (server == '') {
            login_here();
        } else {
            console = new PianodConsole ('ws://' + server + '/pianod');
        }
        
        // Wire up command inputs to trigger an action
        $('.server').keydown (function (event) {
            var keypressed = event.keyCode || event.which;
            if (keypressed == 13) {
                var server = $(this).val();
                localStorage [$(this).prop ('id')] = server;
                if (server.substr (0, 5) != 'ws://' &&
                    server.substr (0, 6) != 'wss://') {
                    server = 'ws://' + server;
                }
                console = new PianodConsole (
                        server + '/pianod?encoding=text');
            };
        });

        // Restore command values from local storage
        $('.server').each (function () {
            $(this).val (localStorage [$(this).prop ('id')]);
        });
</script>
</body>
</html>
