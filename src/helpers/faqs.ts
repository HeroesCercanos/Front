export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  image: string;
}

export const faqs: FAQItem[] = [
  {
    id: "donacion",
    question: "¿Cómo puedo hacer una donación?",
    answer:
      "En Héroes Cercanos podés colaborar con donaciones seguras a través de Mercado Pago. " +
      "Ingresá a la sección Campañas para conocer las necesidades actuales. Hacé clic en el botón QUIERO DONAR, completá el formulario y seguí los pasos para realizar tu aporte. Tu ayuda llega de forma directa y transparente a quienes más lo necesitan.",
    image: "/donacionesFAQs.png",
  },
  {
    id: "cuarteles",
    question: "¿Qué necesita el cuartel?",
    answer:
      "El cuartel publica campañas actualizadas según las necesidades que van surgiendo." +
      "Cuando se presenta una nueva urgencia o requerimiento, vas a encontrar una campaña activa a la que podés sumarte con tu aporte.",
    image: "/cuartelFAQs.png",
  },
  {
    id: "educacion",
    question: "¿Qué tipo de contenido educativo hay?",
    answer:
      "Nuestra sección de capacitación incluye videos de primeros auxilios, guías en PDF sobre prevención de incendios e infografías interactivas. " +
      "Todo el material está disponible gratuitamente y se aloja en la nube para garantizar velocidad y calidad.",
    image: "/capacitacionesFAQs.png",
  },
];
