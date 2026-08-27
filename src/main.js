import "./styles.css";

window.dataLayer = window.dataLayer || [];

const whatsappNumber = "595984416924";

const products = [
  {
    id: "auricular-bt-a1",
    name: "Auriculares Bluetooth A1",
    category: "audio",
    price: 185000,
    image: "/images/auriculares-bluetooth-a1.png",
    description: "Auriculares inalambricos con sonido nitido, estuche de carga y autonomia para el dia completo.",
    whatsappMessage: "Hola, quiero consultar por los Auriculares Bluetooth A1."
  },
  {
    id: "smartwatch-fit-s2",
    name: "Smartwatch Fit S2",
    category: "wearables",
    price: 265000,
    image: "/images/smartwatch-fit-s2.png",
    description: "Reloj inteligente con monitor de actividad, notificaciones y pantalla tactil de alta visibilidad.",
    whatsappMessage: "Hola, quiero consultar por el Smartwatch Fit S2."
  },
  {
    id: "notebook-pro-n14",
    name: "Notebook Pro N14",
    category: "computadoras",
    price: 3850000,
    image: "/images/notebook-pro-n14.png",
    description: "Notebook liviana de 14 pulgadas, ideal para clases, oficina, videollamadas y productividad diaria.",
    whatsappMessage: "Hola, quiero consultar por la Notebook Pro N14."
  },
  {
    id: "teclado-mecanico-k2",
    name: "Teclado Mecanico K2",
    category: "perifericos",
    price: 320000,
    image: "/images/teclado-mecanico-k2.png",
    description: "Teclado mecanico compacto con iluminacion RGB, respuesta precisa y construccion resistente.",
    whatsappMessage: "Hola, quiero consultar por el Teclado Mecanico K2."
  },
  {
    id: "mouse-gamer-x1",
    name: "Mouse Gamer X1",
    category: "perifericos",
    price: 95000,
    image: "/images/mouse-gamer-x1.png",
    description: "Mouse gamer ergonomico con sensor ajustable, botones laterales e iluminacion RGB.",
    whatsappMessage: "Hola, quiero consultar por el Mouse Gamer X1."
  },
  {
    id: "cargador-rapido-c3",
    name: "Cargador Rapido C3",
    category: "accesorios",
    price: 78000,
    image: "/images/cargador-rapido-c3.png",
    description: "Cargador USB-C de carga rapida para celulares, tablets y accesorios compatibles.",
    whatsappMessage: "Hola, quiero consultar por el Cargador Rapido C3."
  }
];

const productGrid = document.querySelector("#productGrid");
const dialog = document.querySelector("#productDialog");
const dialogBody = document.querySelector("#dialogBody");
const dialogClose = document.querySelector(".dialog-close");
const filterButtons = document.querySelectorAll(".filter-button");
const currencyFormatter = new Intl.NumberFormat("es-PY", {
  style: "currency",
  currency: "PYG",
  maximumFractionDigits: 0
});

function productAnalytics(product) {
  return {
    product_id: product.id,
    product_name: product.name,
    category: product.category,
    price: product.price
  };
}

function trackEvent(event, data = {}) {
  window.dataLayer.push({
    event,
    ...data
  });

  console.log("TRACK:", event, data);
}

function createWhatsappUrl(product) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(product.whatsappMessage)}`;
}

function renderProducts(category = "todos") {
  const visibleProducts = category === "todos"
    ? products
    : products.filter((product) => product.category === category);

  productGrid.innerHTML = visibleProducts
    .map((product) => {
      const analyticsAttrs = `
        data-product-id="${product.id}"
        data-product-name="${product.name}"
        data-category="${product.category}"
        data-price="${product.price}"
      `;

      return `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy" width="720" height="520" />
          <div class="product-card-body">
            <span class="category-label">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <strong>${currencyFormatter.format(product.price)}</strong>
            <div class="product-actions">
              <button class="btn btn-light js-view-product" type="button" ${analyticsAttrs}>
                Ver producto
              </button>
              <a
                class="btn btn-primary js-whatsapp"
                href="${createWhatsappUrl(product)}"
                target="_blank"
                rel="noopener noreferrer"
                ${analyticsAttrs}
              >
                Comprar por WhatsApp
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function findProductFromElement(element) {
  return products.find((product) => product.id === element.dataset.productId);
}

function openProductDialog(product) {
  dialogBody.innerHTML = `
    <img src="${product.image}" alt="${product.name}" width="720" height="520" />
    <div>
      <span class="category-label">${product.category}</span>
      <h2 id="dialogTitle">${product.name}</h2>
      <p>${product.description}</p>
      <strong>${currencyFormatter.format(product.price)}</strong>
      <a
        class="btn btn-primary js-whatsapp"
        href="${createWhatsappUrl(product)}"
        target="_blank"
        rel="noopener noreferrer"
        data-product-id="${product.id}"
        data-product-name="${product.name}"
        data-category="${product.category}"
        data-price="${product.price}"
      >
        Comprar por WhatsApp
      </a>
    </div>
  `;

  trackEvent("view_item", productAnalytics(product));
  dialog.showModal();
}

document.addEventListener("click", (event) => {
  const viewCatalogButton = event.target.closest(".js-view-catalog");
  const viewProductButton = event.target.closest(".js-view-product");
  const whatsappButton = event.target.closest(".js-whatsapp");
  const contactButton = event.target.closest(".js-contact");

  if (viewCatalogButton) {
    trackEvent("view_catalog", {
      section: "productos"
    });
  }

  if (viewProductButton) {
    const product = findProductFromElement(viewProductButton);
    if (product) {
      openProductDialog(product);
    }
  }

  if (whatsappButton) {
    const product = findProductFromElement(whatsappButton);
    if (product) {
      trackEvent("click_whatsapp", productAnalytics(product));
    }
  }

  if (contactButton) {
    trackEvent("contact", {
      channel: contactButton.dataset.contactChannel || "page"
    });
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderProducts(button.dataset.filter);
    trackEvent("view_catalog", {
      category: button.dataset.filter
    });
  });
});

dialogClose.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

renderProducts();
