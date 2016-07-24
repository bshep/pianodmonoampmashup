<!DOCTYPE html>
<html lang="en-US">
<head>
<meta name="generator" content=
"HTML Tidy for HTML5 for Mac OS X version 5.1.25">
<meta charset="UTF-8">
<title>Control remoto Web  pianod</title>
<meta name="viewport" content="width=device-width">
<meta name="application-name" content="pianod">
<link href="client.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="pianod-icon.gif">
<link rel="apple-touch-icon-precomposed" href="pianod-button.gif">
<script type="application/javascript" src=
"//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"
onload="jquery_loaded=true;">
</script>
<script type="application/javascript" src="translate.js">
</script>
<script type="application/javascript" src="client-engine.min.js">
</script>
</head>
<body>
<noscript>
<h1>Control remoto Web  pianod</h1>
sentimos, se requiere Javascript para utilizar esta página.</noscript>
<div id="switcher" style="display:none;"><span class=
"trackcontrols"><a class="playpause privuser" onclick=
"execute ('PAUSE TOGGLE');" title=
"Pausar o reanudar la reproducción.">▶</a></span> <select id=
"sourcepicker" onchange="sourceview.select_source();">
<option value="1">media manager</option>
</select> <a class="handle" onclick=
"viewmanager.toggle_menu();">≣ Elija la visión</a>
<div class="menu"><a onclick=
"viewmanager.show ('source')">Fuentes</a> <a onclick=
"viewmanager.show ('track')">Track</a> <a onclick=
"viewmanager.show ('search')">Buscar</a> <a onclick=
"viewmanager.show ('playlist')">Listas</a> <a onclick=
"viewmanager.show ('seed')">Semillas</a> <a onclick=
"viewmanager.show ('activity')">Actividad</a> <a onclick=
"viewmanager.show ('user')">Usuarios</a> <a onclick=
"viewmanager.show ('admin')">Administrar</a> <a onclick=
"viewmanager.logout ()">Salir</a></div>
</div>
<div id="views">
<div id="loginview" style="display:none;">
<h1>Control remoto Web  pianod</h1>
<p>Derechos de Autor 2011-2016 Fish Devious<br>
Todos los derechos reservados.<br>
Publicado bajo la licencia MIT.</p>
<div id="serverinput"><label for=
"server">servidor</label> <input id="server" type="url"
maxlength="80" required="required" value=
"house.perette.barella.org:4446"> <input id="secureserver" type=
"checkbox" onchange="loginview.toggle_security()"> <label for=
"secureserver">Conexión segura</label></div>
<label for="username">Nombre de usuario</label> <input id=
"username" type="text" maxlength="20"> <label for=
"password">contraseña</label> <input id="password" type=
"password" maxlength="20"> <input id="storepassword" type=
"checkbox"> <label for=
"storepassword">Contraseña  tienda</label>
<p><a id="loginbutton" class="button" onclick=
"loginview.connect(false);">Entrar</a> <a class=
"button" onclick=
"loginview.connect(true);">Invitado</a></p>
<p><a href="console.html">Consola</a> • <a href=
"viewer.html">Visor</a></p>
<p class="note">Las conexiones seguras requieren certificados y claves TLS crearse.</p>
</div>
<div id="sourceview" style="display:none;">
<h2>Fuentes </h2>
<div class="accordion">
<h3 class="privservice">Añadir una nueva fuente</h3>
<div id="addsourceparameters"><label for=
"addsourcetype">Tipo de fuente:</label> <select id=
"addsourcetype" onchange="sourceview.select_add_fields();">
<option value="">Seleccione el tipo de ...</option>
</select> <!-- Network media parameters -->
 <label for="addsourceuser">Servicio nombre de usuario</label> <input id=
"addsourceuser" type="text" placeholder=
"Nombre de usuario"> <label for=
"addsourcepassword">Contraseña Servicio</label> <input id=
"addsourcepassword" type="password" placeholder=
"Contraseña">
<div><input id="addsourcepandoraone" type="checkbox"> <label for=
"addsourcepandoraone">Pandora One</label></div>
<!-- Local media parameters -->
<label for="addsourcepath">Directorio para los medios</label> <input id=
"addsourcepath" placeholder="Carpeta de música arrastre aquí"> 
<!-- Generic parameters -->
<div><input id="addsourceratingbias_enable" type="checkbox"
onchange="sourceview.select_add_fields();"> <label for=
"addsourceratingbias_enable">Rating bias level</label>
<input id="addsourceratingbias" type="range" min="1" max="100"
step="1" title="Control how much ratings effect song selections.  At left, none; at right, each star biases selection probability by about 3x (unrated songs = 3 stars)."></div>
<div><input id="addsourcerecentbias_enable" type="checkbox"
onchange="sourceview.select_add_fields();"> <label for=
"addsourcerecentbias_enable">Recently played bias level</label>
<input id="addsourcerecentbias" type="range" min="1" max="100"
step="1" title="Control how much recent play effects song selections.  At left, none; at right, selection probability is biased roughly linear with time since last play."></div>
<div><select id="addsourcerescan" onchange=
"sourceview.select_add_fields();">
<option value="">Default rescan interval</option>
<option value="never" title="Never rescan for new media">
Never</option>
<option value="once" title="Rescan for media just this once">
Once</option>
<option value="always" title="Rescan whenever source is started">
Always</option>
<option value="periodically" title=
"Rescan for media daily">
Periodically</option>
</select></div>
<div><select id="addsourceaccess" onchange=
"sourceview.select_add_fields();">
<option value="">Default sharing</option>
<option value="disowned" title="no puede ser revisada por cualquier persona.">
sin dueño</option>
<option value="private" title="Otros usuarios no pueden endeudarse fuente">
privada</option>
<option value="shared" title="Otros pueden pedir prestado, pero no copiar o revisar fuente">
Shared</option>
<option value="published" title="Otros pueden pedir prestado y copiar pero no revisar fuente">
Publicado</option>
<option value="public" title="otros pueden prestar, copiar y modificar la fuente">
Pública</option>
</select></div>
<div><select id="addsourcesongproxy" onchange=
"sourceview.select_add_fields();">
<option value="">Select song substitution mode...</option>
<option value="none" title="This source is not involved in media substitution.">
No substitutions</option>
<option value="donor" title="Recipient sources may substitute matching songs from this source.">
Provides substitutions</option>
<option value="recipient" title=
"This source may substitute media with matches from donor sources.">
Accepts substitutions</option>
</select></div>
<div><select id="addsourcepersistence" onchange=
"sourceview.select_add_fields();">
<option value="">Do not remember source</option>
<option value="remember" title=
"Remember and allow manual re-use.">
Remember</option>
<option value="restore" title="Remember and restore automatically on startup.">
Restore</option>
</select></div>
<div><label for="addsourcename">Nombre de la fuente</label>
<input id="addsourcename" placeholder=
"Blanco por incumplimiento"></div>
<ul class="actions">
<li><a class="button" onclick=
"sourceview.add_source ();">Añadir fuente</a></li>
</ul>
</div>
<h3 id="borrowsource" class="privservice">Uso fuente existente</h3>
<div id="borrowsourceparameters"><select id="borrowlist" onchange=
"sourceview.select_borrow_fields();">
<option>Seleccione la fuente para permitir ...</option>
</select>
<div><input id="borrowsourceratingbias_enable" type="checkbox"
onchange="sourceview.select_borrow_fields();"> <label for=
"borrowsourceratingbias_enable">Rating bias level</label>
<input id="borrowsourceratingbias" type="range" min="1" max="100"
step="1" title="Control how much ratings effect song selections.  At left, none; at right, each star biases selection probability by about 3x (unrated songs = 3 stars)."></div>
<div><input id="borrowsourcerecentbias_enable" type="checkbox"
onchange="sourceview.select_borrow_fields();"> <label for=
"borrowsourcerecentbias_enable">Recently played bias level</label>
<input id="borrowsourcerecentbias" type="range" min="1" max="100"
step="1" title="Control how much recent play effects song selections.  At left, none; at right, selection probability is biased roughly linear with time since last play."></div>
<div><select id="borrowsourcerescan" onchange=
"sourceview.select_borrow_fields();">
<option value="">Retain current rescan interval</option>
<option value="never" title="Never rescan for new media">
Never</option>
<option value="once" title="Rescan for media just this once">
Once</option>
<option value="always" title="Rescan whenever source is started">
Always</option>
<option value="periodically" title=
"Rescan for media daily">
Periodically</option>
</select></div>
<div><select id="borrowsourceaccess" onchange=
"sourceview.select_borrow_fields();">
<option value="">Retain current sharing behavior</option>
<option value="disowned" title="no puede ser revisada por cualquier persona.">
sin dueño</option>
<option value="private" title="Otros usuarios no pueden endeudarse fuente">
privada</option>
<option value="shared" title="Otros pueden pedir prestado, pero no copiar o revisar fuente">
Shared</option>
<option value="published" title="Otros pueden pedir prestado y copiar pero no revisar fuente">
Publicado</option>
<option value="public" title="otros pueden prestar, copiar y modificar la fuente">
Pública</option>
</select></div>
<div><select id="borrowsourcesongproxy" onchange=
"sourceview.select_borrow_fields();">
<option value="">Use current song substitution mode</option>
<option value="none" title="This source is not involved in media substitution.">
No substitutions</option>
<option value="donor" title="Recipient sources may substitute matching songs from this source.">
Provides substitutions</option>
<option value="recipient" title=
"This source may substitute media with matches from donor sources.">
Accepts substitutions</option>
</select></div>
<div><select id="borrowsourcepersistence" onchange=
"sourceview.select_borrow_fields();">
<option value="">Do not remember any changes</option>
<option value="remember" title=
"Remember and allow manual re-use.">
Remember</option>
<option value="restore" title="Remember and restore automatically on startup.">
Restore</option>
</select></div>
<ul class="actions">
<li><a class="button" onclick=
"sourceview.borrow_source();">Uso fuente</a></li>
</ul>
</div>
<h3 class="privservice">Quitar fuente</h3>
<div>
<ul class="actions">
<li><a class="button" onclick=
"sourceview.remove_source();">Eliminar fuente de corriente</a></li>
</ul>
</div>
</div>
</div>
<div id="trackview" style="display:none;">
<div id="trackviewtitle"><span class="trackcontrols"><a class=
"playpause button privuser" onclick="execute ('PAUSE TOGGLE');"
title="Pausar o reanudar la reproducción.">▶</a> <a class=
"button privuser" onclick="execute('skip');" title=
"Saltar la canción actual">&nbsp;»&nbsp;</a></span> <a id=
"nowplaying" onclick="trackview.go_to_current_track();" class=
"button" title="Mostrar canción que se está reproduciendo.">Now Playing</a>
<select id="playlistname" onchange="trackview.select_playlist();">
<option>Seleccionar lista de reproducción ...</option>
<optgroup label="listas especiales">
<option value="stop">Detener</option>
<option value="request">Sólo solicitudes</option>
<option value="mix">Mix listas de reproducción seleccionado</option>
<option value="everything">Mezcla todo</option>
<option value="auto">Las listas de reproducción Autotune</option>
</optgroup>
<optgroup id="playlists" label="Las listas de reproducción individuales">
<option>&nbsp;</option>
</optgroup>
</select></div>
<div id="addplaylistfromtrack" class="popup">
<div><span class="close" onclick=
"$('#addplaylistfromtrack').hide();">╳</span>
<p>Añadir semilla de la canción</p>
<label for="addfromtracktarget">Nombre lista de reproducción:</label>
<select id="addfromtracktarget" onchange=
"trackview.select_add_target();">
<option value="">Crear nueva lista de reproducción</option>
</select>
<div id="addfromtracknewplaylist"><label for=
"addfromtracksource">Crear lista de reproducción de la fuente:</label>
<select id="addfromtracksource">
<option>&nbsp;</option>
</select> <input id="addfromtrackplaylist" type="text" placeholder=
"Nuevo nombre de la lista"></div>
<ul class="actions">
<li><a id="doaddseedfromsong" class="button" onclick=
"trackview.add_from_track('song');">Crear lista de reproducción de la canción</a></li>
<li><a id="doaddseedfromalbum" class="button" onclick=
"trackview.add_from_track('album');">Crear lista de reproducción del álbum</a></li>
<li><a id="doaddseedfromartist" class="button" onclick=
"trackview.add_from_track('artist');">Crear lista de reproducción del artista</a></li>
</ul>
</div>
</div>
<div id="trackinfo">
<div id="albumcover"><img src="no-art.jpeg" id="albumart" alt=''
ondblclick="trackview.showart ();"> <a id="why" class=
"button privowner" onclick="trackview.explain_song ();" title=
"Explique por qué se jugó esta canción.">?</a>
<div class="pager"><a id="previoustrack" onclick=
"trackview.go_to_previous_track();" class="button previous" title=
"Mostrar pista antes">&nbsp;←&nbsp;</a> <a id=
"nexttrack" onclick="trackview.go_to_next_track();" class=
"button next" title=
"Mostrar siguiente pista">&nbsp;→&nbsp;</a></div>
<div id="networkstatus" class="statusoverlay">
<span>〈•••〉</span><br>
Reproducción estancó<br>
Compruebe la conexión de red </div>
<div id="pausestatus" class="statusoverlay" onclick=
"execute('RESUME');"><span>|| Pausa</span><br>
&nbsp;</div>
<div id="stoppedstatus" class="statusoverlay" onclick=
"execute('PLAY');"><span>█ Detenido</span><br>
&nbsp;</div>
<div id="norequests" class="statusoverlay">
<span>Ningunas peticiones</span><br>
Solicitar un poco de música.</div>
<div id="needplaylists" class="statusoverlay" onclick=
"viewmanager.show ('source');"><span>No hay listas de reproducción</span><br>
Favor agregar algunas fuentes.</div>
<div id="needmixselections" class="statusoverlay" onclick=
"viewmanager.show ('playlist');"><span>Mix está vacía</span><br>
Elija listas para mezclar.</div>
<div id="go" class="statusoverlay" onclick="execute ('PLAY');">
<span>▶&nbsp;Juega</span><br>
&nbsp;</div>
<div id="controller">
<div><span id="timepoint" class="time">&nbsp;</span> <span id=
"ratings"><a id="overplayed" class="button privowner" onclick=
"trackview.rate_overplayed();" title=
"No juegues esta canción durante un mes.">♻</a> <span id=
"trackrating">&nbsp;</span></span> <span id="duration" class=
"time">&nbsp;</span></div>
<div id="statusbar">
<div id="progressbar" style="width:50%;"><span style=
"display:none;">&nbsp;</span></div>
</div>
</div>
</div>
<div id="trackdetails">
<div id="trackname"><a id="additionalinfo" target=
"_blank"><span class="value">&nbsp;</span></a> <a class=
"button seed privowner" onclick="trackview.toggle_seed ('song');"
title="Toggle semilla canción.">種</a></div>
<div id="artistname"><span class="value">&nbsp;</span> <a class=
"button seed privowner" onclick="trackview.toggle_seed ('artist');"
title=
"Toggle artista semilla.">種</a></div>
<div id="albumname"><span class="value">&nbsp;</span> <a class=
"button seed privowner" onclick="trackview.toggle_seed ('album');"
title=
"Toggle semilla álbum.">種</a></div>
<div id="songplaylist"><a class="privowner" onclick=
"trackview.show_seeds ();"><span class="value">&nbsp;</span></a>
<a class="button seed privowner" onclick=
"$('#addplaylistfromtrack').show();" title=
"Añadir semilla o crear lista de reproducción de la canción, álbum o artista.">+</a></div>
</div>
</div>
<input id="volume" class="privuser" type="range" min="-40" max="0"
step="1" title="Volume" onchange="trackview.set_volume ();"></div>
<div id="searchview" style="display:none;">
<h2>Búsqueda de música</h2>
<label for="searchtype">Buscar</label> <select id=
"searchtype">
<option value="any">Any</option>
<option value="song">Song</option>
<option value="artist">Artist</option>
<option value="album">Album</option>
<option value="playlist">Género</option>
<option value="request">Sólo canciones solicitable</option>
</select> <label for="searchmethod">Método</label>
<select id="searchmethod">
<option value="like">Palabras partido</option>
<option value="where">Frase Partido</option>
<option value="expr">Expresión </option>
</select> <label for="searchfor">Matching</label>
<input id="searchfor" type="text" placeholder=
"Texto de búsqueda"> <a id="searchbutton" class=
"button" onclick="searchview.search();">Buscar</a>
<a class="button" onclick=
"searchview.request();">Solicitud todo</a>
<div id="searchaction" class="popup">
<div><span class="close" onclick=
"$('#searchaction').hide();">╳</span> <span id=
"addfromsearchname">&nbsp;</span> (<span id=
"addfromsearchtype">&nbsp;</span>)<br>
<span id="searchinfosource">&nbsp;</span> (<span id=
"searchinfoname">&nbsp;</span>)
<div class="actiongrouping">
<p>Add seed from search result</p>
<label for="addfromsearchtarget">Nombre lista de reproducción:</label>
<select id="addfromsearchtarget">
<option value="">Seleccionar lista de reproducción ...</option>
</select>
<ul class="actions">
<li><a class="button" onclick=
"searchview.add_seed ();">Añadir semilla</a></li>
</ul>
</div>
<div class="actiongrouping">
<p>Create playlist from search result</p>
<label for=
"addfromsearchsource">Crear lista de reproducción de la fuente:</label>
<select id="addfromsearchsource">
<option>&nbsp;</option>
</select> <input id="addfromsearchplaylist" type="text"
placeholder="Nuevo nombre de la lista">
<ul class="actions">
<li><a id="createplaylist" class="button" onclick=
"searchview.create_playlist() ;">Crear nueva lista de reproducción</a></li>
</ul>
</div>
</div>
</div>
<table id="searchresults" class="scrolling">
<thead>
<tr>
<th>&nbsp;</th>
</tr>
</thead>
<tbody>
<tr>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
</div>
<div id="playlistview" style="display:none;"><span class=
"pagenumber">página &nbsp; <span id="playlistpage">&nbsp;</span>
&nbsp; de &nbsp; <span id="playlistpages">&nbsp;</span>
</span>
<h2>Listas</h2>
<span class="pager"><a class="button" onclick=
"playlistview.previous()">↑</a> <a class="button"
onclick="playlistview.next()">↓</a> <select id="showmode"
onchange="playlistview.change_shown_mode()">
<option value="playlist">Seleccionar lista de reproducción ...</option>
<option value="mix">Mix listas de reproducción seleccionado</option>
<option value="everything">Mezcla todo</option>
<option value="auto">Las listas de reproducción Autotune</option>
</select> <a id="selectmode" class="button" onclick=
"playlistview.select_mode()" title=
"Seleccione el modo de reproducción y reanudar la reproducción.">▶</a></span>
<ul id="playlistlist" class="columnar privinfluence">
<li>No hay listas de reproducción</li>
</ul>
</div>
<div id="seedview" style="display:none;">
<h2>Las listas de reproducción revisar</h2>
<label for="reviseplaylist">Lista de reproducción</label>
<select id="reviseplaylist" onchange="seedview.select_playlist();">
<option value="">Seleccionar lista de reproducción ...</option>
</select>
<div>
<table id="seedsexisting">
<thead>
<tr>
<th>&nbsp;</th>
</tr>
</thead>
<tbody>
<tr>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
<a class="button" onclick=
"seedview.remove_playlist();">Eliminar lista de reproducción en su totalidad</a></div>
</div>
<div id="activityview" style="display:none;">
<h2>Actividad reciente</h2>
<ul id="recentactivity" class="scrolling">
<li>&nbsp;</li>
</ul>
<textarea id="yellmessage" rows="4" placeholder=
"Escriba mensaje"></textarea>
<br>
<a id="yellbutton" class="button" title="Difusión de su mensaje a otros usuarios pianod conectados."
onclick="activityview.yell()">Yell se</a></div>
<div id="adminview" style="display:none;">
<h2>Administración </h2>
<div class="accordion">
<h3 id="select_room">Elija habitación</h3>
<div><label for="rooms">Choose room:</label>
<select id="rooms" onchange="adminview.select_room();">
<option value="pianod" selected>Loading room list...</option>
</select></div>
<h3 class="privuser">Cola cosas</h3>
<div><label for=
"queuerandomize">Make random selections by</label>
<select id="queuerandomize" onchange=
"adminview.select_queue_randomize();">
<option value="song" selected>Assorted individual songs</option>
<option value="album">Choosing an entire album</option>
<option value="artist">A few songs by a single artist</option>
<option value="playlist">Assorted songs from one playlist</option>
<option value="random">A randomly chosen method</option>
</select>
<ul class="actions">
<li><a class="button" title="Cancelar todas las solicitudes pendientes." onclick=
"execute (['request', 'clear'])">Peticiones claras</a></li>
<li><a class="button" title="Detener después de la canción actual." onclick=
"execute ('stop', 'parada programada.');">Detener después de la canción actual.</a></li>
<li><a class="button" title="Detener inmediatamente y omitir resto de tocar la canción."
onclick=
"execute (['stop', 'now']);">Detener inmediatamente</a></li>
</ul>
</div>
<h3 class="privadmin">Apagado</h3>
<div>
<ul class="actions">
<li><a class="button privadmin" onclick=
"execute ('shutdown', 'Apagado programado para el final de la canción.');">Apagado</a></li>
</ul>
<p class="note">Apagado tiene lugar cuando finaliza la reproducción. Si relanzamiento se configura en launchd / systemd / init, pianod reinicia después de un cierre.</p>
</div>
</div>
</div>
<div id="userview" style="display:none;">
<h2>Mantenimiento del usuario</h2>
<div class="accordion">
<h3>Cambie su contraseña</h3>
<div><label for="oldpassword">Antigua contraseña</label>
<input id="oldpassword" type="password"> <label for=
"newpassword">Nueva contraseña</label> <input id="newpassword"
type="password"> <label for=
"confirmpassword">Confirme la contraseña</label> <input id=
"confirmpassword" type="password">
<div><input id="shadowpassword" type="checkbox" onchange=
"userview.change_shadow();"> <label for="shadowpassword" title=
"Instead of changing a password, switch to your system password for pianod authentication.">Adopt system password</label></div>
<a class="button" onclick=
"userview.change_password();">Cambiarlo</a><br>

Contraseñas pueden ser enviados al servidor en forma no cifrada. No utilice una contraseña importante, al igual que el de su cuenta bancaria.</div>
<h3 class="privadmin">Crear un usuario</h3>
<div><label for="createusername">Nombre de usuario</label>
<input id="createusername"> <label for=
"createusertype">Nivel Privilege</label> <select id=
"createusertype">
<option value="listener">Listener</option>
<option value="user">Estándar</option>
<option value="admin">Administrador</option>
</select> <label for="createpassword">contraseña</label>
<input id="createpassword" type="password"> <label for=
"createconfirmpassword">Confirme la contraseña</label> <input id=
"createconfirmpassword" type="password"> <a class="button" onclick=
"userview.create_user()">Crear usuario</a><br>
Contraseñas pueden ser enviados al servidor en forma no cifrada. No utilice una contraseña importante, al igual que el de su cuenta bancaria.</div>
<h3 id="alter_user" class="privadmin">Alter un usuario</h3>
<div><label for="alterusername">Nombre de usuario</label>
<select id="alterusername" onchange=
"userview.select_alter_user();">
<option value=''>Seleccionar usuario ...</option>
</select> <label for="alterusertype">Rango & amp; Privilegios</label>
<select id="alterusertype" onchange="userview.change_type();">
<option value="disabled">Discapacitados</option>
<option value="listener">Listener</option>
<option value="user">Estándar</option>
<option value="admin">Administrador</option>
</select>
<ul class="privilegelist">
<li><input id="privilegeservice" type="checkbox" onchange=
"userview.change_privilege ('service')"> <label for=
"privilegeservice">Agregar, quitar o pedir prestado fuentes</label></li>
<li><input id="privilegeinfluence" type="checkbox" onchange=
"userview.change_privilege ('influence')"> <label for=
"privilegeinfluence">Las listas de reproducción autotuned Influencia</label></li>
</ul>
<a class="button" onclick=
"userview.reset_password()">Restablecer contraseña</a> <a class=
"button" onclick="userview.delete_user()">Borrar usuario</a>
<p class="note">Tenga cuidado de no eliminar el rango de administrador de todos los usuarios, lo que le dejará sin un administrador.</p>
</div>
<h3 id="kick_user" class="privadmin">Usuarios desahucie</h3>
<div>
<ul id="onlineusers" class="actions">
<li>user list goes here</li>
</ul>
</div>
</div>
</div>
</div>
<div id="status"><span class="value">&nbsp;</span></div>
<script type="text/javascript">
    /* Create/start the view manager. */
    translate = Translate();
    viewmanager = ViewManager();
    viewmanager.init();
</script>
</body>
</html>
