"use client"

/**
 * Adaptador primario para la administración
 * Conecta la UI con el dominio de administración
 */

import { useState } from "react"
import type {
  AdminUser,
  SystemStats,
  UserManagementFilters,
  ProjectManagementFilters,
  PaginatedResult,
  AdminRole,
  Permission,
} from "@/domain/admin/admin.entity"
import { adminService } from "@/services/admin.service"

export function useAdminAdapter() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Gestión de usuarios
  const getUsers = async (filters: UserManagementFilters): Promise<PaginatedResult<AdminUser>> => {
    setLoading(true)
    setError(null)
    try {
      const result = await adminService.getUsers(filters)
      return result
    } catch (err) {
      const errorMsg = "Error al obtener usuarios"
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const getUserById = async (id: string): Promise<AdminUser | null> => {
    setLoading(true)
    setError(null)
    try {
      const user = await adminService.getUserById(id)
      return user
    } catch (err) {
      const errorMsg = "Error al obtener usuario"
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (id: string, data: Partial<AdminUser>): Promise<AdminUser> => {
    setLoading(true)
    setError(null)
    try {
      const updatedUser = await adminService.updateUser(id, data)
      return updatedUser
    } catch (err) {
      const errorMsg = "Error al actualizar usuario"
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const result = await adminService.deleteUser(id)
      return result
    } catch (err) {
      const errorMsg = "Error al eliminar usuario"
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const suspendUser = async (id: string, reason: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const result = await adminService.suspendUser(id, reason)
      return result
    } catch (err) {
      const errorMsg = "Error al suspender usuario"
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const restoreUser = async (id: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const result = await adminService.restoreUser(id)
      return result
    } catch (err) {
      const errorMsg = "Error al restaurar usuario"
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  // Gestión de proyectos
  const getProjects = async (filters: ProjectManagementFilters): Promise<PaginatedResult<any>> => {
    setLoading(true)
    setError(null)
    try {
      const result = await adminService.getProjects(filters)
      return result
    } catch (err) {
      const errorMsg = "Error al obtener proyectos"
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  // Estadísticas del sistema
  const getSystemStats = async (): Promise<SystemStats> => {
    setLoading(true)
    setError(null)
    try {
      const stats = await adminService.getSystemStats()
      return stats
    } catch (err) {
      const errorMsg = "Error al obtener estadísticas del sistema"
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  // Gestión de roles y permisos
  const assignRole = async (userId: string, role: AdminRole): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const result = await adminService.assignRole(userId, role)
      return result
    } catch (err) {
      const errorMsg = "Error al asignar rol"
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const updatePermissions = async (userId: string, permissions: Permission[]): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const result = await adminService.updatePermissions(userId, permissions)
      return result
    } catch (err) {
      const errorMsg = "Error al actualizar permisos"
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    suspendUser,
    restoreUser,
    getProjects,
    getSystemStats,
    assignRole,
    updatePermissions,
  }
}

