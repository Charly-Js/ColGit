"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/utils/use-translation"
import Link from "next/link"

interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  avatar: string
}

export function CommunityList() {
  const { t } = useTranslation()
  const [communities, setCommunities] = useState<Community[]>([])

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API para obtener las comunidades
    // Por ahora, usaremos datos de ejemplo
    setCommunities([
      {
        id: "1",
        name: "React Developers",
        description: "A community for React enthusiasts",
        memberCount: 1500,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "2",
        name: "Python Coders",
        description: "Share your Python knowledge and projects",
        memberCount: 2000,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      // Añade más comunidades de ejemplo aquí
    ])
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {communities.map((community) => (
        <Card key={community.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={community.avatar} alt={community.name} />
              <AvatarFallback>{community.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{community.name}</CardTitle>
              <CardDescription>{t("members", { count: community.memberCount })}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
            <Link href={`/communities/${community.id}`}>
              <Button variant="outline">{t("view_community")}</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

