// Datos compartidos por las futuras páginas Blogs.jsx y DetalleBlog.jsx.
// Cada id permitirá identificar el artículo en su dirección.
const blogs = [
  {
    // Información del primer artículo para el listado de Blogs.
    id: "1",
    titulo: "¿Qué hace que un bizcocho sea esponjoso?",
    resumen:
      "Conoce el papel del aire, los ingredientes y el horneado en la textura de un bizcocho.",
    textoEnlace: "Leer sobre bizcochos",

    // La imagen está guardada en public/img.
    imagen: "/img/hero-pasteleria.jpeg",
    textoAlternativo: "Bizcocho artesanal decorado con crema y frutos rojos",

    // Presentación que mostrará DetalleBlog.jsx.
    etiqueta: "Aprendamos de pastelería",
    introduccion:
      "La textura de un bizcocho depende de los ingredientes, la preparación y el horneado. Cada paso aporta algo al resultado final.",

    // Cada sección contiene un subtítulo y una lista de párrafos.
    secciones: [
      {
        titulo: "El aire también es un ingrediente",
        parrafos: [
          "Al batir incorporamos pequeñas burbujas de aire a la mezcla. Durante el horneado, estas se expanden y ayudan a formar la estructura del bizcocho.",
          "Algunas recetas utilizan huevos batidos; otras comienzan batiendo mantequilla con azúcar. Por eso conviene seguir el método indicado en cada receta.",
        ],
      },
      {
        titulo: "Mezclar con cuidado",
        parrafos: [
          "Después de añadir la harina, muchas recetas requieren mezclar solo hasta integrarla. Batir demasiado puede favorecer una textura más dura.",
          "Si la preparación lleva claras montadas, los movimientos envolventes ayudan a conservar parte del aire incorporado.",
        ],
      },
      {
        titulo: "La importancia del horno",
        parrafos: [
          "Precalentar el horno permite comenzar la cocción a la temperatura indicada. El tiempo necesario depende de la receta, el molde y el funcionamiento del horno.",
          "Abrir la puerta demasiado pronto puede afectar una preparación cuya estructura todavía no se ha fijado. Respeta las indicaciones de la receta antes de comprobar la cocción.",
        ],
      },
      {
        titulo: "Un pequeño consejo",
        parrafos: [
          "Mide los ingredientes y prepara los utensilios antes de comenzar. Así podrás seguir cada paso con calma y repetir con mayor facilidad tus mejores resultados.",
        ],
      },
    ],
  },
  {
    // Información del segundo artículo para el listado de Blogs.
    id: "2",
    titulo: "Cómo elegir una torta para tu celebración",
    resumen:
      "El número de invitados, los sabores y la decoración pueden ayudarte a elegir una torta para la ocasión.",
    textoEnlace: "Leer los consejos",

    // Reutiliza la imagen del proyecto original.
    imagen: "/img/hero-pasteleria.jpeg",
    textoAlternativo: "Torta para una celebración decorada con frutos rojos",

    // Presentación que mostrará DetalleBlog.jsx.
    etiqueta: "Ideas para celebrar",
    introduccion:
      "Elegir una torta es parte de preparar un momento especial. Estas ideas te ayudarán a organizar lo que necesitas.",

    // Consejos completos del segundo artículo.
    secciones: [
      {
        titulo: "Comienza por tus invitados",
        parrafos: [
          "Anota cuántas personas asistirán y si habrá otros postres. Con esa información podrás consultar qué tamaño de torta se ajusta mejor a tu celebración.",
        ],
      },
      {
        titulo: "Piensa en los sabores",
        parrafos: [
          "Chocolate, vainilla o frutos rojos pueden ser el punto de partida. Considera los gustos de la persona que celebra y combina el bizcocho, el relleno y la cobertura.",
        ],
      },
      {
        titulo: "Consulta las necesidades de tus invitados",
        parrafos: [
          "Antes de realizar el pedido, pregunta si hay necesidades alimentarias que debas comunicar a la pastelería. Confirma los ingredientes y las opciones disponibles directamente con quien prepara el producto.",
        ],
      },
      {
        titulo: "Elige una decoración con significado",
        parrafos: [
          "Los colores, un mensaje o una temática pueden dar un toque personal a la torta. Comparte tu idea con anticipación y consulta qué detalles se pueden realizar.",
        ],
      },
      {
        titulo: "Organiza la entrega",
        parrafos: [
          "Confirma la fecha, el horario y la forma de entrega o retiro. Pide también las indicaciones de transporte y conservación correspondientes a la torta elegida.",
        ],
      },
    ],
  },
];

// Permite importar esta lista desde las páginas del blog.
export default blogs;
