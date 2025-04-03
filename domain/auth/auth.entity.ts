/**
 * Entidad de autenticación que define las interfaces y tipos para el sistema de autenticación
 */

export type AuthProvider = "email" | "google" | "github"

export interface UserCredentials {
  email: string
  password?: string
  provider?: AuthProvider
  providerToken?: string
}

export interface AuthResponse {
  success: boolean
  user?: UserProfile
  error?: string
}

export interface UserProfile {
  id: string
  username: string
  email: string
  fullName: string
  avatarUrl?: string
  provider: AuthProvider
  createdAt: Date
  updatedAt: Date
}

export interface AuthPort {
  signIn(credentials: UserCredentials): Promise<AuthResponse>
  signUp(credentials: UserCredentials, profile: Partial<UserProfile>): Promise<AuthResponse>
  signOut(): Promise<void>
  getCurrentUser(): Promise<UserProfile | null>
  connectProvider(userId: string, provider: AuthProvider, token: string): Promise<boolean>
}

