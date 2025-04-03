"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/utils/use-translation"

interface InterestsSelectorProps {
  developerInterests: string[]
  personalInterests: string[]
  setDeveloperInterests: (interests: string[]) => void
  setPersonalInterests: (interests: string[]) => void
  isEditable: boolean
}

export function InterestsSelector({
  developerInterests,
  personalInterests,
  setDeveloperInterests,
  setPersonalInterests,
  isEditable,
}: InterestsSelectorProps) {
  const { t } = useTranslation()
  const [newDeveloperInterest, setNewDeveloperInterest] = useState("")
  const [newPersonalInterest, setNewPersonalInterest] = useState("")

  const handleAddDeveloperInterest = () => {
    if (newDeveloperInterest && !developerInterests.includes(newDeveloperInterest)) {
      setDeveloperInterests([...developerInterests, newDeveloperInterest])
      setNewDeveloperInterest("")
    }
  }

  const handleAddPersonalInterest = () => {
    if (newPersonalInterest && !personalInterests.includes(newPersonalInterest)) {
      setPersonalInterests([...personalInterests, newPersonalInterest])
      setNewPersonalInterest("")
    }
  }

  const handleRemoveDeveloperInterest = (interest: string) => {
    setDeveloperInterests(developerInterests.filter((i) => i !== interest))
  }

  const handleRemovePersonalInterest = (interest: string) => {
    setPersonalInterests(personalInterests.filter((i) => i !== interest))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("interests")}</CardTitle>
        <CardDescription>{t("interests_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("developer_interests")}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {developerInterests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                  {isEditable && (
                    <button
                      onClick={() => handleRemoveDeveloperInterest(interest)}
                      className="ml-2 text-xs"
                      aria-label={t("remove_interest")}
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditable && (
              <div className="flex space-x-2">
                <Input
                  value={newDeveloperInterest}
                  onChange={(e) => setNewDeveloperInterest(e.target.value)}
                  placeholder={t("add_developer_interest")}
                />
                <Button onClick={handleAddDeveloperInterest}>{t("add")}</Button>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("personal_interests")}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {personalInterests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                  {isEditable && (
                    <button
                      onClick={() => handleRemovePersonalInterest(interest)}
                      className="ml-2 text-xs"
                      aria-label={t("remove_interest")}
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditable && (
              <div className="flex space-x-2">
                <Input
                  value={newPersonalInterest}
                  onChange={(e) => setNewPersonalInterest(e.target.value)}
                  placeholder={t("add_personal_interest")}
                />
                <Button onClick={handleAddPersonalInterest}>{t("add")}</Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

