PROYECTO: MEMORAMA - PWA

ARCHIVOS
- index.html: estructura de la aplicación.
- style.css: estilos visuales.
- app.js: lógica del juego.
- manifest.json: configuración instalable de la PWA.
- service-worker.js: caché y funcionamiento sin conexión.
- icon-192.png: icono de la aplicación.

PRUEBA LOCAL CON WAMPSERVER
1. Copia la carpeta memorama dentro de C:\wamp64\www\
2. Inicia WampServer y espera a que el icono esté verde.
3. Abre http://localhost/memorama/ en Chrome.
4. Prueba que puedas voltear cartas, encontrar parejas y reiniciar.

PUBLICACIÓN EN GITHUB PAGES
1. Crea un repositorio llamado memorama en GitHub.
2. Sube el CONTENIDO de esta carpeta a la raíz del repositorio.
3. En Settings > Pages, elige Deploy from a branch.
4. Selecciona la rama main y la carpeta /(root), y guarda.
5. Espera la URL publicada. Ábrela con HTTPS.
6. En Chrome/Edge usa la opción Instalar aplicación. En iPhone, abre en Safari,
   pulsa Compartir y selecciona Añadir a pantalla de inicio.

NOTA
Para que la instalación PWA funcione correctamente, publica el sitio con HTTPS
(GitHub Pages lo proporciona) o pruébalo en localhost.
