"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/utils/use-translation"

export function ProfileContacts() {
  const { t } = useTranslation()
  const [contacts, setContacts] = useState([
    { id: "1", name: "David Lee", avatar: "/avatars/04.png", email: "david@example.com" },
    { id: "2", name: "Emma Wilson", avatar: "/avatars/05.png", email: "emma@example.com" },
    { id: "3", name: "Frank Miller", avatar: "/avatars/06.png", email: "frank@example.com" },
  ])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("contacts")}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.email}</p>
              <Link href={`/profile/${contact.name.toLowerCase().replace(" ", "-")}`}>
                <Button variant="link" className="p-0">
                  {t("view_profile")}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

