# SiteGen AI — Checklist de Lanzamiento Comercial (Go-Live)
**Estado Actual:** MVP Avanzado. UI/UX Frontend completo. Inteligencia artificial operativa. Sistema de facturación visual y PDFs integrados.

Este documento detalla los requerimientos arquitectónicos finales (Backend Ops) para operar el SaaS de forma desatendida, segura y automática.

---

## 1. El Motor de Pagos (Stripe en Producción) 💳
*Objetivo: Automatizar el ciclo de vida de las suscripciones sin intervención manual.*

- [ ] **Despliegue de Webhooks (Supabase Edge Functions):**
  - Escuchar `checkout.session.completed` para provisionar el plan del cliente tras el primer pago.
  - Escuchar `invoice.payment_succeeded` para inyectar automáticamente el registro en la tabla `public.invoices`.
  - Escuchar `customer.subscription.deleted` o `invoice.payment_failed` para revocar accesos automáticamente.
- [ ] **Configuración Live:**
  - Cambiar de llaves `pk_test_...` a `pk_live_...` en todas las variables de entorno.
  - Configurar Portal de Cliente de Stripe para que el usuario pueda actualizar su tarjeta desde el Dashboard.

## 2. Infraestructura de Dominios (El cuello de botella técnico) 🌐
*Objetivo: Permitir a los clientes publicar sus sitios web IA en sus propios dominios personalizados sin tickets de soporte.*

- [ ] **Integración de API de Vercel (Domains API):**
  - Cuando un cliente añade `tuempresa.com`, tu backend debe hacer un POST a Vercel para agregarlo al proyecto y solicitar el certificado SSL de Let's Encrypt.
- [ ] **Asistente DNS en el Dashboard:**
  - Mostrar los valores exactos (Registros A / CNAME) que el cliente debe copiar y pegar en su registrador (GoDaddy, Namecheap).
  - Implementar un botón de "Verificar Conexión" que valide si los DNS ya se propagaron.

## 3. Seguridad y Límites (Protección de Costos) 🛡️
*Objetivo: Evitar que usuarios malintencionados abusen de los recursos del servidor o del saldo de la API de OpenAI.*

- [ ] **Enforcement estricto en Base de Datos (RLS):**
  - Auditar que Supabase Row Level Security impida la creación de >1 sitio a usuarios "Starter" a nivel de base de datos, no solo en la interfaz.
- [ ] **Rate Limiting de Inteligencia Artificial:**
  - Implementar contadores en Redis o Supabase que limiten las llamadas al endpoint `generate-site-html`. (Ej. 3 generaciones máximas por día para cuentas gratuitas/básicas).

## 4. Comunicaciones Transaccionales 📧
*Objetivo: Mantener el engagement y reducir cancelaciones.*

- [ ] **Integración de Proveedor de Email (Resend / SendGrid / Postmark):**
- [ ] **Plantillas Automáticas Esenciales:**
  - Bienvenida + Onboarding rápido.
  - Recibo de cobro mensual (con el PDF adjunto).
  - Alerta de "Pago Fallido / Actualiza tu tarjeta".
  - Verificación segura de OTP/Magic Links (sin caer en Spam).

## 5. Legales y Cumplimiento ⚖️
*Objetivo: Evitar el bloqueo de la cuenta comercial de Stripe.*

- [ ] **Términos de Servicio (TOS)** visibles y aceptables durante el registro.
- [ ] **Política de Privacidad** con mención explícita del manejo de datos.
- [ ] Configurar el pie de página de las facturas (Invoice Generator) con el Tax ID oficial de Arias Defense / SiteGen AI.

---

### Siguiente Paso Recomendado:
**Fase A:** Comenzar con el despliegue del webhook de Stripe en Supabase Edge Functions para cerrar el ciclo de ingresos.
