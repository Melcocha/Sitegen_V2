const fs = require('fs');

async function run() {
  const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k && v) acc[k.trim()] = v.join('=').trim().replace(/['"]/g, '');
    return acc;
  }, {});

  const SUPABASE_URL = env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("No supabase credentials found.");
    return;
  }

  // Get a user ID associated with websites
  const getRes = await fetch(`${SUPABASE_URL}/rest/v1/websites?select=user_id&limit=1`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  if (!getRes.ok) {
    console.error("Failed to fetch user_id", await getRes.text());
    return;
  }
  const users = await getRes.json();
  const userId = users[0]?.user_id;

  if (!userId) {
    console.error("No user found in DB.");
    return;
  }

  // Generate the highly tailored Prestige Barbershop JSON
  const prestigeSite = {
    businessName: "Prestige Barbershop",
    tagline: "El Arte del Cuidado Masculino",
    description: "Welcome to Prestige Barbershop. Ubicados en Ranson, WV, ofrecemos un servicio de grooming premium. Maestros en cortes clásicos, fades modernos y rituales de barba con toalla caliente. Dirigidos por Renzo Barrientos de la Cruz, nuestra misión es elevar tu estilo y confianza.",
    primaryColor: "#0D1117",
    secondaryColor: "#FAFAFA",
    accentColor: "#D4AF37",
    font: "Playfair Display",
    industry: "Belleza & Spa",
    heroImageQuery: "barber haircut fade",
    aboutImageQuery: "barbershop interior premium",
    navLinks: ["Inicio", "Servicios", "Nosotros", "Contacto"],
    layoutVariant: 1,
    hero: {
      headline: "The Premium Grooming Experience",
      subheadline: "Cortes de precisión, fades impecables y el mejor cuidado de barba en Ranson, WV.",
      ctaText: "Reserva tu Cita",
      ctaSecondary: "Ver Servicios",
      ctaLink: "https://wa.me/13043509365"
    },
    servicesLabel: "Menú Exclusivo",
    servicesTitle: "Estilo & Perfección",
    servicesSubtitle: "Cada servicio es ejecutado con maestría y atención obsesiva al detalle para garantizar tu mejor versión.",
    services: [
      {
        icon: "✂️",
        title: "Men's Haircut",
        description: "El corte clásico o moderno que prefieras. Asesoría de estilo y acabados perfectos con navaja. ($35)",
        cta: "Agendar"
      },
      {
        icon: "🧔",
        title: "Men's Haircut & Beard",
        description: "La experiencia completa. Nuestro signature haircut acompañado de un beard trim preciso y ritual con toalla caliente. ($45)",
        cta: "Agendar"
      },
      {
        icon: "👦",
        title: "Kids Haircut",
        description: "Estilo impecable también para los más jóvenes (menores de 10 años). Un entorno cómodo y cortes modernos. ($30)",
        cta: "Agendar"
      }
    ],
    about: {
      title: "La Visión de Renzo Barrientos",
      text: "Prestige Barbershop no es solo un corte de cabello, es un refugio para caballeros. Dirigido por Renzo Barrientos de la Cruz, nos enfocamos en revivir el arte tradicional de la barbería fusionado con las tendencias contemporáneas. Utilizamos únicamente herramientas y productos de la más alta gama.",
      highlights: [
        "Estilistas Altamente Cualificados",
        "Ambiente Premium y Relajante",
        "Productos Grooming Exclusivos",
        "Estacionamiento de fácil acceso"
      ]
    },
    testimonialsTitle: "Lo que opinan nuestros clientes",
    testimonials: [
      {
        name: "Carlos M.",
        role: "Cliente VIP",
        text: "Renzo understands exactly what a fresh fade means. Best barbershop in Ranson, hands down.",
        rating: 5
      },
      {
        name: "David H.",
        role: "Cliente Habitual",
        text: "The hot towel shave experience is unmatched. I won't trust my beard to anyone else.",
        rating: 5
      },
      {
        name: "Mike T.",
        role: "Local Resident",
        text: "Took my son here for a fade. Excellent service and great atmosphere. Highly recommended.",
        rating: 5
      }
    ],
    galleryTitle: "Nuestro Trabajo",
    stats: [
      { value: "Ranson, WV", label: "Ubicación Premium" },
      { value: "6 Días", label: "Abierto a la Semana" }
    ],
    contact: {
      sectionTitle: "Agenda tu Experiencia Hoy",
      subtitle: "Visítanos en 809 North Mildred Street, Suite 3. O contáctanos directamente para agendar.",
      phone: "+1 304-350-9365",
      whatsapp: "+13043509365",
      email: "Prestigebarbershop.93@gmail.com",
      address: "809 N Mildred St, Suite 3, Ranson, WV 25438",
      businessHours: [
        { day: "Lunes - Viernes", hours: "9:00 AM - 6:00 PM" },
        { day: "Sábado", hours: "8:00 AM - 4:00 PM" },
        { day: "Domingo", hours: "Cerrado" }
      ]
    },
    seo: {
      title: "Prestige Barbershop | Ranson WV",
      description: "Premium haircuts and beard trim in Ranson, WV by Renzo Barrientos."
    }
  };

  const payload = {
    user_id: userId,
    name: "Prestige Barbershop",
    prompt: "Barberia prestige",
    site_json: prestigeSite,
    industry: "Barbería",
    status: "draft"
  };

  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/websites`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(payload)
  });

  if (!insertRes.ok) {
    console.error("Failed to insert website", await insertRes.text());
  } else {
    const data = await insertRes.json();
    console.log("SUCCESS! Created site ID:", data[0].id);
  }
}

run();
