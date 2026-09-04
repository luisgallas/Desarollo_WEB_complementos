// Numero real de WhatsApp de la tienda.
// Formato: codigo de pais + numero, sin "+" ni espacios.
// Paraguay: 595 seguido del numero sin el 0 inicial.
export const WHATSAPP_NUMBER = "595984416924";

// Indica si la tienda funciona en modo de simulacion para medicion interna.
export const DEMO_MODE = false;

// ID de medicion de Google Analytics 4.
// Se puede configurar en Vercel como VITE_GA_MEASUREMENT_ID o reemplazar "" por el ID real.
export const GA_MEASUREMENT_ID = import.meta.env?.VITE_GA_MEASUREMENT_ID || "G-NG9PJNS5DS";

// Valida el formato basico de un Measurement ID de GA4.
export function isGaConfigured(measurementId = GA_MEASUREMENT_ID) {
  return /^G-[A-Z0-9]+$/i.test(measurementId.trim());
}

// Arma la URL final de WhatsApp con un mensaje ya preparado.
export function getWhatsAppUrl(message, number = WHATSAPP_NUMBER) {
  // Valida que el numero use formato internacional y solo digitos.
  if (number && !/^[1-9][0-9]{6,14}$/.test(number)) throw new Error("Numero de WhatsApp invalido: usar formato internacional, solo digitos.");
  // Devuelve la direccion de WhatsApp con el mensaje codificado para URL.
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
}
