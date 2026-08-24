import type { Lang } from './i18n'

// Fecha de la versión vigente del texto. Actualizala cada vez que cambie el
// contenido de abajo: la página la muestra como "última actualización".
export const LEGAL_UPDATED = '2026-08-24'

export interface LegalSection {
  readonly heading: string
  readonly paragraphs: readonly string[]
}

export interface LegalDocument {
  readonly title: string
  readonly intro: string
  readonly updatedLabel: string
  readonly sections: readonly LegalSection[]
}

// Borrador completo, pendiente de revisión legal. Lo que describe el
// funcionamiento del sitio —qué campos pide el formulario, qué guarda el
// navegador, qué mide la analítica— está verificado contra el código. Lo que
// es criterio legal (plazos de conservación, alcance de la responsabilidad,
// jurisdicción) son valores razonables por defecto, no asesoramiento.
export const legalDocuments: Record<Lang, LegalDocument> = {
  es: {
    title: 'Términos y condiciones',
    intro:
      'Estos términos regulan el acceso y el uso de este sitio, el portfolio personal ' +
      'de Tomás Javier Sale. Al navegarlo, aceptás las condiciones que siguen.',
    updatedLabel: 'Última actualización',
    sections: [
      {
        heading: 'Titular del sitio',
        paragraphs: [
          'El sitio pertenece a Tomás Javier Sale, desarrollador web con actividad en la República Argentina, y funciona como muestra de su trabajo profesional.',
          'Para cualquier consulta sobre estos términos podés escribir por el formulario de contacto de este mismo sitio o por el perfil de LinkedIn enlazado en la barra superior. Las consultas se responden por la misma vía por la que llegaron.',
        ],
      },
      {
        heading: 'Objeto y aceptación',
        paragraphs: [
          'El contenido se publica con fines informativos y de presentación profesional. No constituye una oferta comercial vinculante ni asesoramiento de ningún tipo.',
          'El uso del sitio implica la aceptación de estos términos en su versión vigente al momento del acceso. Si no estás de acuerdo con ellos, no lo uses.',
        ],
      },
      {
        heading: 'Uso permitido',
        paragraphs: [
          'Podés navegar el sitio, leer su contenido y contactarte a través del formulario para consultas profesionales.',
          'No está permitido usarlo con fines ilícitos, intentar vulnerar su seguridad o la de su infraestructura, ni emplear medios automatizados para enviar mensajes masivos por el formulario de contacto.',
          'El formulario de contacto limita la cantidad de envíos por remitente. Los intentos que excedan ese límite se rechazan sin ser entregados.',
        ],
      },
      {
        heading: 'Propiedad intelectual',
        paragraphs: [
          'Los textos, el diseño, el código y las piezas gráficas de este sitio pertenecen a su titular. Todos los derechos reservados.',
          'Está permitido citar o enlazar el contenido con atribución. No lo está reproducirlo de forma sustancial, ni reutilizar el diseño o el código como base de otro sitio, sin autorización previa por escrito.',
          'Los proyectos exhibidos pueden incluir nombres, marcas o materiales de terceros, que pertenecen a sus respectivos titulares y se muestran únicamente como referencia del trabajo realizado. El código de los proyectos publicados en repositorios públicos se rige por la licencia declarada en cada repositorio, que prevalece sobre esta cláusula.',
        ],
      },
      {
        heading: 'Formulario de contacto y datos personales',
        paragraphs: [
          'El formulario pide tres datos: correo electrónico, teléfono y el mensaje que quieras enviar. Se usan con un único fin: responder tu consulta. No se emplean para envíos publicitarios ni se incorporan a ninguna lista de difusión.',
          'Esos datos se envían por correo electrónico a la casilla del titular. El sitio no los guarda en ninguna base de datos propia ni los cede o vende a terceros. El servicio de correo que hace la entrega trata los datos según sus propias políticas.',
          'Los mensajes recibidos se conservan mientras dure el intercambio y hasta veinticuatro meses después de la última comunicación, salvo que de la consulta surja una relación profesional que exija conservarlos por más tiempo.',
          'Podés pedir en cualquier momento el acceso, la rectificación, la actualización o la supresión de tus datos, escribiendo por las vías indicadas en la primera sección. El pedido se atiende sin costo y en los plazos que fija la ley. En la Argentina, el tratamiento de datos personales se rige por la Ley 25.326 y la autoridad de control es la Agencia de Acceso a la Información Pública, ante la que podés presentar un reclamo si considerás que tus derechos fueron afectados.',
        ],
      },
      {
        heading: 'Almacenamiento en tu navegador y analítica',
        paragraphs: [
          'El sitio guarda en tu navegador dos preferencias: el idioma y el tema —claro u oscuro— que elegiste. Se conservan solo en tu dispositivo, no identifican a la persona y no se envían a ningún servidor. Podés borrarlas limpiando los datos del sitio desde tu navegador.',
          'Para medir el rendimiento de las páginas se usa Vercel Speed Insights, que recoge métricas de carga de forma agregada y anónima.',
          'No se usan cookies publicitarias ni de seguimiento entre sitios, y por eso el sitio no muestra un cartel de consentimiento: no hay nada que consentir.',
        ],
      },
      {
        heading: 'Enlaces a sitios de terceros',
        paragraphs: [
          'El sitio enlaza a perfiles y páginas externas —entre otras, LinkedIn, GitHub y los sitios de los proyectos exhibidos— para ampliar la información.',
          'Esos destinos tienen sus propios términos y políticas de privacidad. El titular de este sitio no controla su contenido ni responde por él. Seguir un enlace externo implica salir de este sitio y quedar sujeto a las condiciones del destino.',
        ],
      },
      {
        heading: 'Disponibilidad y responsabilidad',
        paragraphs: [
          'El sitio se ofrece tal como está. Se procura que esté disponible y que su información sea correcta y actual, pero no se garantiza la continuidad del servicio ni la ausencia de errores o interrupciones.',
          'El titular no responde por los daños derivados del uso del sitio o de la imposibilidad de usarlo, ni por la falta de disponibilidad atribuible a la conexión del visitante o a los servicios de terceros de los que depende la publicación. Esta limitación no alcanza a los supuestos que la ley aplicable no permite excluir, entre ellos el dolo y la culpa grave.',
          'El titular puede modificar, suspender o dar de baja el sitio o cualquiera de sus secciones, en cualquier momento y sin aviso previo.',
        ],
      },
      {
        heading: 'Cambios en estos términos',
        paragraphs: [
          'Estos términos pueden actualizarse en cualquier momento. La versión vigente es siempre la publicada en esta página, y su fecha figura al comienzo.',
          'Los cambios rigen desde su publicación. Conviene releerlos cada tanto: seguir usando el sitio después de una modificación implica aceptarla.',
        ],
      },
      {
        heading: 'Ley aplicable y jurisdicción',
        paragraphs: [
          'Estos términos se rigen por las leyes de la República Argentina.',
          'Ante cualquier controversia derivada del uso del sitio, las partes se someten a los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires, con renuncia a cualquier otro fuero o jurisdicción que pudiera corresponder.',
        ],
      },
    ],
  },
  en: {
    title: 'Terms and conditions',
    intro:
      'These terms govern access to and use of this site, the personal portfolio of ' +
      'Tomás Javier Sale. By browsing it, you accept the conditions below.',
    updatedLabel: 'Last updated',
    sections: [
      {
        heading: 'Site owner',
        paragraphs: [
          'This site belongs to Tomás Javier Sale, a web developer working in Argentina, and showcases his professional work.',
          'For any question about these terms you can write through the contact form on this site or through the LinkedIn profile linked in the top bar. Enquiries are answered through the same channel they arrived on.',
        ],
      },
      {
        heading: 'Purpose and acceptance',
        paragraphs: [
          'The content is published for informational and professional presentation purposes. It is neither a binding commercial offer nor advice of any kind.',
          'Using the site implies acceptance of these terms as published at the time of access. If you do not agree with them, please do not use it.',
        ],
      },
      {
        heading: 'Permitted use',
        paragraphs: [
          'You may browse the site, read its content and reach out through the contact form for professional enquiries.',
          'You may not use it for unlawful purposes, attempt to breach its security or that of its infrastructure, or use automated means to send bulk messages through the contact form.',
          'The contact form limits how many messages a single sender can submit. Attempts beyond that limit are rejected and never delivered.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'The texts, design, code and graphics on this site belong to its owner. All rights reserved.',
          'You may quote or link to the content with attribution. You may not reproduce it substantially, nor reuse the design or the code as the basis for another site, without prior written permission.',
          'The projects on display may include names, trademarks or materials owned by third parties; they belong to their respective owners and appear only as a reference to the work carried out. Code published in public repositories is governed by the licence stated in each repository, which prevails over this clause.',
        ],
      },
      {
        heading: 'Contact form and personal data',
        paragraphs: [
          'The form asks for three things: email address, phone number and the message you want to send. They are used for one purpose only: replying to your enquiry. They are never used for marketing or added to any mailing list.',
          'That data is delivered by email to the owner’s mailbox. The site does not store it in any database of its own, nor does it share or sell it to third parties. The email service that performs the delivery processes the data under its own policies.',
          'Messages received are kept for as long as the exchange lasts and for up to twenty-four months after the last communication, unless the enquiry leads to a professional relationship that requires keeping them longer.',
          'You may request access to, rectification, updating or deletion of your data at any time, through the channels listed in the first section. Requests are handled free of charge and within the periods set by law. In Argentina, the processing of personal data is governed by Law 25.326, and the supervisory authority is the Agencia de Acceso a la Información Pública, where you may file a complaint if you believe your rights have been affected.',
        ],
      },
      {
        heading: 'Browser storage and analytics',
        paragraphs: [
          'The site stores two preferences in your browser: the language and the theme —light or dark— you chose. They stay on your device, do not identify you and are never sent to any server. You can remove them by clearing the site data in your browser.',
          'Page performance is measured with Vercel Speed Insights, which collects loading metrics in aggregated, anonymous form.',
          'No advertising or cross-site tracking cookies are used, which is why the site shows no consent banner: there is nothing to consent to.',
        ],
      },
      {
        heading: 'Third-party links',
        paragraphs: [
          'The site links to external profiles and pages —LinkedIn, GitHub and the sites of the projects on display, among others— to expand on the information.',
          'Those destinations have their own terms and privacy policies. The owner of this site neither controls their content nor is responsible for it. Following an external link means leaving this site and becoming subject to the destination’s conditions.',
        ],
      },
      {
        heading: 'Availability and liability',
        paragraphs: [
          'The site is provided as is. Every effort is made to keep it available and its information correct and current, but continuity of service and freedom from errors or interruptions are not guaranteed.',
          'The owner is not liable for damage arising from the use of the site or the inability to use it, nor for unavailability attributable to the visitor’s connection or to the third-party services the site depends on. This limitation does not cover cases that the applicable law does not allow to be excluded, including wilful misconduct and gross negligence.',
          'The owner may modify, suspend or take down the site or any of its sections at any time and without prior notice.',
        ],
      },
      {
        heading: 'Changes to these terms',
        paragraphs: [
          'These terms may be updated at any time. The version in force is always the one published on this page, dated at the top.',
          'Changes take effect on publication. It is worth re-reading them from time to time: continuing to use the site after a change means accepting it.',
        ],
      },
      {
        heading: 'Governing law and jurisdiction',
        paragraphs: [
          'These terms are governed by the laws of the Argentine Republic.',
          'For any dispute arising from the use of the site, the parties submit to the ordinary courts of the Autonomous City of Buenos Aires, waiving any other venue or jurisdiction that might apply.',
        ],
      },
    ],
  },
}
