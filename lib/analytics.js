// Importa los productos para validar eventos relacionados al catalogo.
import { products } from "./products.js";
// Importa la bandera que indica si la pagina es una demo academica.
import { DEMO_MODE } from "./config.js";

// Crea el dataLayer si la pagina esta corriendo en un navegador.
if (typeof window !== "undefined") window.dataLayer = window.dataLayer || [];

// Lista de eventos permitidos para evitar enviar nombres inesperados.
const allowedEvents = new Set(["view_catalog", "view_item", "click_whatsapp", "contact"]);

// Lista de ubicaciones permitidas para saber desde donde ocurrio una accion.
const allowedLocations = new Set(["hero", "header", "catalog", "detail", "contact", "footer", "scroll"]);

// Devuelve solo los datos publicos del producto que se pueden mandar a analytics.
export function productData(product) {
  // No se mandan datos personales, solo informacion del catalogo.
  return { product_id: product.id, product_name: product.name, category: product.category, price: product.price };
}

// Registra un evento en window.dataLayer para una futura integracion con GTM o GA4.
export function trackEvent(event, data = {}) {
  // Si no hay navegador o el evento no esta permitido, no registra nada.
  if (typeof window === "undefined" || !allowedEvents.has(event)) return null;

  // Busca el producto real usando el ID recibido en el evento.
  const product = products.find((item) => item.id === data.product_id);

  // Arma el objeto final que se va a enviar al dataLayer.
  const entry = {
    // Nombre del evento, por ejemplo view_item o click_whatsapp.
    event,
    // Valores por defecto para que un contacto general no herede el ultimo producto.
    product_id: null,
    product_name: null,
    category: null,
    price: null,
    // Moneda usada por el catalogo.
    currency: "PYG",
    // Si el producto existe, agrega sus datos publicos.
    ...(product ? productData(product) : {}),
    // Si la ubicacion es valida, la agrega al evento.
    ...(allowedLocations.has(data.location) ? { location: data.location } : {}),
    // En el evento de ver catalogo tambien se informa la cantidad de productos.
    ...(event === "view_catalog" ? { product_count: products.length } : {}),
    // Marca que el proyecto es una demo academica.
    demo_mode: DEMO_MODE,
  };

  // Asegura nuevamente que dataLayer exista antes de usarlo.
  window.dataLayer = window.dataLayer || [];
  // Inserta el evento en dataLayer.
  window.dataLayer.push(entry);
  // Muestra el evento en consola para revisar durante la demo.
  console.log("TRACK:", event, entry);
  // Devuelve el evento para que las pruebas puedan validarlo.
  return entry;
}
