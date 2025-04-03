"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/utils/use-translation"

interface InviteMembersModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InviteMembersModal({ isOpen, onClose }: InviteMembersModalProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [inviteLink, setInviteLink] = useState("")

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la invitación
    console.log("Inviting:", email)
    // Simular la generación de un enlace de invitación
    setInviteLink(`https://colgit.com/invite/${Math.random().toString(36).substring(7)}`)
    setEmail("")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert(t("link_copied"))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("invite_members")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleInvite}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">{t("email_address")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("enter_email_address")}
                required
              />
            </div>
            <Button type="submit">{t("send_invitation")}</Button>
          </div>
        </form>
        {inviteLink && (
          <div className="mt-4">
            <Label>{t("or_share_link")}</Label>
            <div className="flex gap-2 mt-2">
              <Input value={inviteLink} readOnly />
              <Button onClick={handleCopyLink}>{t("copy")}</Button>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onClose}>{t("close")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

