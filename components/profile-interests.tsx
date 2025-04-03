"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/utils/use-translation"

export function ProfileInterests() {
  const { t } = useTranslation()
  const [interests, setInterests] = useState({
    developer: ["React", "TypeScript", "Node.js", "GraphQL"],
    personal: ["Photography", "Hiking", "Reading", "Cooking"],
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("interests")}</h2>
      <div>
        <h3 className="text-xl font-semibold mb-2">{t("developer_interests")}</h3>
        <div className="flex flex-wrap gap-2">
          {interests.developer.map((interest) => (
            <Badge key={interest} variant="secondary">
              {interest}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{t("personal_interests")}</h3>
        <div className="flex flex-wrap gap-2">
          {interests.personal.map((interest) => (
            <Badge key={interest} variant="secondary">
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

