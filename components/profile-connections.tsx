"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/utils/use-translation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Connection {
  id: string
  name: string
  avatar: string
}

export function ProfileConnections() {
  const { t } = useTranslation()
  const [connections, setConnections] = useState<Connection[]>([
    { id: "1", name: "Alice Johnson", avatar: "/avatars/01.png" },
    { id: "2", name: "Bob Smith", avatar: "/avatars/02.png" },
    { id: "3", name: "Carol Williams", avatar: "/avatars/03.png" },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("connections")}</CardTitle>
        <CardDescription>{t("connections_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {connections.map((connection) => (
            <div key={connection.id} className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={connection.avatar} alt={connection.name} />
                <AvatarFallback>{connection.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span>{connection.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

