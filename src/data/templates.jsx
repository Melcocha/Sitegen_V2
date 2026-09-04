// ─── CURATED PREMIUM WEBSITES TEMPLATES ───────────────────────────
// Different layouts, visual structures, text copy and color combinations

export const PRESET_TEMPLATES = [
  {
    id: 'church-modern-nucleus',
    name: 'Iglesia Moderna (Estándar Nucleus)',
    description: 'Diseñado bajo la regla de los 50ms y baja complejidad visual. Incluye sección "Planear una Visita", Prédicas y Launcher Flotante.',
    category: 'Iglesias',
    previewColor: '#00C896',
    site_json: {
      businessName: 'Iglesia Vida Nueva',
      tagline: 'Un lugar para encontrar fe, esperanza y comunidad',
      description: 'Somos una comunidad viva de fe dedicada a amar a Dios y servir a nuestra ciudad.',
      primaryColor: '#0F172A',
      secondaryColor: '#F8FAFC',
      accentColor: '#00C896',
      font: 'Inter',
      headingWeight: 900,
      logoSize: 50,
      industry: 'Iglesia / Ministerio / Fe',
      sectionOrder: ['hero', 'planAVisit', 'sermons', 'services', 'about', 'contact'],
      sectionsVisibility: { hero: true, planAVisit: true, sermons: true, services: true, about: true, contact: true },
      launcher: {
        enabled: true,
        buttonText: 'Siguientes Pasos',
        isChurchMode: true
      },
      hero: {
        headline: 'Una iglesia donde tú y tu familia pertenecen.',
        subheadline: 'No importa de dónde vengas o en qué punto de tu camino te encuentres. Aquí hay un espacio para ti.',
        ctaText: 'Planear una visita',
        ctaLink: '#wp-plan-visit',
        ctaSecondary: 'Ver prédicas recientes',
        ctaSecondaryLink: '#wp-sermons'
      },
      heroImage: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=85&fit=crop',
      planAVisit: {
        title: 'Planifica tu Primera Visita',
        subtitle: 'Queremos que tu experiencia sea cómoda, inspiradora y acogedora.',
        serviceTimes: ['Domingos: 9:00 AM y 11:30 AM', 'Miércoles de Oración: 7:00 PM'],
        address: 'Av. Las Gardenias #450, Ciudad',
        whatToExpect: 'Música contemporánea, un mensaje bíblico práctico de 35 minutos y un ambiente relajado sin código de vestimenta.',
        kidsInfo: 'Contamos con KidZone: un ambiente seguro, divertido y adaptado para niños de 0 a 11 años.'
      },
      sermonsLabel: 'Mensajes Dominicales',
      sermonsTitle: 'Serie Actual: "Fe Inquebrantable"',
      sermonsSubtitle: 'Explora nuestras prédicas más recientes en video y podcast.',
      sermons: [
        { title: 'Superando la Ansiedad con Fe', speaker: 'Pastor Carlos Gómez', date: 'Domingo Pasado', duration: '38 min', series: 'Fe Inquebrantable', videoUrl: 'https://www.youtube.com/watch?v=0IfuwIa3qjw' },
        { title: 'El Poder de la Oración Constante', speaker: 'Pastora Maria Gómez', date: 'Hace 2 semanas', duration: '42 min', series: 'Fe Inquebrantable', videoUrl: 'https://www.youtube.com/watch?v=0IfuwIa3qjw' },
        { title: 'Caminando sobre el Agua', speaker: 'Pastor Carlos Gómez', date: 'Hace 3 semanas', duration: '35 min', series: 'Fe Inquebrantable', videoUrl: 'https://www.youtube.com/watch?v=0IfuwIa3qjw' }
      ],
      servicesLabel: 'Ministerios & Conexión',
      servicesTitle: 'Encuentra tu lugar para servir y crecer',
      servicesSubtitle: 'Grupos pequeños y comunidades diseñadas para cada etapa de la vida.',
      services: [
        { icon: '🌱', title: 'Grupos de Conexión (Casas de Paz)', description: 'Reuniones semanales en hogares para compartir la palabra, orar y forjar amistades genuinas.', cta: 'Unirme a un grupo' },
        { icon: '⚡', title: 'Jóvenes & Universitarios', description: 'Reuniones dinámicas los sábados para inspirar a la nueva generación a vivir con propósito.', cta: 'Conocer más' },
        { icon: '👶', title: 'Ministerio Infantil KidZone', description: 'Clases divertidas, actividades bíblicas y maestros capacitados para cuidar de tus hijos.', cta: 'Ver horarios' }
      ],
      about: {
        sectionLabel: 'Quiénes Somos',
        title: 'Nuestra Misión y Visión',
        text: 'Vida Nueva nació en 2012 con la pasión de ser una iglesia transparente, centrada en Jesús y compasiva con la comunidad local.',
        highlights: [
          'Enfoque Bíblico: Mensajes prácticos para la vida diaria.',
          'Comunidad Real: Relaciones auténticas sin máscaras.',
          'Impacto Social: Comedores y ayuda alimentaria cada mes.'
        ]
      },
      contact: {
        sectionTitle: '¿Tienes preguntas o necesitas oración?',
        subtitle: 'Déjanos un mensaje y nuestro equipo pastoral te responderá con gusto.',
        phone: '+503 2288-0099',
        whatsapp: '+503 7899-0099',
        email: 'contacto@vidanuevachurch.org',
        address: 'Av. Las Gardenias #450, Ciudad',
        showForm: true,
        ctaText: 'Enviar mensaje'
      },
      seo: {
        title: 'Iglesia Vida Nueva | Una comunidad de fe para toda la familia',
        description: 'Te invitamos a nuestras reuniones dominicales. Prédicas bíblicas, música contemporánea y programas para niños.'
      }
    }
  },
  {
    id: 'lead-generation-minimal',
    name: 'Studio Minimalist',
    description: 'Especialmente diseñado para captar clientes y prospectos de servicios profesionales o agencias creativas.',
    category: 'Captar Clientes',
    previewColor: '#6366F1',
    site_json: {
      businessName: 'Aura Studio',
      tagline: 'Diseño & Desarrollo de Interfaces Excepcionales',
      description: 'Creamos productos digitales que cautivan a tu audiencia y multiplican tus conversiones de negocio.',
      primaryColor: '#09090B',
      secondaryColor: '#FAFAFA',
      accentColor: '#6366F1',
      font: 'Montserrat',
      headingWeight: 900,
      logoSize: 45,
      sectionOrder: ['hero', 'services', 'about', 'testimonials', 'contact'],
      sectionsVisibility: { hero: true, services: true, about: true, testimonials: true, contact: true },
      variants: {
        hero: 3,        // Centered clean, glassmorphism hero
        services: 4,    // Minimal text grid with accents
        about: 2,       // Highlights lists
        testimonials: 2, // Large single blockquote style
        contact: 2,     // Visual cards layout
        footer: 2
      },
      hero: {
        headline: 'Diseño minimalista para marcas ambiciosas.',
        subheadline: 'Ayudamos a startups y negocios tecnológicos a diseñar, programar y lanzar plataformas que la gente ama.',
        ctaText: 'Empezar proyecto',
        ctaLink: '#wp-contact',
        ctaSecondary: 'Ver servicios',
        ctaSecondaryLink: '#wp-services'
      },
      heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&fit=crop',
      servicesLabel: 'Lo Que Hacemos',
      servicesTitle: 'Servicios de alta fidelidad',
      servicesSubtitle: 'Creamos experiencias digitales a la medida del mercado actual.',
      services: [
        { icon: '✦', title: 'Diseño UI/UX Premium', description: 'Interfaces intuitivas y hermosas creadas para captar la atención del usuario desde el primer segundo.', cta: 'Ver ejemplos' },
        { icon: '✦', title: 'Desarrollo Web Next.js', description: 'Código limpio, veloz y optimizado para motores de búsqueda (SEO) y excelente experiencia móvil.', cta: 'Ver tecnología' },
        { icon: '✦', title: 'Estrategia de Conversión', description: 'Auditorías de landing pages y flujos de usuario para maximizar el porcentaje de visitas que compran.', cta: 'Ver casos' }
      ],
      about: {
        sectionLabel: 'Nuestra Filosofía',
        title: 'Estilo sin distracciones.',
        text: 'Creemos que el buen diseño es invisible. Quitamos todo lo innecesario para dejar que tu propuesta de valor brille con fuerza y elegancia.',
        highlights: [
          'Velocidad Absoluta: Páginas que cargan en menos de un segundo.',
          'Responsive Nativo: Se ve perfecto en móvil, tablet y pantallas gigantes.',
          'Enfoque al Cliente: Optimizado estratégicamente para captar leads.'
        ]
      },
      testimonialsTitle: 'Historias de éxito',
      testimonials: [
        { name: 'Marcus Sterling', role: 'Fundador, Apex Ventures', text: 'El rediseño minimalista de nuestra web duplicó nuestra tasa de conversión de clientes en solo 3 semanas.', rating: 5 }
      ],
      contact: {
        sectionTitle: 'Hablemos de tu proyecto',
        subtitle: 'Cuéntanos tu idea y te propondremos un plan a la medida de tu presupuesto.',
        phone: '+503 7788-9900',
        whatsapp: '+503 7788-9900',
        email: 'hello@aurastudio.com',
        address: 'Paseo General Escalón, San Salvador',
        showForm: true,
        ctaText: 'Enviar propuesta'
      },
      seo: {
        title: 'Aura Studio | Diseño UI/UX y Desarrollo Minimalista',
        description: 'Agencia de diseño y desarrollo web para marcas digitales de alto rendimiento.'
      }
    }
  },
  {
    id: 'sales-saas-dark',
    name: 'SaaS Autopilot (Modo Oscuro)',
    description: 'Perfecto para vender software, aplicaciones, licencias o infoproductos con estética ultra premium.',
    category: 'Vender',
    previewColor: '#3B82F6',
    site_json: {
      businessName: 'Autopilot AI',
      tagline: 'Automatización Inteligente de Negocios',
      description: 'Conecta tus herramientas, automatiza las tareas repetitivas y deja que la inteligencia artificial trabaje por ti.',
      primaryColor: '#0B0F19', // Dark primary background
      secondaryColor: '#0F172A',
      accentColor: '#3B82F6', // Tech neon blue
      font: 'Inter',
      headingWeight: 800,
      logoSize: 50,
      sectionOrder: ['hero', 'services', 'about', 'testimonials', 'contact'],
      sectionsVisibility: { hero: true, services: true, about: true, testimonials: true, contact: true },
      variants: {
        hero: 2,        // Full background dark overlay
        services: 3,    // Highlighting cards grid layout
        about: 4,       // Full width minimalist block
        testimonials: 3, // Clean slider/cards style
        contact: 2,     // Minimalist cards list
        footer: 1
      },
      hero: {
        headline: 'Automatiza tus ventas en piloto automático.',
        subheadline: 'La plataforma que sincroniza tus leads, automatiza emails y cierra tratos mientras duermes. Sin código.',
        ctaText: 'Iniciar prueba gratuita',
        ctaLink: '#wp-contact',
        ctaSecondary: 'Demo interactiva',
        ctaSecondaryLink: '#wp-services'
      },
      heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=85&fit=crop',
      servicesLabel: 'Funcionalidades Clave',
      servicesTitle: 'Construido para escalar',
      servicesSubtitle: 'Todo lo que necesitas para optimizar tus procesos comerciales.',
      services: [
        { icon: '🤖', title: 'Integraciones 1-Clic', description: 'Conecta WhatsApp, Gmail, Slack y Stripe en segundos. Sincronización bidireccional inmediata.', cta: 'Ver integraciones' },
        { icon: '📈', title: 'Analíticas Avanzadas', description: 'Tableros de control interactivos para medir el retorno de inversión de cada campaña automatizada.', cta: 'Ver dashboard' },
        { icon: '🔒', title: 'Seguridad Empresarial', description: 'Encriptación de datos de grado bancario para garantizar la confidencialidad de tus clientes.', cta: 'Leer políticas' }
      ],
      about: {
        sectionLabel: 'Productividad Elevada',
        title: 'Recupera 15 horas a la semana.',
        text: 'Nuestros clientes eliminan las tareas manuales y repetitivas de entrada de datos, permitiendo a sus equipos enfocarse en cerrar ventas reales.',
        highlights: [
          '+40% Conversión: Mayor velocidad de respuesta al cliente.',
          'Cero Fricción: Configuración lista en menos de 10 minutos.'
        ]
      },
      testimonialsTitle: 'Elogiado por líderes de la industria',
      testimonials: [
        { name: 'Diana Thorne', role: 'Head of Sales, SaaSify', text: 'Una herramienta imprescindible para cualquier equipo de ventas moderno. Eliminó el trabajo sucio por completo.', rating: 5 },
        { name: 'Melvin Clark', role: 'Product Manager', text: 'Fácil de usar, potente y visualmente increíble.', rating: 5 }
      ],
      contact: {
        sectionTitle: 'Elige tu plan e impulsa tu negocio',
        subtitle: 'Prueba la plataforma 14 días sin tarjeta de crédito. Cancela cuando quieras.',
        phone: '+1 (800) 555-0199',
        whatsapp: '+1 (800) 555-0199',
        email: 'sales@autopilot.ai',
        address: 'Silicon Valley, California',
        showForm: true,
        ctaText: 'Obtener mi cuenta'
      },
      seo: {
        title: 'Autopilot AI | Automatización de Ventas y Marketing',
        description: 'Plataforma líder para automatizar flujos de trabajo, correos electrónicos e integraciones sin código.'
      }
    }
  },
  {
    id: 'medical-spa-clean',
    name: 'Clínica & Salud Premium',
    description: 'Diseño higiénico, profesional y pacífico para consultorios médicos, psicólogos, dentistas o centros de estética.',
    category: 'Captar Clientes',
    previewColor: '#00A896',
    site_json: {
      businessName: 'Clínica Integra',
      tagline: 'Medicina Preventiva & Bienestar Integral',
      description: 'Especialistas dedicados a cuidar de tu salud con tecnología avanzada y trato humano de excelencia.',
      primaryColor: '#0E3B43',
      secondaryColor: '#F5FBFB',
      accentColor: '#02C39A',
      font: 'Poppins',
      headingWeight: 800,
      logoSize: 52,
      sectionOrder: ['hero', 'services', 'about', 'testimonials', 'contact'],
      sectionsVisibility: { hero: true, services: true, about: true, testimonials: true, contact: true },
      variants: {
        hero: 1,        // Split left text right image
        services: 1,    // Service list with icons
        about: 1,       // Classic text block
        testimonials: 1, // Double columns
        contact: 1,     // Map/hours details
        footer: 2
      },
      hero: {
        headline: 'Tu salud en manos de expertos.',
        subheadline: 'Ofrecemos consultas médicas personalizadas, diagnóstico de alta precisión y tratamientos estéticos de última generación.',
        ctaText: 'Agendar cita online',
        ctaLink: '#wp-contact',
        ctaSecondary: 'Nuestros médicos',
        ctaSecondaryLink: '#wp-nosotros'
      },
      heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=85&fit=crop',
      servicesLabel: 'Nuestras Especialidades',
      servicesTitle: 'Cuidado médico de primer nivel',
      servicesSubtitle: 'Servicios especializados diseñados para tu tranquilidad y bienestar.',
      services: [
        { icon: '🩺', title: 'Chequeo General de Salud', description: 'Exámenes preventivos completos para evaluar tu estado físico general y detectar riesgos a tiempo.', cta: 'Ver detalles' },
        { icon: '🦷', title: 'Odontología Estética', description: 'Diseño de sonrisa, blanqueamiento dental y tratamientos restaurativos de máxima naturalidad.', cta: 'Ver detalles' },
        { icon: '💆‍♀️', title: 'Terapia de Rejuvenecimiento', description: 'Tratamientos faciales y corporales no invasivos para revitalizar tu piel y relajar tu cuerpo.', cta: 'Ver detalles' }
      ],
      about: {
        sectionLabel: 'Sobre Nosotros',
        title: 'Más de 12 años cuidándote.',
        text: 'Nuestra clínica nació con el compromiso de ofrecer un servicio médico de calidad internacional, combinando calidez humana con equipamiento tecnológico de vanguardia.',
        highlights: [
          'Especialistas Certificados: Médicos de amplia trayectoria.',
          'Atención Inmediata: Sin largas esperas ni retrasos.'
        ]
      },
      testimonialsTitle: 'Qué opinan nuestros pacientes',
      testimonials: [
        { name: 'Dra. Gabriela Solís', role: 'Paciente de Chequeo Anual', text: 'La atención es impecable. El personal es amable y las instalaciones son sumamente higiénicas y modernas.', rating: 5 },
        { name: 'Roberto Méndez', role: 'Tratamiento Dental', text: 'Excelente experiencia. Cero dolor y resultados espectaculares en mi tratamiento.', rating: 5 }
      ],
      contact: {
        sectionTitle: 'Programa tu visita hoy mismo',
        subtitle: 'Selecciona la fecha y hora que mejor se adapte a tu agenda.',
        phone: '+503 2244-5566',
        whatsapp: '+503 7099-8800',
        email: 'citas@clinicaintegra.com',
        address: 'Av. Masferrer Norte #415, Colonia Escalón, San Salvador',
        showForm: true,
        ctaText: 'Confirmar Cita'
      },
      seo: {
        title: 'Clínica Integra | Medicina y Bienestar San Salvador',
        description: 'Consultas médicas especializadas, odontología y tratamientos estéticos con tecnología de punta.'
      }
    }
  },
  {
    id: 'consulting-b2b',
    name: 'Asesoría & Negocios Elegante',
    description: 'Estilo editorial minimalista en tonos tierra y tipografía clásica. Ideal para bufetes, consultores y contadores.',
    category: 'Vender',
    previewColor: '#8C6A5C',
    site_json: {
      businessName: 'Vanguard Advisors',
      tagline: 'Consultoría Financiera & Estratégica',
      description: 'Maximizamos la rentabilidad y escalabilidad de tu empresa mediante dirección financiera de alto nivel.',
      primaryColor: '#1A1C1E',
      secondaryColor: '#FAF7F2',
      accentColor: '#8C6A5C',
      font: 'Playfair Display',
      headingWeight: 700,
      logoSize: 42,
      sectionOrder: ['hero', 'services', 'about', 'testimonials', 'contact'],
      sectionsVisibility: { hero: true, services: true, about: true, testimonials: true, contact: true },
      variants: {
        hero: 4,        // Classic elegant top layout
        services: 2,    // Left title services right columns
        about: 3,       // Highlight stats
        testimonials: 1, // Classic double columns
        contact: 1,     // Left list contact info
        footer: 2
      },
      hero: {
        headline: 'Dirección estratégica para empresas en crecimiento.',
        subheadline: 'Asesoramiento corporativo premium enfocado en optimizar márgenes, reestructurar deuda y planificar tu expansión fiscal.',
        ctaText: 'Solicitar diagnóstico gratuito',
        ctaLink: '#wp-contact',
        ctaSecondary: 'Nuestra metodología',
        ctaSecondaryLink: '#wp-nosotros'
      },
      heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=85&fit=crop',
      servicesLabel: 'Servicios Estratégicos',
      servicesTitle: 'Áreas de Especialización',
      servicesSubtitle: 'Soluciones financieras corporativas para decisiones inteligentes.',
      services: [
        { icon: '💼', title: 'Consultoría de Negocios', description: 'Revisión y optimización de tus flujos de caja, control de gastos fijos y optimización de márgenes.', cta: 'Saber más' },
        { icon: '⚖️', title: 'Planificación Fiscal Internacional', description: 'Estructuración fiscal legal para optimizar el pago de impuestos y expandir operaciones.', cta: 'Saber más' },
        { icon: '📊', title: 'Preparación para Inversionistas', description: 'Preparación de libros financieros y modelos de negocio para levantar capital o solicitar financiamiento.', cta: 'Saber más' }
      ],
      about: {
        sectionLabel: 'Sobre La Firma',
        title: 'Claridad en decisiones complejas.',
        text: 'Ayudamos a los directores generales y fundadores a entender sus números reales, tomar el control de su rentabilidad y estructurar empresas duraderas.',
        highlights: [
          '15+ Años: Asesorando empresas de servicios y tecnología.',
          '$45M+: En fondos estructurados y optimizados.'
        ]
      },
      testimonialsTitle: 'Socios que confían en nosotros',
      testimonials: [
        { name: 'Ernesto Alfaro', role: 'CEO, Distribuidora Litoral', text: 'Vanguard Advisors cambió por completo nuestra estructura fiscal. Logramos ahorrar más del 22% en impuestos de forma 100% legal.', rating: 5 },
        { name: 'Patricia Rubio', role: 'Directora Financiera, TechCorp', text: 'Su análisis de flujo de caja nos permitió tomar la decisión correcta para expandir nuestra sucursal.', rating: 5 }
      ],
      contact: {
        sectionTitle: 'Agenda un diagnóstico estratégico',
        subtitle: 'Conversación confidencial de 25 minutos para evaluar tus cuellos de botella financieros.',
        phone: '+503 2500-1122',
        whatsapp: '+503 7800-4455',
        email: 'info@vanguard.advisors',
        address: 'Torre Futura, Nivel 14, San Salvador',
        showForm: true,
        ctaText: 'Reservar sesión de 25m'
      },
      seo: {
        title: 'Vanguard Advisors | Consultoría Financiera y Estratégica',
        description: 'Optimización financiera corporativa, consultoría fiscal y estructuración de capital para empresas medianas.'
      }
    }
  },
  {
    id: 'restaurant-bistro',
    name: 'Bistró Gourmet & Café',
    description: 'Estilo rústico moderno y elegante para cafeterías, pastelerías y restaurantes finos.',
    category: 'Vender',
    previewColor: '#D97706',
    site_json: {
      businessName: 'L\'Atelier Bistró',
      tagline: 'Cocina de Autor & Café de Especialidad',
      description: 'Una experiencia gastronómica acogedora, con ingredientes 100% locales y recetas creadas para compartir.',
      primaryColor: '#2B1B15',
      secondaryColor: '#FFFDF9',
      accentColor: '#D97706',
      font: 'Raleway',
      headingWeight: 800,
      logoSize: 48,
      sectionOrder: ['hero', 'services', 'about', 'testimonials', 'contact'],
      sectionsVisibility: { hero: true, services: true, about: true, testimonials: true, contact: true },
      variants: {
        hero: 1,
        services: 4,
        about: 1,
        testimonials: 2,
        contact: 1,
        footer: 2
      },
      hero: {
        headline: 'Sabores honestos, momentos únicos.',
        subheadline: 'Platos inspirados en recetas clásicas con un toque de autor moderno. Disfruta de nuestra terraza y café de altura.',
        ctaText: 'Reservar una mesa',
        ctaLink: '#wp-contact',
        ctaSecondary: 'Ver menú digital',
        ctaSecondaryLink: '#wp-services'
      },
      heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85&fit=crop',
      servicesLabel: 'Nuestra Carta',
      servicesTitle: 'Recomendaciones del chef',
      servicesSubtitle: 'Descubre los platos y bebidas favoritos de nuestros comensales.',
      services: [
        { icon: '🥐', title: 'Desayunos & Brunch', description: 'Croissants recién horneados, huevos benedictinos y fruta de temporada con yogur orgánico.', cta: 'Ver carta de desayunos' },
        { icon: '🥩', title: 'Platos Fuertes de Autor', description: 'Cortes de carne premium marinados, mariscos frescos y opciones vegetarianas a la leña.', cta: 'Ver carta de almuerzos' },
        { icon: '☕', title: 'Café de Especialidad', description: 'Granos seleccionados de cooperativas locales, con tueste medio y baristas profesionales.', cta: 'Ver métodos de extracción' }
      ],
      about: {
        sectionLabel: 'Nuestra Historia',
        title: 'El amor por los detalles.',
        text: 'Nacido en 2018, L\'Atelier es el sueño de compartir comida reconfortante en un ambiente relajado. Cuidamos cada ingrediente para garantizar sabor y frescura.',
        highlights: [
          '100% Local: Compramos directamente a agricultores.',
          'Pet Friendly: Tus mascotas son bienvenidas en la terraza.'
        ]
      },
      testimonialsTitle: 'Qué dicen nuestros comensales',
      testimonials: [
        { name: 'Alejandro Calderón', role: 'Comensal Frecuente', text: 'El café de especialidad y la tostada de aguacate con salmón son sencillamente espectaculares. El ambiente es perfecto para trabajar o conversar.', rating: 5 }
      ],
      contact: {
        sectionTitle: 'Visítanos o reserva tu mesa',
        subtitle: 'Recomendamos reservar con anticipación los fines de semana.',
        phone: '+503 2211-3344',
        whatsapp: '+503 7500-2211',
        email: 'hola@latelierbistro.com',
        address: 'Calle La Mascota #250, San Salvador',
        showForm: true,
        ctaText: 'Reservar mesa'
      },
      seo: {
        title: 'L\'Atelier Bistró | Restaurante y Café de Especialidad',
        description: 'Bistró gourmet con terraza, desayunos premium, platos de autor y café de altura en San Salvador.'
      }
    }
  },
  {
    id: 'church-modern-nucleus',
    name: 'Iglesia Moderna (Estándar Nucleus)',
    description: 'Diseñado bajo la regla de los 50ms y baja complejidad visual. Incluye sección "Planear una Visita", Prédicas y Launcher Flotante.',
    category: 'Iglesias',
    previewColor: '#00C896',
    site_json: {
      businessName: 'Iglesia Vida Nueva',
      tagline: 'Un lugar para encontrar fe, esperanza y comunidad',
      description: 'Somos una comunidad viva de fe dedicada a amar a Dios y servir a nuestra ciudad.',
      primaryColor: '#0F172A',
      secondaryColor: '#F8FAFC',
      accentColor: '#00C896',
      font: 'Inter',
      headingWeight: 900,
      logoSize: 50,
      industry: 'Iglesia / Ministerio / Fe',
      sectionOrder: ['hero', 'planAVisit', 'sermons', 'services', 'about', 'contact'],
      sectionsVisibility: { hero: true, planAVisit: true, sermons: true, services: true, about: true, contact: true },
      launcher: {
        enabled: true,
        buttonText: 'Siguientes Pasos',
        isChurchMode: true
      },
      hero: {
        headline: 'Una iglesia donde tú y tu familia pertenecen.',
        subheadline: 'No importa de dónde vengas o en qué punto de tu camino te encuentres. Aquí hay un espacio para ti.',
        ctaText: 'Planear una visita',
        ctaLink: '#wp-plan-visit',
        ctaSecondary: 'Ver prédicas recientes',
        ctaSecondaryLink: '#wp-sermons'
      },
      heroImage: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=85&fit=crop',
      planAVisit: {
        title: 'Planifica tu Primera Visita',
        subtitle: 'Queremos que tu experiencia sea cómoda, inspiradora y acogedora.',
        serviceTimes: ['Domingos: 9:00 AM y 11:30 AM', 'Miércoles de Oración: 7:00 PM'],
        address: 'Av. Las Gardenias #450, Ciudad',
        whatToExpect: 'Música contemporánea, un mensaje bíblico práctico de 35 minutos y un ambiente relajado sin código de vestimenta.',
        kidsInfo: 'Contamos con KidZone: un ambiente seguro, divertido y adaptado para niños de 0 a 11 años.'
      },
      sermonsLabel: 'Mensajes Dominicales',
      sermonsTitle: 'Serie Actual: "Fe Inquebrantable"',
      sermonsSubtitle: 'Explora nuestras prédicas más recientes en video y podcast.',
      sermons: [
        { title: 'Superando la Ansiedad con Fe', speaker: 'Pastor Carlos Gómez', date: 'Domingo Pasado', duration: '38 min', series: 'Fe Inquebrantable', videoUrl: 'https://www.youtube.com/watch?v=0IfuwIa3qjw' },
        { title: 'El Poder de la Oración Constante', speaker: 'Pastora Maria Gómez', date: 'Hace 2 semanas', duration: '42 min', series: 'Fe Inquebrantable', videoUrl: 'https://www.youtube.com/watch?v=0IfuwIa3qjw' },
        { title: 'Caminando sobre el Agua', speaker: 'Pastor Carlos Gómez', date: 'Hace 3 semanas', duration: '35 min', series: 'Fe Inquebrantable', videoUrl: 'https://www.youtube.com/watch?v=0IfuwIa3qjw' }
      ],
      servicesLabel: 'Ministerios & Conexión',
      servicesTitle: 'Encuentra tu lugar para servir y crecer',
      servicesSubtitle: 'Grupos pequeños y comunidades diseñadas para cada etapa de la vida.',
      services: [
        { icon: '🌱', title: 'Grupos de Conexión (Casas de Paz)', description: 'Reuniones semanales en hogares para compartir la palabra, orar y forjar amistades genuinas.', cta: 'Unirme a un grupo' },
        { icon: '⚡', title: 'Jóvenes & Universitarios', description: 'Reuniones dinámicas los sábados para inspirar a la nueva generación a vivir con propósito.', cta: 'Conocer más' },
        { icon: '👶', title: 'Ministerio Infantil KidZone', description: 'Clases divertidas, actividades bíblicas y maestros capacitados para cuidar de tus hijos.', cta: 'Ver horarios' }
      ],
      about: {
        sectionLabel: 'Quiénes Somos',
        title: 'Nuestra Misión y Visión',
        text: 'Vida Nueva nació en 2012 con la pasión de ser una iglesia transparente, centrada en Jesús y compasiva con la comunidad local.',
        highlights: [
          'Enfoque Bíblico: Mensajes prácticos para la vida diaria.',
          'Comunidad Real: Relaciones auténticas sin máscaras.',
          'Impacto Social: Comedores y ayuda alimentaria cada mes.'
        ]
      },
      contact: {
        sectionTitle: '¿Tienes preguntas o necesitas oración?',
        subtitle: 'Déjanos un mensaje y nuestro equipo pastoral te responderá con gusto.',
        phone: '+503 2288-0099',
        whatsapp: '+503 7899-0099',
        email: 'contacto@vidanuevachurch.org',
        address: 'Av. Las Gardenias #450, Ciudad',
        showForm: true,
        ctaText: 'Enviar mensaje'
      },
      seo: {
        title: 'Iglesia Vida Nueva | Una comunidad de fe para toda la familia',
        description: 'Te invitamos a nuestras reuniones dominicales. Prédicas bíblicas, música contemporánea y programas para niños.'
      }
    }
  },
  {
    id: 'church-warm-community',
    name: 'Iglesia Comunidad & Familia (Warm Serif)',
    description: 'Diseño cálido y acogedor con tipografía de alto contraste, formulario PrayerFlow y catálogo de grupos pequeños.',
    category: 'Iglesias',
    previewColor: '#8B5CF6',
    site_json: {
      businessName: 'Iglesia Comunidad de Gracia',
      tagline: 'Transformados por el amor de Jesús',
      description: 'Una iglesia familiar enfocada en discipulado, restauración de vidas y servicio a la comunidad.',
      primaryColor: '#1E1B4B',
      secondaryColor: '#FAF5FF',
      accentColor: '#8B5CF6',
      font: 'Playfair Display',
      headingWeight: 800,
      logoSize: 52,
      industry: 'Iglesia / Ministerio / Fe',
      sectionOrder: ['hero', 'planAVisit', 'services', 'sermons', 'about', 'contact'],
      sectionsVisibility: { hero: true, planAVisit: true, services: true, sermons: true, about: true, contact: true },
      launcher: {
        enabled: true,
        buttonText: 'Oración y Siguientes Pasos',
        isChurchMode: true
      },
      hero: {
        headline: 'Bienvenido a casa. Bienvenido a la familia.',
        subheadline: 'Experimenta el amor transformador de Dios en una comunidad donde cada persona es valorada.',
        ctaText: 'Planifica tu visita',
        ctaLink: '#wp-plan-visit',
        ctaSecondary: 'Solicitar oración',
        ctaSecondaryLink: '#wp-contact'
      },
      heroImage: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=1600&q=85&fit=crop',
      planAVisit: {
        title: 'Nos encantaría conocerte',
        subtitle: 'Todo lo que necesitas saber para tu primera visita a nuestra iglesia.',
        serviceTimes: ['Reunión Familiar: Domingos 10:00 AM', 'Noche de Milagros: Viernes 7:30 PM'],
        address: 'Calle El Espino #102, Colonia Escalón',
        whatToExpect: 'Un ambiente cálido y respetuoso, adoración reverente y enseñanza profunda de las Escrituras.',
        kidsInfo: 'Espacio para bebés y clases para niños de todas las edades durante todo el servicio.'
      },
      servicesLabel: 'Vida en Comunidad',
      servicesTitle: 'Crece junto a otros creyentes',
      servicesSubtitle: 'El discipulado ocurre en relaciones cotidianas.',
      services: [
        { icon: '🙏', title: 'Oración & Intercesión (PrayerFlow)', description: 'Tiempos dedicados a orar por las necesidades de las familias y la sanidad de los enfermos.', cta: 'Enviar petición' },
        { icon: '📖', title: 'Escuela de Discipulado', description: 'Cursos fundamentales para profundizar en las escrituras y descubrir tu llamado personal.', cta: 'Ver cursos' },
        { icon: '🤝', title: 'Acción Social & Ayuda', description: 'Entregamos paquetes alimenticios y apoyo médico a sectores vulnerables de la ciudad.', cta: 'Ser voluntario' }
      ],
      sermonsLabel: 'Predicaciones',
      sermonsTitle: 'Últimas enseñanzas',
      sermonsSubtitle: 'Escucha la palabra de Dios dondequiera que estés.',
      sermons: [
        { title: 'La Gracia que Restaura Todo', speaker: 'Pastor Roberto Silva', date: 'Domingo', duration: '40 min', series: 'Gracia Inmerecida', videoUrl: '#' },
        { title: 'Viviendo sin Temor al Futuro', speaker: 'Pastor Roberto Silva', date: 'Hace 1 semana', duration: '35 min', series: 'Gracia Inmerecida', videoUrl: '#' }
      ],
      about: {
        sectionLabel: 'Nuestra Fe',
        title: 'Nuestra Historia de Gracia',
        text: 'Creemos en la autoridad de la Biblia, la restauración de la familia y el poder transformador de la cruz.',
        highlights: [
          'Fe Bíblica: Basados 100% en la palabra de Dios.',
          'Familia Unida: Ministerios para niños, jóvenes y matrimonios.'
        ]
      },
      contact: {
        sectionTitle: 'Estamos para servirte',
        subtitle: 'Comunícate con nosotros para consejería pastoral o información de eventos.',
        phone: '+503 2500-1122',
        whatsapp: '+503 7600-1122',
        email: 'info@comunidaddegracia.org',
        address: 'Calle El Espino #102, San Salvador',
        showForm: true,
        ctaText: 'Enviar mensaje'
      },
      seo: {
        title: 'Iglesia Comunidad de Gracia | Una familia de fe',
        description: 'Únete a nuestras reuniones dominicales. Discipulado, oración y ambiente familiar.'
      }
    }
  }
]
