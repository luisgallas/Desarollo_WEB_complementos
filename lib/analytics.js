// Importa los productos para validar eventos relacionados al catalogo.
import { products } from "./products.js";
// Importa la configuracion de medicion y Google Analytics 4.
import { DEMO_MODE, GA_MEASUREMENT_ID, isGaConfigured } from "./config.js";

// Crea el dataLayer si la pagina esta corriendo en un navegador.
if (typeof window !== "undefined") window.dataLayer = window.dataLayer || [];

// Lista de eventos permitidos para evitar enviar nombres inesperados.
const allowedEvents = new Set(["view_catalog", "view_item", "click_whatsapp", "contact"]);

// Lista de ubicaciones permitidas para saber desde donde ocurrio una accion.
const allowedLocations = new Set(["hero", "header", "catalog", "detail", "contact", "footer", "scroll"]);

// Guarda el Measurement ID activo para enviar eventos despues de inicializar GA4.
let activeGaMeasurementId = isGaConfigured(GA_MEASUREMENT_ID) ? GA_MEASUREMENT_ID : "";

// Devuelve solo los datos publicos del producto que se pueden mandar a analytics.
export function productData(product) {
  // No se mandan datos personales, solo informacion del catalogo.
  return { product_id: product.id, product_name: product.name, category: product.category, price: product.price };
}

// Carga Google tag cuando existe un Measurement ID real de GA4.
export function initGoogleAnalytics(measurementId = GA_MEASUREMENT_ID) {
  // Sin navegador, sin documento o sin ID valido, no se intenta cargar GA4.
  if (typeof window === "undefined" || typeof document === "undefined" || !isGaConfigured(measurementId)) return false;

  // Mantiene el mismo dataLayer que ya usa la pagina.
  window.dataLayer = window.dataLayer || [];
  activeGaMeasurementId = measurementId;

  // Define gtag una sola vez y lo conecta con dataLayer.
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
  }

  // Carga el script oficial de Google tag solo si todavia no existe.
  const scriptUrl = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
  if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = scriptUrl;
    document.head.append(script);
  }

  // Activa la medicion base de GA4 solo si no fue configurada desde index.html.
  window.__gaConfiguredIds = window.__gaConfiguredIds || {};
  if (!window.__gaConfiguredIds[measurementId]) {
    window.gtag("config", measurementId);
    window.__gaConfiguredIds[measurementId] = true;
  }
  return true;
}

// Convierte el evento interno en parametros aceptables para GA4.
function gaParams(entry) {
  const params = {};
  for (const [key, value] of Object.entries(entry)) {
    if (key !== "event" && value !== null && value !== undefined) params[key] = value;
  }
  // GA4 usa "value" para importes; se conserva "price" para reportes internos.
  if (typeof entry.price === "number") params.value = entry.price;
  return params;
}

// Registra un evento en window.dataLayer para integracion con GTM o GA4.
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
    // Marca si la tienda esta trabajando en modo de simulacion.
    demo_mode: DEMO_MODE,
  };

  // Asegura nuevamente que dataLayer exista antes de usarlo.
  window.dataLayer = window.dataLayer || [];
  // Inserta el evento en dataLayer.
  window.dataLayer.push(entry);
  // Si GA4 esta configurado, tambien manda el evento con gtag.
  if (typeof window.gtag === "function" && isGaConfigured(activeGaMeasurementId)) {
    window.gtag("event", event, gaParams(entry));
  }
  // Muestra el evento en consola para revisar durante la demo.
  console.log("TRACK:", event, entry);
  // Devuelve el evento para que las pruebas puedan validarlo.
  return entry;
}

// Intenta iniciar GA4 al cargar el modulo principal de analytics.
initGoogleAnalytics();
