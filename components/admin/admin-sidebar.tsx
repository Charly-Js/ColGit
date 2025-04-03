/**
 * Barra lateral del panel de administración
 */

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Users,
  FolderGit,
  BarChart,
  Settings,
  Shield,
  HelpCircle,
  Bell,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Usuarios",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Proyectos",
    href: "/admin/projects",
    icon: <FolderGit className="h-5 w-5" />,
  },
  {
    title: "Analíticas",
    href: "/admin/analytics",
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: "Roles y Permisos",
    href: "/admin/roles",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: "Facturación",
    href: "/admin/billing",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Notificaciones",
    href: "/admin/notifications",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Soporte",
    href: "/admin/support",
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    title: "Configuración",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn("bg-card border-r border-border h-screen transition-all duration-300", collapsed ? "w-16" : "w-64")}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {!collapsed && (
          <Link href="/admin" className="font-bold text-xl">
            ColGit Admin
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="py-4">
          <nav className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-0",
                )}
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  )
}

