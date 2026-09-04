import { useRef, useState, Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import CheckoutModal from './components/CheckoutModal'

// ── Public Landing sections
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Examples from './components/Examples'
import HowItWorks from './components/HowItWorks'
import AIGenerator from './components/AIGenerator'
import DomainSearch from './components/DomainSearch'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

// ── Auth Pages
import { LoginPage, RegisterPage } from './pages/AuthPages'

// ── App Pages (protected)
import UserDashboard from './pages/UserDashboard'
import AdminDashboard, { AdminRoute } from './pages/AdminDashboard'
import SiteEditorPage from './pages/SiteEditorPage'
import NewSitePage from './pages/NewSitePage'

import './index.css'

// ─── Error Boundary ──────────────────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('[SaaS App Error]', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: 40,
          fontFamily: 'Inter, sans-serif', background: '#F9FAFB',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>⚠️</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
            Error al cargar la aplicación
          </h1>
          <pre style={{
            background: '#FEF2F2', border: '1px solid #FECACA',
            borderRadius: 8, padding: 16, maxWidth: 600,
            fontSize: '0.8rem', color: '#DC2626', overflow: 'auto',
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: 16, padding: '10px 24px',
              background: '#00C896', color: '#080F0C',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontWeight: 700,
            }}
          >
            Reintentar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// ─── Success Toast ───────────────────────────────────────────────
function SuccessToast({ plan, onClose }) {
  return (
    <div
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 1001,
        background: 'linear-gradient(135deg, #10B981, #059669)',
        color: '#fff', borderRadius: 14,
        padding: '14px 22px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 8px 32px rgba(16,185,129,0.4)',
        fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.9375rem',
        animation: 'slideToast 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
      }}
      onClick={onClose}
    >
      <style>{`@keyframes slideToast { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <CheckCircle2 size={20} />
      <div>
        <div>¡Plan {plan} activado!</div>
        <div style={{ fontSize: '0.78rem', fontWeight: 500, opacity: 0.85 }}>Tu cuenta fue actualizada correctamente.</div>
      </div>
    </div>
  )
}

// ─── Landing Page ────────────────────────────────────────────────
function LandingPage({ onCheckout }) {
  const previewRef = useRef(null)
  const handleScrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <Hero onStartGenerator={handleScrollToGenerator} />
        <Features />
        <Examples />
        <HowItWorks />
        <AIGenerator scrollRef={previewRef} />
        <DomainSearch />
        <Pricing onCheckout={onCheckout} />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

// ─── Main App ────────────────────────────────────────────────────
function AppContent() {
  // checkout holds { plan, billingCycle } or null
  const [checkout, setCheckout]     = useState(null)
  const [successPlan, setSuccessPlan] = useState('')

  const handleCheckout = ({ plan, billingCycle }) => setCheckout({ plan, billingCycle })

  const handlePaymentSuccess = () => {
    const planName = checkout?.plan || ''
    setCheckout(null)
    setSuccessPlan(planName.charAt(0).toUpperCase() + planName.slice(1))
    setTimeout(() => setSuccessPlan(''), 4500)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage onCheckout={handleCheckout} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected app routes */}
          <Route path="/app/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/app/new" element={
            <ProtectedRoute>
              <NewSitePage />
            </ProtectedRoute>
          } />
          <Route path="/app/editor/:siteId" element={
            <ProtectedRoute>
              <SiteEditorPage />
            </ProtectedRoute>
          } />

          {/* Super Admin */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      {/* Global overlays — outside router for correct z-index stacking */}
      {checkout && (
        <CheckoutModal
          plan={checkout.plan}
          billingCycle={checkout.billingCycle}
          onClose={() => setCheckout(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {successPlan && <SuccessToast plan={successPlan} onClose={() => setSuccessPlan('')} />}
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  )
}
