# GUA'I Tech - Guia de entrega

## Resultado realizado

GUA'I Tech es una landing academica para venta consultiva de productos electronicos por WhatsApp. La pagina principal usa solamente HTML, CSS y JavaScript:

| Archivo | Funcion |
|---|---|
| `index.html` | Estructura: header, hero, catalogo, beneficios, contacto, FAQ, footer y dialogo de producto. |
| `styles.css` | Diseno visual, tarjetas, botones, modal y responsive para movil. |
| `js/app.js` | Genera productos, abre detalles, prepara WhatsApp y conecta eventos. |
| `lib/products.js` | Array de seis productos con ID, nombre, categoria, precio, imagen, descripcion y mensaje. |
| `lib/config.js` | Numero de WhatsApp y funcion para construir el enlace. |
| `lib/analytics.js` | `dataLayer`, `trackEvent()`, eventos permitidos y limpieza de datos personales. |
| `public/images/` | Imagenes WebP locales, menores a 300 KB. |

## Estado antes de entregar

- Codigo subido al repositorio GitHub: https://github.com/luisgallas/Desarollo_WEB_complementos
- Publicar en Vercel y copiar la URL real en `README.md`.
- Tomar capturas de escritorio, movil, Network y consola desde la URL publicada.
- Completar cualquier dato real que el profesor pida en la entrega final.

## Como funciona el boton de WhatsApp

Cada producto tiene un campo `whatsappMessage`. Al crear las tarjetas, `js/app.js` llama a `getWhatsAppUrl(product.whatsappMessage)`.

La funcion esta en `lib/config.js` y combina:

- Base: `https://wa.me/`
- Numero: `595984416924`
- Texto codificado con `encodeURIComponent`

Ejemplo:

```text
Hola, quiero consultar por el Mouse Gamer X1.
```

El enlace abre WhatsApp con el mensaje preparado. El usuario todavia debe revisar y enviar el mensaje manualmente.

## Como funciona el sistema de eventos

La pagina inicializa:

```js
window.dataLayer = window.dataLayer || [];
```

Luego usa:

```js
trackEvent("click_whatsapp", {
  product_id: "mouse-gamer-x1",
  product_name: "Mouse Gamer X1",
  category: "perifericos",
  price: 95000
});
```

`trackEvent()` agrega el objeto al `dataLayer` y muestra `TRACK:` en la consola. En esta etapa no se conecta GA4 ni GTM; solo se deja la pagina preparada.

## Eventos definidos

| Accion | Evento | Datos principales |
|---|---|---|
| Ver catalogo | `view_catalog` | `product_count`, `location`, `currency`, `demo_mode` |
| Ver producto | `view_item` | `product_id`, `product_name`, `category`, `price` |
| Comprar por WhatsApp | `click_whatsapp` | `product_id`, `product_name`, `category`, `price` |
| Contactar | `contact` | `location`, `currency`, `demo_mode` |

Los eventos no deben enviar nombres de personas, telefonos, correos, documentos ni mensajes personales.

## Data attributes

Los botones generados por JavaScript incluyen atributos para futuro tracking:

```html
<a
  class="whatsapp-button js-whatsapp"
  data-product-id="mouse-gamer-x1"
  data-product-name="Mouse Gamer X1"
  data-category="perifericos"
  data-price="95000"
>
  Comprar por WhatsApp
</a>
```

Tambien se usan clases de comportamiento:

- `.js-catalog-link`
- `.js-view-product`
- `.js-whatsapp`
- `.js-contact`

## Pruebas de consola

1. Abrir la pagina publicada.
2. Abrir DevTools y entrar en Console.
3. Hacer clic en Ver productos.
4. Hacer clic en Ver producto.
5. Hacer clic en Comprar por WhatsApp.
6. Hacer clic en Contactar.
7. Escribir `window.dataLayer` o `console.table(window.dataLayer)`.

Resultado esperado:

```text
TRACK: view_catalog
TRACK: view_item
TRACK: click_whatsapp
TRACK: contact
```

## Network

En la URL publicada:

1. Abrir DevTools.
2. Entrar en Network.
3. Activar Disable cache.
4. Recargar la pagina.
5. Identificar el documento HTML, CSS, JavaScript, imagenes y solicitudes externas.

Completar con mediciones reales:

| Recurso | URL | Metodo | Estado | Tipo | Tamano | Tiempo |
|---|---|---|---|---|---|---|
| HTML | Completar | Completar | Completar | document | Completar | Completar |
| CSS | Completar | Completar | Completar | stylesheet | Completar | Completar |
| JavaScript | Completar | Completar | Completar | script | Completar | Completar |

Para una imagen, buscar por ejemplo `mouse-gamer.webp` y registrar URL, formato WebP, peso transferido y tiempo de carga.

## Por que preparar dataLayer antes de GTM

Preparar el `dataLayer` primero permite definir nombres de eventos y datos estables antes de instalar GTM. Despues, GTM puede escuchar esos eventos sin depender de textos, estilos o posiciones del HTML.

## Eventos que luego podrian enviarse a GA4

- `view_catalog`: vista del catalogo.
- `view_item`: vista de un producto.
- `click_whatsapp`: intencion de compra o consulta.
- `contact`: contacto general.

Para reportes de ecommerce en GA4, mas adelante se podria mapear `view_item` al formato recomendado con `items`, `item_id`, `item_name`, `item_category`, `price` y `currency`.

## Capturas para la entrega

- Pagina en escritorio.
- Pagina en movil.
- DevTools Network.
- Eventos en consola y `window.dataLayer`.
