export type Lang = 'es' | 'en'

export const translations = {
  es: {
    webDeveloper: 'Desarrollador Web',
    description:
      '+{xp} años de experiencia en el desarrollo de software de alta calidad, ' +
      'aplicando diversas tecnologías para ofrecer soluciones efectivas, eficientes, ' +
      'buscando el análisis de requisitos y resolución de problemas. ' +
      'Amplio compromiso con las mejores prácticas de desarrollo y mejora continua, ' +
      'implementando tecnologías optimizadoras de rendimiento y usabilidad del software. ' +
      'Enfoque riguroso en la calidad y la atención al detalle garantizando estándares exigentes, ' +
      'proporcionando una mejor experiencia a los usuarios finales.',
    skills: 'Habilidades',
    portfolio: 'Portafolio',
    contactMe: 'Contáctame',
    loadingProjects: 'Cargando proyectos...',
    viewSite: 'Ver sitio',
    scrollCue: 'Recorré el portfolio',
    sectionsNav: 'Secciones',
    mainNav: 'Principal',
    messageLimit: 'Máximo {max} caracteres',
    showingCategory: 'Mostrando la categoría {category}',
    directLinks: 'Enlaces directos',
    // Nav (por ref)
    nav_aboutMe: 'Sobre mí',
    nav_skill: 'Habilidades',
    nav_portfolio: 'Portafolio',
    nav_contact: 'Contacto',
    // Categorías de skills
    cat_All: 'Todas',
    'cat_Front-End': 'Front-End',
    'cat_Back-End': 'Back-End',
    cat_DataBase: 'Base de Datos',
    cat_Design: 'Diseño',
    cat_Tools: 'Herramientas',
    // Formulario
    emailLabel: 'Email',
    phoneLabel: 'Teléfono',
    messageLabel: '¿En qué puedo ayudarte?',
    emailPlaceholder: 'tu@email.com',
    phonePlaceholder: '+54 11 1234-5678',
    messagePlaceholder: 'Escribí tu mensaje acá...',
    submit: 'Enviar',
    sending: 'Enviando...',
    success: '¡Mensaje enviado exitosamente!',
    errorLabel: 'Error',
    connectionError: 'Error de conexión',
    unexpectedError: 'Ocurrió un error inesperado',
    sendError: 'Hubo un error al enviar el mensaje.',
    // Controles
    switchToEnglish: 'Switch to English',
    switchToSpanish: 'Cambiar a Español',
    switchToLight: 'Modo claro',
    switchToDark: 'Modo oscuro',
    // Páginas fuera del recorrido (404 y legales)
    notFoundTitle: 'Acá no hay nada',
    notFoundText:
      'El enlace que seguiste no lleva a ninguna sección del portfolio. ' +
      'Puede que la dirección esté mal escrita o que esa página ya no exista.',
    backHome: 'Volver al inicio',
    terms: 'Términos y condiciones',
    // Enlaces (por alt del ícono)
    link_linkedin: 'LinkedIn',
    link_github: 'GitHub',
    link_curriculum: 'CV',
  },
  en: {
    webDeveloper: 'Web Developer',
    description:
      '+{xp} years of experience developing high-quality software, ' +
      'applying diverse technologies to deliver effective and efficient solutions, ' +
      'focusing on requirements analysis and problem solving. ' +
      'Strong commitment to development best practices and continuous improvement, ' +
      'implementing technologies that optimize software performance and usability. ' +
      'A rigorous focus on quality and attention to detail, ensuring demanding standards ' +
      'and providing a better experience for end users.',
    skills: 'Skills',
    portfolio: 'Portfolio',
    contactMe: 'Contact Me',
    loadingProjects: 'Loading projects...',
    viewSite: 'View site',
    scrollCue: 'Take the tour',
    sectionsNav: 'Sections',
    mainNav: 'Main',
    messageLimit: 'Maximum {max} characters',
    showingCategory: 'Showing the {category} category',
    directLinks: 'Direct links',
    // Nav (por ref)
    nav_aboutMe: 'About me',
    nav_skill: 'Skills',
    nav_portfolio: 'Portfolio',
    nav_contact: 'Contact',
    // Categorías de skills
    cat_All: 'All',
    'cat_Front-End': 'Front-End',
    'cat_Back-End': 'Back-End',
    cat_DataBase: 'Database',
    cat_Design: 'Design',
    cat_Tools: 'Tools',
    // Formulario
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    messageLabel: 'How can I help you?',
    emailPlaceholder: 'your@email.com',
    phonePlaceholder: '+54 11 1234-5678',
    messagePlaceholder: 'Write your message here...',
    submit: 'Submit',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    errorLabel: 'Error',
    connectionError: 'Connection error',
    unexpectedError: 'An unexpected error occurred',
    sendError: 'There was an error sending the message.',
    // Controles
    switchToEnglish: 'Switch to English',
    switchToSpanish: 'Cambiar a Español',
    switchToLight: 'Light mode',
    switchToDark: 'Dark mode',
    // Páginas fuera del recorrido (404 y legales)
    notFoundTitle: 'Nothing here',
    notFoundText:
      'The link you followed does not lead to any section of the portfolio. ' +
      'The address may be misspelled, or the page may no longer exist.',
    backHome: 'Back to the start',
    terms: 'Terms and conditions',
    // Enlaces (por alt del ícono)
    link_linkedin: 'LinkedIn',
    link_github: 'GitHub',
    link_curriculum: 'CV',
  },
} as const

export type TranslationKey = keyof (typeof translations)['en']

// Lookups dinámicos con fallback al valor original (para contenido de los JSON).
export function translateCategory(lang: Lang, category: string): string {
  const dict = translations[lang] as Record<string, string>
  return dict[`cat_${category}`] ?? category
}

export function translateNav(lang: Lang, ref: string, fallback: string): string {
  const dict = translations[lang] as Record<string, string>
  return dict[`nav_${ref}`] ?? fallback
}

export function translateLink(lang: Lang, alt: string, fallback: string): string {
  const dict = translations[lang] as Record<string, string>
  return dict[`link_${alt}`] ?? fallback
}
