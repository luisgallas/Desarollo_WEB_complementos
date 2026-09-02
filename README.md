# GUA'I Tech

Tienda academica sencilla para vender productos electronicos mediante consultas por WhatsApp. La entrega principal esta hecha con HTML, CSS y JavaScript.

## Objetivo

Mostrar un catalogo de productos electronicos, permitir ver el detalle de cada producto, abrir WhatsApp con un mensaje preparado y registrar eventos en `window.dataLayer` para una futura integracion con GTM y GA4.

## Tecnologias utilizadas

- HTML: `index.html`
- CSS: `styles.css`
- JavaScript: `js/app.js`, `lib/products.js`, `lib/config.js`, `lib/analytics.js`
- Imagenes locales WebP: `public/images/`
- Herramienta de IA: ChatGPT / Codex

No se usa React para la pagina principal de entrega. El HTML carga directamente el CSS y el modulo JavaScript.

## URL del proyecto publicado

Pendiente de completar despues de publicar en Vercel.

## Repositorio GitHub

Repositorio de destino: https://github.com/luisgallas/Desarollo_WEB_complementos

La subida debe realizarse desde una cuenta con permisos sobre ese repositorio.

## Ejecutar localmente

Requisito: Node.js y npm.

```bash
npm ci
npm run dev:vercel
```

Abrir la direccion local que muestra Vite. Para publicar:

```bash
npm run build:vercel
```

La carpeta de salida para Vercel es `dist-vercel/`.

## Productos

El catalogo esta en `lib/products.js`. Cada producto tiene:

- ID unico y permanente
- Nombre
- Categoria
- Precio
- Descripcion breve
- Imagen local
- Mensaje propio de WhatsApp

Las tarjetas se generan desde JavaScript en `js/app.js`, no estan repetidas manualmente en el HTML.

## WhatsApp

El numero configurado esta en `lib/config.js`: `595984416924`, equivalente a `0984416924` en Paraguay.

Cada boton `Comprar por WhatsApp` usa `getWhatsAppUrl()` para construir un enlace de este tipo:

```text
https://wa.me/595984416924?text=Hola%2C%20quiero%20consultar...
```

El mensaje se abre preparado, pero no se envia automaticamente.

## Eventos

`lib/analytics.js` crea y usa:

```js
window.dataLayer = window.dataLayer || [];
```

Eventos preparados:

- `view_catalog`
- `view_item`
- `click_whatsapp`
- `contact`

Los eventos de producto incluyen `product_id`, `product_name`, `category` y `price`. No se registran nombres de personas, telefonos, correos, documentos ni mensajes personales.

Para probar:

1. Abrir DevTools.
2. Ir a Console.
3. Tocar Ver productos, Ver producto, Comprar por WhatsApp y Contactar.
4. Revisar los mensajes `TRACK:` y ejecutar `window.dataLayer`.

## Documentacion de entrega

- `docs/ENTREGA.md`: guia para probar eventos, Network, capturas y explicacion de GTM/GA4.
- `docs/PROMPTS.md`: prompts utilizados y registro de IA.
- `docs/IMAGENES.md`: origen, dimensiones y peso de las imagenes.
