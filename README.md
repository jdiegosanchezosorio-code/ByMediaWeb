# Bymedia — versión pulida

Sitio web estático de Bymedia (software, automatización RPA e IA). No requiere backend ni build: es HTML, CSS y JS plano.

## Estructura de archivos

```
bymedia-pulida/
├── index.html      # Página principal (única página del sitio)
├── css/
│   └── style.css   # Todos los estilos
├── js/
│   └── main.js      # Interactividad (mapa, selector, contadores, reveal, etc.)
├── assets/          # Imágenes, videos y PDF referenciados por index.html
└── contenido-por-validar.html.txt   # Bloque de contenido pendiente de validar (no se incluye en la página hasta confirmarlo)
```

Todas las rutas dentro de `index.html` son relativas (`assets/...`, `css/style.css`, `js/main.js`), así que la carpeta completa debe mantener esta misma jerarquía — no mover ni renombrar `assets`, `css` o `js` por separado del `index.html`.

## Publicar con GitHub Pages

1. Crea un repositorio en GitHub (público, o privado si tienes GitHub Pro/Team/Enterprise) y sube **todo el contenido de esta carpeta** a la raíz del repositorio (no dentro de una subcarpeta), conservando la estructura anterior.
2. En el repositorio, ve a **Settings → Pages**.
3. En "Build and deployment", en **Source** selecciona **Deploy from a branch**.
4. En **Branch**, elige `main` (o la rama donde subiste los archivos) y la carpeta `/ (root)`. Guarda.
5. Espera 1–2 minutos: GitHub Pages publicará el sitio en `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`.
6. Cada vez que hagas `git push` con cambios, el sitio se actualiza solo en unos minutos.

No se necesita ningún paso de compilación (no hay `npm install`, `build`, etc.): GitHub Pages sirve los archivos tal cual están.

## Notas de contenido

- El video de presentación (`assets/video-presentacion.mp4`) fue reemplazado por una versión nueva suministrada por el cliente. Los videos de equipo (`video-equipo.mp4`) y de recobro de incapacidades (`video-recobro.mp4`) se conservan sin modificar.
- El formulario de contacto solo prepara un enlace `mailto:`; no envía ni almacena datos. El visitante debe revisar y enviar desde su propio cliente de correo. Para recepción automática hay que conectar un servicio real (backend, Formspree, etc.).
- Fuente de contraste de servicios y productos, consultada el 22/09/2026: https://www.cerebro.com.co/bymedia/
- Los contactos y logos proceden del material suministrado por el cliente; confirmar su vigencia y autorización antes de publicar.
- Los porcentajes y detalles de arquitectura no corroborados quedaron en `contenido-por-validar.html.txt`, para reincorporarlos a `index.html` cuando exista respaldo.
- El resumen legal de incapacidades fue sustituido por información general del servicio.
- Bymedia debe validar sus afirmaciones y confirmar la correspondencia del video de recobro con Cerebro Gerencial.

## Comprobaciones realizadas

Sintaxis JavaScript, enlaces internos, recursos locales e integridad SHA-256 de los archivos multimedia originales. Pendiente: revisión visual final y reproducción en navegador real antes de publicar.
