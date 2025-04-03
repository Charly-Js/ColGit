/**
 * Página principal del panel de administración
 * Muestra un dashboard con estadísticas y accesos rápidos
 */

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminStats from "@/components/admin/admin-stats"
import RecentUsers from "@/components/admin/recent-users"
import RecentProjects from "@/components/admin/recent-projects"
import AdminActivityLog from "@/components/admin/admin-activity-log"
import AdminStatsLoading from "@/components/admin/admin-stats-loading"

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>

      <Suspense fallback={<AdminStatsLoading />}>
        <AdminStats />
      </Suspense>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Usuarios Recientes</TabsTrigger>
          <TabsTrigger value="projects">Proyectos Recientes</TabsTrigger>
          <TabsTrigger value="activity">Actividad del Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Usuarios Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<p>Cargando usuarios recientes...</p>}>
                <RecentUsers />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Proyectos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<p>Cargando proyectos recientes...</p>}>
                <RecentProjects />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Actividad del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<p>Cargando actividad del sistema...</p>}>
                <AdminActivityLog />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

