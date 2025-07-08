export interface FAQItem {
	id: string;
	question: string;
	answer: string;
	image: string;
}

export const faqs: FAQItem[] = [
	{
		id: 'donacion',
		question: '¿Cómo puedo hacer una donación?',
		answer:
			'En Héroes Cercanos podés donar tanto dinero como insumos físicos (ropa, alimentos, herramientas). ' +
			"Entrá a la sección de 'Donaciones y Campañas', elegí el cuartel al que quieras ayudar, completá el formulario y seguí las instrucciones de pago con MercadoPago. Tu contribución llega directamente al destino correcto.",
		image: '/donacionesFAQs.png',
	},
	{
		id: 'cuarteles',
		question: '¿Cómo sé qué necesita cada cuartel?',
		answer:
			'Cada cuartel mantiene actualizada su lista de necesidades en su ficha del mapa. ' +
			'Hacé clic en el ícono de un cuartel y verás su lista de insumos solicitados (ropa, víveres, herramientas). Así podés donar exactamente lo que más necesitan.',
		image: '/cuartelFAQs.png',
	},
	{
		id: 'educacion',
		question: '¿Qué tipo de contenido educativo hay?',
		answer:
			'Nuestra sección de capacitación incluye videos de primeros auxilios, guías en PDF sobre prevención de incendios e infografías interactivas. ' +
			'Todo el material está disponible gratuitamente y se aloja en la nube para garantizar velocidad y calidad.',
		image: '/capacitacionesFAQs.png',
	},
];
