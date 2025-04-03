"use client"

/**
 * Adaptador primario para la autenticación que conecta la UI con el dominio
 * Este adaptador maneja la lógica de autenticación con diferentes proveedores
 */

import { useState, useEffect } from "react"
import type { UserCredentials, UserProfile, AuthResponse } from "@/domain/auth/auth.entity"
import { authService } from "@/services/auth.service"

export function useAuthAdapter(): {
  user: UserProfile | null
  loading: boolean
  error: string | null
  signIn: (credentials: UserCredentials) => Promise<AuthResponse>
  signUp: (credentials: UserCredentials, profile: Partial<UserProfile>) => Promise<AuthResponse>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<AuthResponse>
  signInWithGithub: () => Promise<AuthResponse>
} {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Cargar el usuario actual al montar el componente
    const loadUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        setError("Error al cargar el usuario")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const signIn = async (credentials: UserCredentials): Promise<AuthResponse> => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.signIn(credentials)
      if (response.success && response.user) {
        setUser(response.user)
      } else if (response.error) {
        setError(response.error)
      }
      return response
    } catch (err) {
      const errorMsg = "Error al iniciar sesión"
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (credentials: UserCredentials, profile: Partial<UserProfile>): Promise<AuthResponse> => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.signUp(credentials, profile)
      if (response.success && response.user) {
        setUser(response.user)
      } else if (response.error) {
        setError(response.error)
      }
      return response
    } catch (err) {
      const errorMsg = "Error al registrar usuario"
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async (): Promise<void> => {
    setLoading(true)
    try {
      await authService.signOut()
      setUser(null)
    } catch (err) {
      setError("Error al cerrar sesión")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para iniciar sesión con Google
  const signInWithGoogle = async (): Promise<AuthResponse> => {
    setLoading(true)
    setError(null)
    try {
      // Aquí se implementará la lógica para abrir la ventana de autenticación de Google
      // Este espacio lo trabajará personal experto en integración de autenticación

      // Simulación de respuesta exitosa para desarrollo
      const mockResponse: AuthResponse = {
        success: true,
        user: {
          id: "google-user-id",
          username: "googleuser",
          email: "user@gmail.com",
          fullName: "Google User",
          avatarUrl: "https://example.com/avatar.jpg",
          provider: "google",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }

      if (mockResponse.success && mockResponse.user) {
        setUser(mockResponse.user)
      }
      return mockResponse
    } catch (err) {
      const errorMsg = "Error al iniciar sesión con Google"
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Función para iniciar sesión con GitHub
  const signInWithGithub = async (): Promise<AuthResponse> => {
    setLoading(true)
    setError(null)
    try {
      // Aquí se implementará la lógica para abrir la ventana de autenticación de GitHub
      // Este espacio lo trabajará personal experto en integración de autenticación

      // Simulación de respuesta exitosa para desarrollo
      const mockResponse: AuthResponse = {
        success: true,
        user: {
          id: "github-user-id",
          username: "githubuser",
          email: "user@github.com",
          fullName: "GitHub User",
          avatarUrl: "https://example.com/github-avatar.jpg",
          provider: "github",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }

      if (mockResponse.success && mockResponse.user) {
        setUser(mockResponse.user)
      }
      return mockResponse
    } catch (err) {
      const errorMsg = "Error al iniciar sesión con GitHub"
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithGithub,
  }
}

