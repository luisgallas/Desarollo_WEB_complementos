# GUA'I Tech

GUA'I Tech es una landing page academica para una tienda de productos electronicos. La pagina permite ver un catalogo, revisar detalles de cada producto y abrir WhatsApp con un mensaje preparado para consultar o comprar.

## Objetivo

Crear una tienda web sencilla que cumpla con una primera etapa de preparacion para analitica digital:

- Mostrar productos electronicos desde una estructura de datos en JavaScript.
- Evitar escribir productos uno por uno directamente en el HTML.
- Conectar botones de compra con WhatsApp.
- Registrar interacciones en `window.dataLayer`.
- Dejar la pagina lista para una futura conexion con Google Tag Manager y Google Analytics 4.

## Tecnologias Utilizadas

- HTML: estructura principal en `index.html`.
- CSS: estilos visuales y responsive en `styles.css`.
- JavaScript: interacciones en `js/app.js`.
- Datos del catalogo: `lib/products.js`.
- Configuracion de WhatsApp: `lib/config.js`.
- Eventos y dataLayer: `lib/analytics.js`.
- Imagenes locales optimizadas: `public/images/`.
- IA utilizada: ChatGPT / Codex.
- Vite: servidor local y build para Vercel.

## Funcionalidades

- Header con navegacion.
- Hero principal con boton `Ver productos`.
- Catalogo con 6 productos electronicos.
- Modal de detalle al tocar `Ver producto`.
- Boton `Comprar por WhatsApp` con mensaje diferente por producto.
- Seccion de beneficios.
- Seccion de contacto general.
- Preguntas frecuentes.
- Footer.
- Diseno responsive para celular, tablet y escritorio.

## Productos

Los productos estan definidos en `lib/products.js`. Cada producto incluye:

- `id`: identificador unico y permanente.
- `name`: nombre visible.
- `category`: categoria interna para analytics.
- `categoryLabel`: categoria visible.
- `price`: precio en guaranies.
- `image`: ruta local dentro de `/images/`.
- `description`: descripcion breve.
- `whatsappMessage`: mensaje preparado para WhatsApp.
- `specs`: lista de caracteristicas.

Ejemplo:

```js
{
  id: "mouse-gamer-x1",
  name: "Mouse Gamer X1",
  category: "perifericos",
  price: 95000,
  image: "/images/mouse-gamer.webp",
  whatsappMessage: "Hola, quiero consultar por el Mouse Gamer X1."
}
```

## WhatsApp

El numero de WhatsApp esta configurado en `lib/config.js`:

```js
export const WHATSAPP_NUMBER = "595984416924";
```

Cada boton de producto usa `getWhatsAppUrl()` para generar una URL como esta:

```text
https://wa.me/595984416924?text=Hola%2C%20quiero%20consultar...
```

El mensaje se abre preparado en WhatsApp, pero el usuario decide si lo envia.

## Eventos Y DataLayer

La pagina crea un `dataLayer` desde el inicio:

```js
window.dataLayer = window.dataLayer || [];
```

Los eventos preparados son:

| Evento | Cuando ocurre | Datos principales |
|---|---|---|
| `view_catalog` | Al ver o tocar el catalogo | `location`, `product_count` |
| `view_item` | Al abrir el detalle de un producto | `product_id`, `product_name`, `category`, `price` |
| `click_whatsapp` | Al tocar comprar por WhatsApp | `product_id`, `product_name`, `category`, `price` |
| `contact` | Al tocar un boton de contacto general | `location` |

Los eventos se guardan en `window.dataLayer` y tambien se muestran en la consola con `TRACK:`.

No se envian datos personales como nombre de persona, telefono, correo, documento o mensajes privados.

## Google Analytics 4

La pagina puede enviar los eventos a GA4 con Google tag (`gtag.js`).

Para activarlo:

1. Crear o abrir una propiedad GA4.
2. Entrar a `Admin > Data streams`.
3. Abrir el flujo web del sitio.
4. Copiar el `Measurement ID`, que tiene formato `G-XXXXXXXXXX`.
5. En Vercel, crear la variable de entorno `VITE_GA_MEASUREMENT_ID` con ese valor.

Para probarlo localmente tambien se puede reemplazar temporalmente el valor de `GA_MEASUREMENT_ID` en `lib/config.js`.

Cuando el ID esta configurado, `lib/analytics.js` carga Google tag y cada `trackEvent()` envia:

```js
gtag("event", "click_whatsapp", {
  product_id: "mouse-gamer-x1",
  product_name: "Mouse Gamer X1",
  category: "perifericos",
  price: 95000,
  value: 95000,
  currency: "PYG"
});
```

## Probar Eventos En El Navegador

1. Abrir la pagina.
2. Presionar `F12`.
3. Entrar en la pestana `Console`.
4. Hacer clic en `Ver productos`.
5. Hacer clic en `Ver producto`.
6. Hacer clic en `Comprar por WhatsApp`.
7. Hacer clic en `Contactar`.
8. Escribir:

```js
window.dataLayer
```

Resultado esperado:

```text
TRACK: view_catalog
TRACK: view_item
TRACK: click_whatsapp
TRACK: contact
```

## Ejecutar Localmente

Requisito: tener Node.js y npm instalados.

```bash
npm install
npm.cmd run dev -- --host 127.0.0.1
```

Luego abrir la URL que muestra Vite, normalmente:

```text
http://127.0.0.1:5173/
```

En PowerShell se recomienda usar `npm.cmd` para evitar bloqueos de `npm.ps1`.

## Build Para Produccion

```bash
npm.cmd run build
```

La salida se genera en:

```text
dist-vercel/
```

Esa carpeta no se sube a GitHub porque puede generarse nuevamente desde el codigo fuente.

## Pruebas

```bash
npm.cmd test
```

Las pruebas validan:

- Cantidad y estructura de productos.
- Imagenes WebP locales.
- Mensajes de WhatsApp.
- Eventos de analytics.
- Limpieza de datos personales.

## GitHub

Repositorio:

```text
https://github.com/luisgallas/Desarollo_WEB_complementos
```

## Vercel

URL publica:

```text
https://desarollo-web-complementos.vercel.app/
```

Configuracion recomendada en Vercel:

- Framework preset: `Vite`.
- Build command: `npm run build:vercel`.
- Output directory: `dist-vercel`.

## Documentacion De Entrega

- `docs/ENTREGA.md`: guia para entrega, eventos, Network, capturas y explicacion de GTM/GA4.
- `docs/PROMPTS.md`: registro de prompts usados con IA.
- `docs/IMAGENES.md`: origen, dimensiones y peso de las imagenes.

## Estado Actual

- Codigo fuente subido a GitHub.
- Pagina publicada en Vercel.
- Catalogo y WhatsApp funcionando.
- DataLayer y eventos preparados.
- Pruebas automatizadas funcionando.
- Pendiente: adjuntar capturas finales de escritorio, movil, Network y consola.
