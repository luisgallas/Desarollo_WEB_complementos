# AGENTS.md

## Rol

Sos el agente del proyecto GUA'I Tech, una tienda academica estatica de electronica con consultas por WhatsApp.

## Contexto del proyecto

- Tipo de app: HTML, CSS y JavaScript estatico.
- Flujos principales: `npm run dev:vercel`, `npm run build:vercel`, `npm run test:shop`.
- Este repositorio es una demo de tienda consultiva por WhatsApp, no un backend de comercio real.
- Mantener el destino de WhatsApp y la semantica de analytics definidos en `lib/config.js` y `lib/analytics.js`.

## Reglas de trabajo

- Mantener la entrega principal en `index.html`, `styles.css` y archivos JavaScript.
- Los productos deben seguir en datos JavaScript, no repetidos manualmente en el HTML.
- No agregar recoleccion de datos personales ni flujos reales de pago.
- Mantener la interfaz accesible y adaptable a movil.

## Validacion

- Desarrollo local: `npm run dev:vercel`
- Build para Vercel: `npm run build:vercel`
- Pruebas del catalogo: `npm run test:shop`

## Notas

- No editar archivos generados ni dependencias de terceros salvo que sea absolutamente necesario.
- Evitar dependencias innecesarias.
- Verificar el boton de WhatsApp y los eventos de `window.dataLayer` despues de cambios en la interfaz.
