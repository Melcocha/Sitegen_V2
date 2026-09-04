import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const initialized = useRef(false)

  // Fetch profile in BACKGROUND — never blocks loading
  const fetchProfile = useCallback(async (userId) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (data) {
        setProfile(data)
      } else {
        // Create profile silently
        const { data: created } = await supabase
          .from('profiles')
          .insert({ id: userId, role: 'client' })
          .select()
          .maybeSingle()
        if (created) setProfile(created)
      }
    } catch (e) {
      // Fallback — never leave without a profile
      setProfile({ id: userId, role: 'client' })
    }
  }, [])

  useEffect(() => {
    // onAuthStateChange fires IMMEDIATELY with current session (INITIAL_SESSION event)
    // So we DO NOT need getSession separately — avoids race conditions
    // Check local mock dev user if available
    const savedMock = localStorage.getItem('saasweb_dev_user')
    if (savedMock && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      try {
        const parsed = JSON.parse(savedMock)
        if (parsed.user) {
          setUser(parsed.user)
          setProfile(parsed.profile)
          setLoading(false)
        }
      } catch (e) {}
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('saasweb_dev_user')
          setUser(null)
          setProfile(null)
          setLoading(false)
          return
        }

        if (session?.user) {
          setUser(session.user)
          fetchProfile(session.user.id)
        } else if (!localStorage.getItem('saasweb_dev_user')) {
          setUser(null)
          setProfile(null)
        }

        setLoading(false)
      }
    )

    const timer = setTimeout(() => setLoading(false), 3000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timer)
    }
  }, [fetchProfile])

  const devLogin = useCallback(() => {
    const devUser = {
      id: 'dev-user-local',
      email: 'admin@saasweb.local',
      user_metadata: { full_name: 'Desarrollador Local' },
    }
    const devProfile = {
      id: 'dev-user-local',
      role: 'super_admin',
      full_name: 'Desarrollador Local',
      company_name: 'Mi Empresa Local',
    }
    localStorage.setItem('saasweb_dev_user', JSON.stringify({ user: devUser, profile: devProfile }))
    setUser(devUser)
    setProfile(devProfile)
  }, [])

  // Auth methods
  const signUp = async ({ email, password, fullName }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: fullName } },
      })
      if (error) throw error
      return data
    } catch (err) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        devLogin()
        return { user: { id: 'dev-user-local' } }
      }
      throw err
    }
  }

  const signIn = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return data
    } catch (err) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.warn('[AuthContext] Supabase cloud pausado/offline. Accediendo en modo dev local.')
        devLogin()
        return { user: { id: 'dev-user-local' } }
      }
      throw err
    }
  }

  const signInWithOtp = async (email) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email, options: { shouldCreateUser: false },
      })
      if (error) throw error
    } catch (err) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        devLogin()
        return
      }
      throw err
    }
  }

  const verifyOtp = async ({ email, token }) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
      if (error) throw error
      return data
    } catch (err) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        devLogin()
        return { user: { id: 'dev-user-local' } }
      }
      throw err
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/app/dashboard` },
      })
      if (error) throw error
    } catch (err) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        devLogin()
        return
      }
      throw err
    }
  }

  const signOut = async () => {
    localStorage.removeItem('saasweb_dev_user')
    try { await supabase.auth.signOut() } catch(e){}
    setUser(null)
    setProfile(null)
  }

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin' || profile?.role === 'super_admin' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    isSuperAdmin: profile?.role === 'super_admin' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    signUp, signIn, signInWithOtp, verifyOtp, signInWithGoogle, signOut, devLogin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
