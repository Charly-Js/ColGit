/**
 * Componente para mostrar estadísticas en el panel de administración
 */

"use client"

import { useEffect, useState } from "react"
import { useAdminAdapter } from "@/adapters/admin/useAdminAdapter"
import type { SystemStats } from "@/domain/admin/admin.entity"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FolderGit, Database, Activity } from "lucide-react"

export default function AdminStats() {
  const { getSystemStats } = useAdminAdapter()
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const systemStats = await getSystemStats()
        setStats(systemStats)
      } catch (error) {
        console.error("Error al cargar estadísticas:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [getSystemStats])

  if (loading) {
    return <div>Cargando estadísticas...</div>
  }

  if (!stats) {
    return <div>No se pudieron cargar las estadísticas</div>
  }

  // Función para formatear bytes en una unidad legible
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{stats.activeUsers.toLocaleString()} usuarios activos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Proyectos</CardTitle>
          <FolderGit className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProjects.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{stats.totalRepositories.toLocaleString()} repositorios</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Almacenamiento</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatBytes(stats.storageUsed)}</div>
          <p className="text-xs text-muted-foreground">En {stats.totalRepositories.toLocaleString()} repositorios</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Actividad</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.apiCalls.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Llamadas a la API en las últimas 24h</p>
        </CardContent>
      </Card>
    </div>
  )
}

