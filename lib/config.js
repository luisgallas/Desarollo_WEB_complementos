// Numero real de WhatsApp de la tienda.
// Formato: codigo de pais + numero, sin "+" ni espacios.
// Paraguay: 595 seguido del numero sin el 0 inicial.
export const WHATSAPP_NUMBER = "595984416924";

// Indica que la tienda sigue siendo una demo academica.
export const DEMO_MODE = true;

// Arma la URL final de WhatsApp con un mensaje ya preparado.
export function getWhatsAppUrl(message, number = WHATSAPP_NUMBER) {
  // Valida que el numero use formato internacional y solo digitos.
  if (number && !/^[1-9][0-9]{6,14}$/.test(number)) throw new Error("Numero de WhatsApp invalido: usar formato internacional, solo digitos.");
  // Devuelve la direccion de WhatsApp con el mensaje codificado para URL.
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
}
