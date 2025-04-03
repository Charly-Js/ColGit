"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/utils/use-translation"
import { toast } from "@/components/ui/use-toast"

interface Invitation {
  id: string
  groupName: string
  invitedBy: string
}

export function GroupInvitations() {
  const { t } = useTranslation()
  const [invitations, setInvitations] = useState<Invitation[]>([
    { id: "1", groupName: "React Developers", invitedBy: "Alice" },
    { id: "2", groupName: "Python Enthusiasts", invitedBy: "Bob" },
  ])

  const handleAccept = (id: string) => {
    // Here you would typically call an API to accept the invitation
    setInvitations(invitations.filter((inv) => inv.id !== id))
    toast({
      title: t("invitation_accepted"),
      description: t("invitation_accepted_description"),
    })
  }

  const handleDecline = (id: string) => {
    // Here you would typically call an API to decline the invitation
    setInvitations(invitations.filter((inv) => inv.id !== id))
    toast({
      title: t("invitation_declined"),
      description: t("invitation_declined_description"),
    })
  }

  if (invitations.length === 0) {
    return <p>{t("no_pending_invitations")}</p>
  }

  return (
    <ul className="space-y-4">
      {invitations.map((invitation) => (
        <li key={invitation.id} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{invitation.groupName}</p>
            <p className="text-sm text-muted-foreground">{t("invited_by", { name: invitation.invitedBy })}</p>
          </div>
          <div className="space-x-2">
            <Button onClick={() => handleAccept(invitation.id)} size="sm">
              {t("accept")}
            </Button>
            <Button onClick={() => handleDecline(invitation.id)} variant="outline" size="sm">
              {t("decline")}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

