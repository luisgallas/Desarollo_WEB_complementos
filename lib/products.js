// Catalogo academico de productos para mostrar en la pagina.
// Cada objeto representa un producto de la tienda.
export const products = [
  {
    // ID estable: sirve para analytics y no debe cambiar aunque se reordene el catalogo.
    id: "auricular-bt-a1",
    // Nombre visible del producto.
    name: "Auriculares Bluetooth A1",
    // Categoria interna usada por analytics.
    category: "audio",
    // Categoria visible para el usuario.
    categoryLabel: "Audio",
    // Precio en guaranies.
    price: 185000,
    // Imagen local del producto.
    image: "/images/auriculares.webp",
    // Texto corto que aparece en la tarjeta y en el detalle.
    description: "Tu musica, sin cables. Comodidad para estudiar, trabajar y desconectar.",
    // Mensaje preparado para abrir en WhatsApp.
    whatsappMessage: "Hola, quiero consultar por los Auriculares Bluetooth A1.",
    // Caracteristicas principales del producto.
    specs: ["Conexion Bluetooth", "Diseno de diadema", "Controles integrados"],
  },
  {
    id: "smartwatch-s1",
    name: "Smartwatch S1",
    category: "wearables",
    categoryLabel: "Wearables",
    price: 249000,
    image: "/images/smartwatch.webp",
    description: "Un companero en tu muneca para seguir tu actividad y ver tus notificaciones.",
    whatsappMessage: "Hola, quiero consultar por el Smartwatch S1.",
    specs: ["Pantalla tactil", "Registro de actividad", "Notificaciones del telefono"],
  },
  {
    id: "notebook-n1",
    name: "Notebook N1",
    category: "computacion",
    categoryLabel: "Computacion",
    price: 3850000,
    image: "/images/notebook.webp",
    description: "Tu espacio de estudio y trabajo, listo para acompanarte a donde vayas.",
    whatsappMessage: "Hola, quiero consultar por la Notebook N1.",
    specs: ["Formato portatil", "Almacenamiento SSD", "Conectividad Wi-Fi"],
  },
  {
    id: "teclado-mecanico-k2",
    name: "Teclado Mecanico K2",
    category: "perifericos",
    categoryLabel: "Perifericos",
    price: 295000,
    image: "/images/teclado.webp",
    description: "Cada tecla cuenta. Un formato compacto para tu escritorio y tus partidas.",
    whatsappMessage: "Hola, quiero consultar por el Teclado Mecanico K2.",
    specs: ["Teclas mecanicas", "Formato compacto", "Conexion USB"],
  },
  {
    id: "mouse-gamer-x1",
    name: "Mouse Gamer X1",
    category: "perifericos",
    categoryLabel: "Perifericos",
    price: 95000,
    image: "/images/mouse-gamer.webp",
    description: "Movimientos precisos y un agarre comodo para jugar a tu manera.",
    whatsappMessage: "Hola, quiero consultar por el Mouse Gamer X1.",
    specs: ["Sensor optico", "Sensibilidad ajustable", "Diseno ergonomico"],
  },
  {
    id: "parlante-bt-p1",
    name: "Parlante Bluetooth P1",
    category: "audio",
    categoryLabel: "Audio",
    price: 210000,
    image: "/images/parlante.webp",
    description: "Dale sonido a tus planes con un parlante que podes llevar con vos.",
    whatsappMessage: "Hola, quiero consultar por el Parlante Bluetooth P1.",
    specs: ["Conexion Bluetooth", "Bateria recargable", "Formato portatil"],
  },
];

// Convierte un numero en precio con formato paraguayo.
export const formatPrice = (price) => "Gs. " + new Intl.NumberFormat("es-PY").format(price);
