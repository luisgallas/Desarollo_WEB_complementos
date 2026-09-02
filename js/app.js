// Importa la lista de productos y la funcion que formatea precios.
import { products, formatPrice } from "../lib/products.js";
// Importa la funcion que arma enlaces de WhatsApp.
import { getWhatsAppUrl } from "../lib/config.js";
// Importa helpers para enviar eventos al dataLayer.
import { productData, trackEvent } from "../lib/analytics.js";

// Mensaje general que se manda cuando el usuario toca un boton de contacto.
const mensajeGeneral = "Hola, quiero consultar por los productos de GUA'I Tech.";
// Busca en el HTML el contenedor donde se van a dibujar las tarjetas.
const grillaProductos = document.querySelector("#product-grid");
// Busca en el HTML el texto donde se muestra la cantidad de productos.
const contadorProductos = document.querySelector("#product-count");
// Busca el dialogo modal que muestra el detalle de un producto.
const dialogoProducto = document.querySelector("#product-dialog");
// Busca el contenedor interno donde se carga el contenido del modal.
const contenidoDialogo = document.querySelector("#dialog-content");
// Busca el boton que cierra el modal.
const botonCerrarDialogo = document.querySelector(".dialog-close");

// Guarda si el catalogo ya fue visto para no registrar el mismo evento varias veces.
let catalogoVisto = false;

// Marca el catalogo como visto y registra el evento de analitica.
function marcarCatalogoVisto(ubicacion) {
  // Si ya se registro una vez, la funcion termina aca.
  if (catalogoVisto) return;
  // Cambia el estado para recordar que ya se vio el catalogo.
  catalogoVisto = true;
  // Envia el evento "view_catalog" con la ubicacion desde donde ocurrio.
  trackEvent("view_catalog", { location: ubicacion });
}

// Copia datos del producto al elemento para facilitar seguimiento y depuracion.
function agregarDatosDeSeguimiento(elemento, producto) {
  // Guarda el ID estable del producto en el atributo data-product-id.
  elemento.dataset.productId = producto.id;
  // Guarda el nombre del producto en el atributo data-product-name.
  elemento.dataset.productName = producto.name;
  // Guarda la categoria interna del producto.
  elemento.dataset.category = producto.category;
  // Guarda el precio como texto porque los atributos data-* siempre son cadenas.
  elemento.dataset.price = String(producto.price);
}

// Crea una tarjeta visual para un producto del catalogo.
function crearTarjetaProducto(producto) {
  // Crea un elemento article para representar la tarjeta del producto.
  const tarjeta = document.createElement("article");
  // Asigna la clase CSS que le da estilo de tarjeta.
  tarjeta.className = "product-card";
  // Guarda el ID del producto en la tarjeta.
  tarjeta.dataset.productId = producto.id;

  // Inserta la imagen, textos, precio y botones dentro de la tarjeta.
  tarjeta.innerHTML = `
    <div class="product-image">
      <img src="${producto.image}" alt="${producto.name}" width="900" height="700" loading="lazy">
    </div>
    <div class="product-content">
      <span class="product-category">${producto.categoryLabel}</span>
      <h3>${producto.name}</h3>
      <p class="product-description">${producto.description}</p>
      <strong class="product-price">${formatPrice(producto.price)}</strong>
      <div class="product-actions">
        <button class="product-button js-view-product" type="button">Ver producto</button>
        <a class="whatsapp-button js-whatsapp" href="${getWhatsAppUrl(producto.whatsappMessage)}" target="_blank" rel="noopener">Comprar por WhatsApp</a>
      </div>
    </div>
  `;

  // Busca el boton "Ver producto" dentro de la tarjeta recien creada.
  const botonVerProducto = tarjeta.querySelector(".js-view-product");
  // Busca el enlace "Comprar por WhatsApp" dentro de la tarjeta.
  const botonWhatsApp = tarjeta.querySelector(".js-whatsapp");
  // Agrega datos de seguimiento al boton de detalle.
  agregarDatosDeSeguimiento(botonVerProducto, producto);
  // Agrega datos de seguimiento al enlace de WhatsApp.
  agregarDatosDeSeguimiento(botonWhatsApp, producto);
  // Al tocar "Ver producto", abre el modal con el detalle de ese producto.
  botonVerProducto.addEventListener("click", () => abrirProducto(producto));
  // Al tocar WhatsApp, registra el evento de clic desde el catalogo.
  botonWhatsApp.addEventListener("click", () => {
    // Envia al dataLayer los datos permitidos del producto y la ubicacion del clic.
    trackEvent("click_whatsapp", { ...productData(producto), location: "catalog" });
  });

  // Devuelve la tarjeta terminada para que se pueda insertar en la pagina.
  return tarjeta;
}

// Abre el modal de detalle para el producto elegido.
function abrirProducto(producto) {
  // Registra que el usuario vio el detalle de un producto.
  trackEvent("view_item", { ...productData(producto), location: "catalog" });

  // Carga en el modal la imagen, descripcion, precio, especificaciones y CTA.
  contenidoDialogo.innerHTML = `
    <div class="dialog-layout">
      <img src="${producto.image}" alt="${producto.name}" width="900" height="700">
      <div class="dialog-body">
        <p class="eyebrow">${producto.categoryLabel}</p>
        <h2 id="dialog-title">${producto.name}</h2>
        <p>${producto.description}</p>
        <strong class="product-price">${formatPrice(producto.price)}</strong>
        <ul class="spec-list">
          ${producto.specs.map((detalle) => `<li>${detalle}</li>`).join("")}
        </ul>
        <a class="whatsapp-button js-whatsapp" href="${getWhatsAppUrl(producto.whatsappMessage)}" target="_blank" rel="noopener">Comprar por WhatsApp</a>
      </div>
    </div>
  `;

  // Busca el enlace de WhatsApp que se acaba de crear dentro del modal.
  const botonWhatsApp = contenidoDialogo.querySelector(".js-whatsapp");
  // Agrega los datos del producto al enlace del modal.
  agregarDatosDeSeguimiento(botonWhatsApp, producto);
  // Registra el clic de WhatsApp cuando viene desde el detalle del producto.
  botonWhatsApp.addEventListener("click", () => {
    // Envia el evento con ubicacion "detail" para diferenciarlo del catalogo.
    trackEvent("click_whatsapp", { ...productData(producto), location: "detail" });
  });

  // Usa showModal si el navegador soporta el elemento dialog moderno.
  if (typeof dialogoProducto.showModal === "function") {
    // Abre el modal de forma accesible.
    dialogoProducto.showModal();
  } else {
    // Compatibilidad basica para navegadores sin showModal.
    dialogoProducto.setAttribute("open", "");
  }
}

// Cierra el modal de producto.
function cerrarProducto() {
  // Usa close si el navegador soporta dialog.
  if (typeof dialogoProducto.close === "function") {
    // Cierra el modal moderno.
    dialogoProducto.close();
  } else {
    // Quita el atributo open como alternativa de compatibilidad.
    dialogoProducto.removeAttribute("open");
  }
}

// Dibuja todos los productos disponibles en la grilla.
function configurarCatalogo() {
  // Limpia el contenedor antes de cargar tarjetas nuevas.
  grillaProductos.innerHTML = "";
  // Recorre cada producto y agrega su tarjeta al catalogo.
  products.forEach((producto) => grillaProductos.append(crearTarjetaProducto(producto)));
  // Muestra la cantidad total de productos disponibles.
  contadorProductos.textContent = `${products.length} productos disponibles`;
}

// Conecta botones, enlaces y eventos interactivos de la pagina.
function configurarInteracciones() {
  // Busca todos los enlaces que llevan al catalogo.
  document.querySelectorAll(".js-catalog-link").forEach((enlace) => {
    // Cada enlace registra que el catalogo fue visto cuando recibe clic.
    enlace.addEventListener("click", () => {
      // Usa la ubicacion configurada en data-location o "header" como valor por defecto.
      marcarCatalogoVisto(enlace.dataset.location || "header");
    });
  });

  // Busca todos los botones o enlaces generales de contacto.
  document.querySelectorAll(".js-contact").forEach((enlace) => {
    // Asigna el enlace de WhatsApp con el mensaje general.
    enlace.href = getWhatsAppUrl(mensajeGeneral);
    // Abre WhatsApp en una pestaña nueva.
    enlace.target = "_blank";
    // Protege la pagina original cuando se abre una pestaña nueva.
    enlace.rel = "noopener";
    // Registra el evento cuando el usuario toca el enlace de contacto.
    enlace.addEventListener("click", () => {
      // Envia la ubicacion del boton o "contact" como valor por defecto.
      trackEvent("contact", { location: enlace.dataset.location || "contact" });
    });
  });

  // Cierra el modal cuando se toca el boton de cerrar.
  botonCerrarDialogo.addEventListener("click", cerrarProducto);
  // Permite cerrar el modal tocando el fondo oscuro.
  dialogoProducto.addEventListener("click", (evento) => {
    // Solo cierra si el clic fue directamente sobre el dialogo, no sobre su contenido.
    if (evento.target === dialogoProducto) cerrarProducto();
  });

  // Observa cuando la seccion de productos entra en pantalla.
  const observador = new IntersectionObserver((entradas) => {
    // Si alguna entrada se ve en pantalla, se considera que el catalogo fue visto.
    if (entradas.some((entrada) => entrada.isIntersecting)) {
      // Registra el evento como visto por scroll.
      marcarCatalogoVisto("scroll");
      // Deja de observar para no repetir el evento.
      observador.disconnect();
    }
  }, { threshold: 0.35 });

  // Empieza a observar la seccion principal de productos.
  observador.observe(document.querySelector("#productos"));
}

// Carga el catalogo cuando el modulo se ejecuta.
configurarCatalogo();
// Activa las interacciones de la pagina cuando el modulo se ejecuta.
configurarInteracciones();
