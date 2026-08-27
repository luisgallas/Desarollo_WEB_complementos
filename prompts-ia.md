# Prompts utilizados durante el desarrollo

## Prompt 1

**Que se solicito:** Crear la estructura inicial de una pagina web llamada GUA'I TECH para vender productos electronicos por WhatsApp.

**Resultado producido por la IA:** Se genero una landing con header, hero principal, catalogo, beneficios, contacto, preguntas frecuentes y footer.

**Modificaciones realizadas posteriormente:** Se ajusto el nombre de la tienda, se agrego el numero de WhatsApp del proyecto y se adapto el contenido a una tienda local de electronica.

## Prompt 2

**Que se solicito:** Crear un catalogo de productos electronicos desde una estructura de datos en JavaScript, sin escribir cada producto directamente en HTML.

**Resultado producido por la IA:** Se genero un array de productos con ID unico, nombre, categoria, precio, descripcion, imagen y mensaje de WhatsApp.

**Modificaciones realizadas posteriormente:** Se revisaron los IDs para que fueran permanentes, se mejoraron las descripciones y se agregaron filtros por categoria.

## Prompt 3

**Que se solicito:** Preparar la pagina para eventos de analitica usando `dataLayer` y una funcion `trackEvent`.

**Resultado producido por la IA:** Se implementaron los eventos `view_catalog`, `view_item`, `click_whatsapp` y `contact`, visibles en consola y almacenados en `window.dataLayer`.

**Modificaciones realizadas posteriormente:** Se verifico que los eventos de producto solo envien ID, nombre, categoria y precio, evitando datos personales como telefono o mensajes privados.
