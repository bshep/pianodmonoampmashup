/* pianod web client - internationalization/translation support
   Copr. 2015 Perette Barella/Devious Fish
   All rights reserved.
*/


function Translate () {
	/* Constants */
	var ERRORS = {


		200: "Éxito",
		203: "Inicio de los datos",
		204: "No hay datos o final de los datos",
		206: "Partido encontró",
		207: "Valor se ha aproximado",
		210: "Comando reconoció pero la acción está pendiente",
		300: "Detalle",
		301: "Proxy Configuración inválida",
		303: "Válida lista de reproducción",
		304: "Elemento no encontrado",
		400: "Comando Mala",
		401: "No autorizado para la acción solicitada",
		402: "Error en la acción",
		403: "Ya existe",
		404: "Artículo solicitado no encontrado",
		405: "Acción no es aplicable al estado actual",
		406: "Inicio de sesión o contraseña no válidos",
		407: "Parámetro válida",
		408: "Playlist personalización fracasó",
		409: "Conflicto encontró",
		410: "Fallo temporal, futuro finalización desconocido",
		411: "Superó Cuota",
		412: "Que estar registrado",
		413: "No compatible",
		414: "Recursos insuficientes",
		415: "Límite ha sido alcanzado",
		416: "Operación sólo es válida en las listas de reproducción primarias",
		417: "Tipo incorrecto para la acción",
		418: "Expresión persistente o el valor necesarios",
		460: "Acción no soportado por fuente",
		461: "El valor no está soportado por fuente",
		462: "Acción no es posible en media manager",
		498: "Hay un error en pianod",
		499: "No implementado",
		500: "Error del servidor interna",
		501: "Nada de jugar",
		502: "Fracaso red",
		503: "Servicio cerrar",
		504: "Fracaso autenticación",
		505: "Recursos insufficent",
		507: "Error comunicarse con Pandora",
		508: "Ejecución de comandos incompleta",
		509: "Permiso denegado",
		510: "Excepción",
		511: "Tiempo de espera Red",
		512: "No se puede abrir la salida de audio",
		'Bogus': 'Bogosity'
	};




	var MESSAGES = {
		"Create playlist from song": "Crear lista de reproducción de la canción",
		"Create playlist from album": "Crear lista de reproducción del álbum",
		"Create playlist from artist": "Crear lista de reproducción del artista",
		"Add seed from song": "Añadir semilla de la canción",
		"Add seed from album": "Añadir semilla del álbum",
		"Add seed from artist": "Añadir semilla del artista",
		
		
		"Connection failed.": "Conexión falló.",
		"Check port number.": "Compruebe el número de puerto.",
		"Bad user credentials.": "Credenciales de usuario bad.",
		"Opening connection to %1$s.": "Conexión Apertura a %1$s.",
		"Session ended.": "Terminó Sesión.",
		"Activity messages are disabled.": "Mensajes actividad son discapacitados.",	
		"Listeners online:": "Los oyentes en línea:",
		"No message to yell.": "N mensaje a gritar.",
		"No playlists": "No hay listas de reproducción",
		"No usable sources.": "No hay fuentes utilizables.",	
		"There is nothing playing right now.": "No hay nada a jugar ahora mismo.",
		"Please provide a playlist name.": "Por favor ingrese su nombre de la lista.",
		"Can not retrieve user list": "No se puede recuperar la lista de usuarios",
		"Please select a user.": "Favor seleccione un usuario.",
		"Are you sure you want to delete %1$s?": "¿Seguro que quieres eliminar %1$s?",
		"User %1$s updated.": "Usuario %1$s actualizados.",
		"Password successfully updated.": "Contraseña actualizado correctamente.",
		"New passwords do not match.": "Nuevas contraseñas no coinciden.",

		"PROMPT_OLD_PASSWORD": "Antigua contraseña",
		"PROMPT_NEW_PASSWORD": "Nueva contraseña",
		"PROMPT_PIANOD_PASSWORD": "pianod password",
		"PROMPT_SYSTEM_PASSWORD": "System password",

		"HEADING_ALBUM": "Álbum",
		"HEADING_ARTIST": "Artista",
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


