"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/utils/use-translation"
import { CommunityChat } from "@/components/community-chat"
import { InviteMembersModal } from "@/components/invite-members-modal"

interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  avatar: string
}

export default function CommunityPage() {
  const { t } = useTranslation()
  const params = useParams()
  const [community, setCommunity] = useState<Community | null>(null)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [showChat, setShowChat] = useState(true)

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API para obtener los detalles de la comunidad
    // Por ahora, usaremos datos de ejemplo
    setCommunity({
      id: params.id as string,
      name: "React Developers",
      description: "A community for React enthusiasts",
      memberCount: 1500,
      avatar: "/placeholder.svg?height=80&width=80",
    })
  }, [params.id])

  if (!community) {
    return <Layout>{t("loading")}</Layout>
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={community.avatar} alt={community.name} />
              <AvatarFallback>{community.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{community.name}</CardTitle>
              <CardDescription>{t("members", { count: community.memberCount })}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{community.description}</p>
            <div className="flex gap-4">
              <Button onClick={() => setIsInviteModalOpen(true)}>{t("invite_members")}</Button>
              <Button variant="outline" onClick={() => setShowChat(!showChat)}>
                {showChat ? t("hide_chat") : t("show_chat")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {showChat && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t("community_chat")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CommunityChat communityId={community.id} />
            </CardContent>
          </Card>
        )}

        <InviteMembersModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
      </div>
    </Layout>
  )
}

