/**
 * Página de gestión de usuarios para administradores
 */

"use client"

import { useState } from "react"
import { useAdminAdapter } from "@/adapters/admin/useAdminAdapter"
import type { AdminUser, UserManagementFilters, AdminRole } from "@/domain/admin/admin.entity"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  UserPlus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Ban,
  Shield,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export default function AdminUsersPage() {
  const { toast } = useToast()
  const { getUsers, deleteUser, suspendUser, assignRole, loading, error } = useAdminAdapter()

  const [users, setUsers] = useState<AdminUser[]>([])
  const [total, setTotal] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [filters, setFilters] = useState<UserManagementFilters>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  })

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<string>("")

  // Cargar usuarios al montar el componente y cuando cambien los filtros
  const loadUsers = async () => {
    try {
      const result = await getUsers(filters)
      setUsers(result.data)
      setTotal(result.total)
      setTotalPages(result.totalPages)
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive",
      })
    }
  }

  // Aplicar filtros
  const applyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      query: searchQuery,
      role: (selectedRole as AdminRole) || undefined,
      page: 1, // Resetear a la primera página al aplicar filtros
    }))
  }

  // Cambiar página
  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return

    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }))
  }

  // Eliminar usuario
  const handleDeleteUser = async (userId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.")) {
      try {
        await deleteUser(userId)
        toast({
          title: "Usuario eliminado",
          description: "El usuario ha sido eliminado correctamente",
        })
        loadUsers() // Recargar la lista
      } catch (err) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el usuario",
          variant: "destructive",
        })
      }
    }
  }

  // Suspender usuario
  const handleSuspendUser = async (userId: string) => {
    const reason = prompt("Por favor, ingresa la razón de la suspensión:")
    if (reason) {
      try {
        await suspendUser(userId, reason)
        toast({
          title: "Usuario suspendido",
          description: "El usuario ha sido suspendido correctamente",
        })
        loadUsers() // Recargar la lista
      } catch (err) {
        toast({
          title: "Error",
          description: "No se pudo suspender el usuario",
          variant: "destructive",
        })
      }
    }
  }

  // Cambiar rol
  const handleChangeRole = async (userId: string, role: AdminRole) => {
    try {
      await assignRole(userId, role)
      toast({
        title: "Rol actualizado",
        description: `El rol del usuario ha sido actualizado a ${role}`,
      })
      loadUsers() // Recargar la lista
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el rol del usuario",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Buscar por nombre o email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                prefix={<Search className="h-4 w-4" />}
              />
            </div>

            <div className="w-[200px]">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderador</SelectItem>
                  <SelectItem value="support">Soporte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={applyFilters} variant="secondary">
              <Filter className="mr-2 h-4 w-4" />
              Aplicar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Último Acceso</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Cargando usuarios...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No se encontraron usuarios
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "super_admin"
                            ? "destructive"
                            : user.role === "admin"
                              ? "default"
                              : user.role === "moderator"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Nunca"}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
                            <Ban className="mr-2 h-4 w-4" />
                            Suspender
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Cambiar Rol</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleChangeRole(user.id, "admin")}>
                            <Shield className="mr-2 h-4 w-4" />
                            Hacer Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeRole(user.id, "moderator")}>
                            <Shield className="mr-2 h-4 w-4" />
                            Hacer Moderador
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginación */}
      <div className="flex justify-between items-center">
        <div>
          Mostrando {users.length} de {total} usuarios
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => changePage(filters.page - 1)}
            disabled={filters.page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Página {filters.page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changePage(filters.page + 1)}
            disabled={filters.page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

