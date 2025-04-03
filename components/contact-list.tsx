"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslation } from "@/utils/use-translation"
import { ContactDetail } from "@/components/contact-detail"

interface Contact {
  id: string
  name: string
  avatar: string
  isPrivate: boolean
}

export function ContactList() {
  const { t } = useTranslation()
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", isPrivate: false },
    { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40", isPrivate: true },
    { id: "3", name: "Carol Williams", avatar: "/placeholder.svg?height=40&width=40", isPrivate: false },
  ])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("contacts")}</CardTitle>
        <CardDescription>{t("your_contacts")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {contacts.map((contact) => (
              <Button
                key={contact.id}
                variant="ghost"
                className="w-full justify-start mb-2"
                onClick={() => handleContactClick(contact)}
              >
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{contact.name}</span>
              </Button>
            ))}
          </ScrollArea>
          {selectedContact && <ContactDetail contact={selectedContact} />}
        </div>
      </CardContent>
    </Card>
  )
}

