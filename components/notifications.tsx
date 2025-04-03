"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/utils/use-translation"

interface Notification {
  id: string
  message: string
  type: "note" | "reminder" | "connection_request"
  action?: () => void
}

export function Notifications() {
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", message: "New note added", type: "note" },
    { id: "2", message: "Reminder: Team meeting at 3 PM", type: "reminder" },
    {
      id: "3",
      message: "Alice Johnson wants to connect with you",
      type: "connection_request",
      action: () => handleConnectionRequest("Alice Johnson"),
    },
  ])

  const clearNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const handleConnectionRequest = (username: string) => {
    // Aquí iría la lógica para aceptar la solicitud de conexión
    toast({
      title: t("connection_accepted"),
      description: t("connection_accepted_description", { username }),
    })
    clearNotification(notifications.find((n) => n.message.includes(username))?.id || "")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length === 0 ? (
          <DropdownMenuItem>{t("no_notifications")}</DropdownMenuItem>
        ) : (
          notifications.map((notif) => (
            <DropdownMenuItem key={notif.id} className="flex justify-between items-center">
              <span>{notif.message}</span>
              {notif.type === "connection_request" ? (
                <Button variant="outline" size="sm" onClick={notif.action}>
                  {t("accept")}
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => clearNotification(notif.id)}>
                  {t("clear")}
                </Button>
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

