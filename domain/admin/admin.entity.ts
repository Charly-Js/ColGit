/**
 * Entidades y puertos para el dominio de administración
 * Define las interfaces y tipos necesarios para la gestión administrativa
 */

export interface AdminUser {
  id: string
  username: string
  email: string
  role: AdminRole
  permissions: Permission[]
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export type AdminRole = "super_admin" | "admin" | "moderator" | "support"

export type Permission =
  | "manage_users"
  | "manage_projects"
  | "manage_repositories"
  | "view_analytics"
  | "manage_settings"
  | "manage_roles"
  | "manage_billing"
  | "support_tickets"

export interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalProjects: number
  totalRepositories: number
  storageUsed: number
  apiCalls: number
  registrationsToday: number
  activeCollaborations: number
}

export interface UserManagementFilters {
  query?: string
  role?: AdminRole
  status?: "active" | "suspended" | "pending"
  dateRange?: {
    start: Date
    end: Date
  }
  sortBy?: "username" | "email" | "createdAt" | "lastLogin"
  sortOrder?: "asc" | "desc"
  page: number
  limit: number
}

export interface ProjectManagementFilters {
  query?: string
  status?: "active" | "archived" | "deleted"
  visibility?: "public" | "private" | "internal"
  owner?: string
  dateRange?: {
    start: Date
    end: Date
  }
  sortBy?: "name" | "createdAt" | "updatedAt" | "activity"
  sortOrder?: "asc" | "desc"
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface AdminPort {
  // Gestión de usuarios
  getUsers(filters: UserManagementFilters): Promise<PaginatedResult<AdminUser>>
  getUserById(id: string): Promise<AdminUser | null>
  updateUser(id: string, data: Partial<AdminUser>): Promise<AdminUser>
  deleteUser(id: string): Promise<boolean>
  suspendUser(id: string, reason: string): Promise<boolean>
  restoreUser(id: string): Promise<boolean>

  // Gestión de proyectos
  getProjects(filters: ProjectManagementFilters): Promise<PaginatedResult<any>>
  getProjectById(id: string): Promise<any | null>
  updateProject(id: string, data: any): Promise<any>
  deleteProject(id: string): Promise<boolean>
  archiveProject(id: string): Promise<boolean>
  restoreProject(id: string): Promise<boolean>

  // Estadísticas y analíticas
  getSystemStats(): Promise<SystemStats>
  getUserGrowthStats(period: "day" | "week" | "month" | "year"): Promise<any>
  getProjectActivityStats(period: "day" | "week" | "month" | "year"): Promise<any>

  // Gestión de roles y permisos
  assignRole(userId: string, role: AdminRole): Promise<boolean>
  updatePermissions(userId: string, permissions: Permission[]): Promise<boolean>

  // Configuración del sistema
  getSystemSettings(): Promise<any>
  updateSystemSettings(settings: any): Promise<boolean>
}

