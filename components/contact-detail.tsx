import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/utils/use-translation"

interface Contact {
  id: string
  name: string
  avatar: string
  isPrivate: boolean
}

interface ContactDetailProps {
  contact: Contact
}

export function ContactDetail({ contact }: ContactDetailProps) {
  const { t } = useTranslation()

  // Simulated contact details
  const contactDetails = contact.isPrivate
    ? {
        email: "",
        phone: "",
        location: "",
        profession: "",
      }
    : {
        email: "user@example.com",
        phone: "+1 234 567 890",
        location: "New York, USA",
        profession: "Software Developer",
      }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{contact.name}</CardTitle>
            <CardDescription>{contact.isPrivate ? t("private_profile") : t("public_profile")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-2 text-sm">
          <div>
            <dt className="font-medium">{t("email")}</dt>
            <dd>{contactDetails.email || t("information_not_available")}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("phone")}</dt>
            <dd>{contactDetails.phone || t("information_not_available")}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("location")}</dt>
            <dd>{contactDetails.location || t("information_not_available")}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("profession")}</dt>
            <dd>{contactDetails.profession || t("information_not_available")}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

