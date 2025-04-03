/**
 * Servicio de administración
 * Implementa el puerto de administración y proporciona la lógica de negocio
 */

import type {
  AdminPort,
  AdminUser,
  SystemStats,
  UserManagementFilters,
  ProjectManagementFilters,
  PaginatedResult,
  AdminRole,
  Permission,
} from "@/domain/admin/admin.entity"

// Datos de ejemplo para desarrollo
const mockUsers: AdminUser[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@colgit.com",
    role: "super_admin",
    permissions: [
      "manage_users",
      "manage_projects",
      "manage_repositories",
      "view_analytics",
      "manage_settings",
      "manage_roles",
      "manage_billing",
      "support_tickets",
    ],
    lastLogin: new Date(),
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date(),
  },
  {
    id: "2",
    username: "moderator",
    email: "moderator@colgit.com",
    role: "moderator",
    permissions: ["manage_projects", "view_analytics", "support_tickets"],
    lastLogin: new Date("2023-03-15"),
    createdAt: new Date("2023-02-01"),
    updatedAt: new Date("2023-03-15"),
  },
  // Más usuarios de ejemplo...
]

const mockProjects = [
  {
    id: "1",
    name: "ColGit Core",
    description: "Core repository for ColGit platform",
    owner: {
      id: "1",
      username: "admin",
    },
    visibility: "internal",
    status: "active",
    collaborators: 5,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date(),
  },
  // Más proyectos de ejemplo...
]

class AdminService implements AdminPort {
  // Gestión de usuarios
  async getUsers(filters: UserManagementFilters): Promise<PaginatedResult<AdminUser>> {
    // Simulación de filtrado y paginación
    let filteredUsers = [...mockUsers]

    // Aplicar filtros
    if (filters.query) {
      const query = filters.query.toLowerCase()
      filteredUsers = filteredUsers.filter(
        (user) => user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
      )
    }

    if (filters.role) {
      filteredUsers = filteredUsers.filter((user) => user.role === filters.role)
    }

    // Aplicar ordenamiento
    if (filters.sortBy) {
      filteredUsers.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof AdminUser]
        const bValue = b[filters.sortBy as keyof AdminUser]

        if (aValue < bValue) return filters.sortOrder === "asc" ? -1 : 1
        if (aValue > bValue) return filters.sortOrder === "asc" ? 1 : -1
        return 0
      })
    }

    // Aplicar paginación
    const total = filteredUsers.length
    const totalPages = Math.ceil(total / filters.limit)
    const start = (filters.page - 1) * filters.limit
    const end = start + filters.limit
    const paginatedUsers = filteredUsers.slice(start, end)

    return {
      data: paginatedUsers,
      total,
      page: filters.page,
      limit: filters.limit,
      totalPages,
    }
  }

  async getUserById(id: string): Promise<AdminUser | null> {
    const user = mockUsers.find((u) => u.id === id)
    return user || null
  }

  async updateUser(id: string, data: Partial<AdminUser>): Promise<AdminUser> {
    const userIndex = mockUsers.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      throw new Error("Usuario no encontrado")
    }

    const updatedUser = {
      ...mockUsers[userIndex],
      ...data,
      updatedAt: new Date(),
    }

    mockUsers[userIndex] = updatedUser
    return updatedUser
  }

  async deleteUser(id: string): Promise<boolean> {
    const userIndex = mockUsers.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      return false
    }

    mockUsers.splice(userIndex, 1)
    return true
  }

  async suspendUser(id: string, reason: string): Promise<boolean> {
    // En una implementación real, aquí se marcaría al usuario como suspendido
    // y se registraría la razón
    return true
  }

  async restoreUser(id: string): Promise<boolean> {
    // En una implementación real, aquí se restauraría un usuario suspendido
    return true
  }

  // Gestión de proyectos
  async getProjects(filters: ProjectManagementFilters): Promise<PaginatedResult<any>> {
    // Simulación similar a getUsers pero para proyectos
    let filteredProjects = [...mockProjects]

    // Aplicar filtros
    if (filters.query) {
      const query = filters.query.toLowerCase()
      filteredProjects = filteredProjects.filter(
        (project) => project.name.toLowerCase().includes(query) || project.description.toLowerCase().includes(query),
      )
    }

    if (filters.status) {
      filteredProjects = filteredProjects.filter((project) => project.status === filters.status)
    }

    if (filters.visibility) {
      filteredProjects = filteredProjects.filter((project) => project.visibility === filters.visibility)
    }

    if (filters.owner) {
      filteredProjects = filteredProjects.filter((project) => project.owner.id === filters.owner)
    }

    // Aplicar paginación
    const total = filteredProjects.length
    const totalPages = Math.ceil(total / filters.limit)
    const start = (filters.page - 1) * filters.limit
    const end = start + filters.limit
    const paginatedProjects = filteredProjects.slice(start, end)

    return {
      data: paginatedProjects,
      total,
      page: filters.page,
      limit: filters.limit,
      totalPages,
    }
  }

  async getProjectById(id: string): Promise<any | null> {
    const project = mockProjects.find((p) => p.id === id)
    return project || null
  }

  async updateProject(id: string, data: any): Promise<any> {
    // Implementación similar a updateUser
    return { id, ...data }
  }

  async deleteProject(id: string): Promise<boolean> {
    // Implementación similar a deleteUser
    return true
  }

  async archiveProject(id: string): Promise<boolean> {
    // En una implementación real, aquí se marcaría el proyecto como archivado
    return true
  }

  async restoreProject(id: string): Promise<boolean> {
    // En una implementación real, aquí se restauraría un proyecto archivado
    return true
  }

  // Estadísticas y analíticas
  async getSystemStats(): Promise<SystemStats> {
    // En una implementación real, estos datos vendrían de la base de datos
    return {
      totalUsers: 1250,
      activeUsers: 780,
      totalProjects: 3450,
      totalRepositories: 5200,
      storageUsed: 1024 * 1024 * 1024 * 50, // 50 GB en bytes
      apiCalls: 25000,
      registrationsToday: 15,
      activeCollaborations: 320,
    }
  }

  async getUserGrowthStats(period: "day" | "week" | "month" | "year"): Promise<any> {
    // En una implementación real, estos datos vendrían de la base de datos
    // Aquí devolvemos datos de ejemplo
    return {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          label: "Nuevos usuarios",
          data: [65, 78, 90, 81, 56, 55],
        },
        {
          label: "Usuarios activos",
          data: [40, 45, 60, 70, 56, 55],
        },
      ],
    }
  }

  async getProjectActivityStats(period: "day" | "week" | "month" | "year"): Promise<any> {
    // Datos de ejemplo
    return {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          label: "Nuevos proyectos",
          data: [28, 35, 40, 27, 32, 43],
        },
        {
          label: "Commits",
          data: [350, 420, 380, 410, 390, 450],
        },
      ],
    }
  }

  // Gestión de roles y permisos
  async assignRole(userId: string, role: AdminRole): Promise<boolean> {
    const userIndex = mockUsers.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return false
    }

    mockUsers[userIndex].role = role
    mockUsers[userIndex].updatedAt = new Date()

    // Asignar permisos predeterminados según el rol
    switch (role) {
      case "super_admin":
        mockUsers[userIndex].permissions = [
          "manage_users",
          "manage_projects",
          "manage_repositories",
          "view_analytics",
          "manage_settings",
          "manage_roles",
          "manage_billing",
          "support_tickets",
        ]
        break
      case "admin":
        mockUsers[userIndex].permissions = [
          "manage_users",
          "manage_projects",
          "manage_repositories",
          "view_analytics",
          "manage_settings",
        ]
        break
      case "moderator":
        mockUsers[userIndex].permissions = ["manage_projects", "view_analytics", "support_tickets"]
        break
      case "support":
        mockUsers[userIndex].permissions = ["support_tickets", "view_analytics"]
        break
    }

    return true
  }

  async updatePermissions(userId: string, permissions: Permission[]): Promise<boolean> {
    const userIndex = mockUsers.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return false
    }

    mockUsers[userIndex].permissions = permissions
    mockUsers[userIndex].updatedAt = new Date()

    return true
  }

  // Configuración del sistema
  async getSystemSettings(): Promise<any> {
    // Configuración de ejemplo
    return {
      siteName: "ColGit",
      allowPublicRepositories: true,
      maxStoragePerUser: 1024 * 1024 * 1024 * 5, // 5 GB en bytes
      maxFileSize: 1024 * 1024 * 100, // 100 MB en bytes
      allowedFileTypes: [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "txt",
        "md",
        "json",
        "xml",
        "html",
        "css",
        "js",
        "ts",
        "jsx",
        "tsx",
      ],
      maintenanceMode: false,
      registrationOpen: true,
      requireEmailVerification: true,
      defaultUserRole: "user",
      sessionTimeout: 3600, // 1 hora en segundos
    }
  }

  async updateSystemSettings(settings: any): Promise<boolean> {
    // En una implementación real, aquí se actualizarían las configuraciones
    return true
  }
}

export const adminService = new AdminService()

