# GUA'I TECH

Pagina web sencilla para la venta de productos electronicos mediante WhatsApp.

## Objetivo

Crear una landing responsive con catalogo de productos, botones de consulta por WhatsApp y preparacion inicial para analitica con `dataLayer`, GTM y GA4.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Vite
- GitHub
- Preparacion para Vercel

## Herramienta de IA utilizada

Se utilizo ChatGPT/Codex como apoyo para generar la estructura inicial, mejorar textos de productos, preparar el sistema de eventos y optimizar el codigo.

## Funcionalidades

- Catalogo cargado desde una estructura de datos en JavaScript.
- Botones "Ver producto" y "Comprar por WhatsApp" por producto.
- Mensajes de WhatsApp personalizados.
- Eventos `view_catalog`, `view_item`, `click_whatsapp` y `contact`.
- `window.dataLayer` preparado para una futura conexion con GTM y GA4.
- Diseno responsive para escritorio y movil.

## Eventos de analitica

Los eventos se registran con la funcion `trackEvent(event, data)` y se almacenan en `window.dataLayer`.

Los eventos de productos incluyen:

- `product_id`
- `product_name`
- `category`
- `price`

No se envia informacion personal como telefono, nombre, correo ni mensajes privados.

## Como ejecutar el proyecto

```bash
npm install
npm run dev
```

## URL del repositorio

https://github.com/luisgallas/Desarollo_WEB_complementos.git

## URL del proyecto publicado

Pendiente de publicar en Vercel.

## Explicacion del boton de WhatsApp

Cada producto tiene un mensaje personalizado guardado en JavaScript. Al hacer clic en "Comprar por WhatsApp", se abre `https://wa.me/595984416924` con el texto codificado para ese producto y se registra el evento `click_whatsapp` en `window.dataLayer`.

## Explicacion del sistema de eventos

La pagina inicializa `window.dataLayer = window.dataLayer || []`. Luego la funcion `trackEvent` agrega objetos con el nombre del evento y sus datos. Esto permite revisar los eventos en consola y facilita una futura integracion con Google Tag Manager y Google Analytics 4.
