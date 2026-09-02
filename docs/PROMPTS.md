# Registro de IA

Herramienta utilizada: ChatGPT / Codex.

## Prompt 1 - Desarrollo inicial de la consigna

**Que se solicito:** crear una pagina web sencilla para venta de productos electronicos por WhatsApp, con catalogo desde JavaScript, imagenes locales, eventos y preparacion para GTM/GA4.

**Resultado producido por la IA:** se preparo el proyecto GUA'I Tech con productos, imagenes WebP, enlaces a WhatsApp, eventos `view_catalog`, `view_item`, `click_whatsapp` y `contact`, documentacion de entrega y pruebas.

**Modificaciones realizadas posteriormente:** se configuro el numero paraguayo `0984416924` en formato internacional `595984416924` y se documento el repositorio de destino.

## Prompt 2 - WhatsApp y repositorio

**Que se solicito:** usar el numero de WhatsApp indicado y preparar el proyecto para subirlo al repositorio GitHub del alumno.

**Resultado producido por la IA:** se actualizo `lib/config.js` con el numero correcto, se verifico que los mensajes de producto se codifiquen con `encodeURIComponent` y se actualizo la documentacion.

**Modificaciones realizadas posteriormente:** se dejo pendiente la subida final a GitHub porque requiere permisos de la cuenta propietaria del repositorio.

## Prompt 3 - Conversion a HTML, CSS y JavaScript

**Que se solicito:** modificar el trabajo para que sea solamente en HTML, CSS y JavaScript, tal como pide la consigna.

**Resultado producido por la IA:** se reemplazo la entrada principal por `index.html`, se agrego `styles.css`, se creo `js/app.js` para generar el catalogo desde `lib/products.js`, se conectaron los botones de WhatsApp y se conservaron los eventos en `dataLayer`.

**Modificaciones realizadas posteriormente:** se actualizo `README.md`, `docs/ENTREGA.md` y la configuracion de Vercel para describir la entrega estatica sin React en la pagina principal.
