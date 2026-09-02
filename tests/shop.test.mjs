// Importa el runner de pruebas incluido en Node.js.
import test from "node:test";
// Importa funciones de assert para comparar resultados esperados.
import assert from "node:assert/strict";
// Importa lectura de archivos para verificar imagenes locales.
import { readFileSync } from "node:fs";
// Importa el catalogo real usado por la pagina.
import { products } from "../lib/products.js";
// Importa la funcion que arma enlaces de WhatsApp.
import { getWhatsAppUrl } from "../lib/config.js";
// Importa funciones de analytics para validar eventos.
import { trackEvent, productData } from "../lib/analytics.js";

// Prueba que el catalogo tenga la cantidad correcta y datos completos.
test("el catalogo contiene seis productos con IDs estables, imagenes WebP locales y mensajes propios", () => {
  // Deben existir seis productos.
  assert.equal(products.length, 6);
  // Los IDs no deben repetirse.
  assert.equal(new Set(products.map(p => p.id)).size, 6);
  // Cada producto debe tener su propio mensaje de WhatsApp.
  assert.equal(new Set(products.map(p => p.whatsappMessage)).size, 6);

  // Revisa cada producto del catalogo.
  for (const p of products) {
    // El ID debe tener un formato estable para usarlo en analytics.
    assert.match(p.id, /^[a-z][a-z0-9-]+$/);
    // Valida que los campos principales existan y que el mensaje nombre al producto.
    assert.ok(p.name && p.category && p.description && p.whatsappMessage.includes(p.name));
    // El precio debe ser un numero positivo.
    assert.ok(Number.isFinite(p.price) && p.price > 0);
    // La imagen debe apuntar a un WebP local.
    assert.match(p.image, /^\/images\/[a-z-]+\.webp$/);
    // Lee la imagen desde public para confirmar que existe.
    const image = readFileSync(new URL("../public" + p.image, import.meta.url));
    // Un WebP empieza con RIFF.
    assert.equal(image.toString("ascii", 0, 4), "RIFF");
    // Un WebP contiene WEBP en la cabecera.
    assert.equal(image.toString("ascii", 8, 12), "WEBP");
    // Mantiene las imagenes livianas para cargar rapido.
    assert.ok(image.length < 300000);
  }
});

// Prueba que los enlaces de WhatsApp se armen correctamente.
test("WhatsApp codifica cada mensaje y admite demo sin inventar destinatario", () => {
  // Recorre todos los productos.
  for (const p of products) {
    // Crea una URL con un numero de prueba.
    const url = new URL(getWhatsAppUrl(p.whatsappMessage, "595981000000"));
    // Confirma que se usa wa.me.
    assert.equal(url.origin, "https://wa.me");
    // Confirma que el numero va en la ruta.
    assert.equal(url.pathname, "/595981000000");
    // Confirma que el mensaje llega en el parametro text.
    assert.equal(url.searchParams.get("text"), p.whatsappMessage);
    // Permite demo sin destinatario preseleccionado.
    assert.equal(new URL(getWhatsAppUrl(p.whatsappMessage, "")).pathname, "/");
    // Valida el numero configurado por defecto.
    assert.equal(new URL(getWhatsAppUrl(p.whatsappMessage)).pathname, "/595984416924");
  }
  // Rechaza numeros mal formateados.
  assert.throws(() => getWhatsAppUrl("Hola", "+595 981"));
});

// Prueba que analytics registre solo eventos permitidos y sin datos personales.
test("dataLayer conserva eventos previos, registra las cuatro acciones y descarta datos personales", () => {
  // Simula un evento que ya estaba en dataLayer antes de cargar el sitio.
  const previous = { event: "previous_event" };
  // Simula el objeto window en el entorno de pruebas de Node.
  global.window = { dataLayer: [previous] };
  // Usa el primer producto para probar eventos de producto.
  const p = products[0];

  // Registra vista del catalogo.
  trackEvent("view_catalog", { location: "hero" });
  // Registra vista de detalle de producto.
  trackEvent("view_item", { ...productData(p), location: "catalog" });
  // Registra clic de WhatsApp intentando mandar campos personales que deben descartarse.
  const click = trackEvent("click_whatsapp", {
    ...productData(p), location: "detail", email: "NO_REGISTRAR", phone: "NO_REGISTRAR",
    message: "NO_REGISTRAR", name: "NO_REGISTRAR", product_name: "NO_REGISTRAR", price: 1
  });
  // Registra contacto general.
  const contact = trackEvent("contact", { location: "contact" });

  // El evento anterior debe conservarse.
  assert.equal(window.dataLayer[0], previous);
  // Se deben registrar los eventos esperados en orden.
  assert.deepEqual(window.dataLayer.slice(1).map(x => x.event), ["view_catalog", "view_item", "click_whatsapp", "contact"]);
  // El producto del clic debe salir desde el catalogo real.
  assert.equal(click.product_name, p.name);
  // El precio del clic debe salir desde el catalogo real.
  assert.equal(click.price, p.price);
  // La moneda debe ser guaranies.
  assert.equal(click.currency, "PYG");
  // El evento debe indicar que sigue siendo demo.
  assert.equal(click.demo_mode, true);
  // No debe quedar ningun dato personal dentro de dataLayer.
  assert.equal(JSON.stringify(window.dataLayer).includes("NO_REGISTRAR"), false);
  // El contacto general no debe tener producto asociado.
  assert.equal(contact.product_id, null);
  // Guarda la cantidad actual de eventos.
  const n = window.dataLayer.length;
  // Un evento desconocido no se registra.
  assert.equal(trackEvent("unknown", {}), null);
  // La cantidad de eventos no debe cambiar si el evento fue rechazado.
  assert.equal(window.dataLayer.length, n);
  // Limpia el window simulado.
  delete global.window;
  // Sin window no se registra nada.
  assert.equal(trackEvent("contact"), null);
});
