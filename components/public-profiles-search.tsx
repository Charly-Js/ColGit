"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/utils/use-translation"

interface PublicProfile {
  id: string
  username: string
  avatar: string
  developerInterests: string[]
  personalInterests: string[]
}

export function PublicProfilesSearch() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<PublicProfile[]>([])

  const handleSearch = () => {
    // En una implementación real, esto sería una llamada a la API
    // Por ahora, simularemos algunos resultados
    const mockResults: PublicProfile[] = [
      {
        id: "1",
        username: "dev_enthusiast",
        avatar: "/placeholder.svg?height=40&width=40",
        developerInterests: ["React", "TypeScript", "Node.js"],
        personalInterests: ["Photography", "Hiking"],
      },
      {
        id: "2",
        username: "code_wizard",
        avatar: "/placeholder.svg?height=40&width=40",
        developerInterests: ["Python", "Machine Learning", "Data Science"],
        personalInterests: ["Chess", "Cooking"],
      },
      {
        id: "3",
        username: "ui_designer",
        avatar: "/placeholder.svg?height=40&width=40",
        developerInterests: ["UI/UX", "Figma", "CSS"],
        personalInterests: ["Painting", "Yoga"],
      },
    ]

    setSearchResults(
      mockResults.filter(
        (profile) =>
          profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.developerInterests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase())) ||
          profile.personalInterests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    )
  }

  const handleConnect = (profileId: string) => {
    // En una implementación real, esto enviaría una solicitud de conexión
    console.log(`Sending connection request to profile ${profileId}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("search_public_profiles")}</CardTitle>
        <CardDescription>{t("search_public_profiles_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("search_by_username_or_interests")}
          />
          <Button onClick={handleSearch}>{t("search")}</Button>
        </div>
        <div className="space-y-4">
          {searchResults.map((profile) => (
            <div key={profile.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={profile.avatar} alt={profile.username} />
                  <AvatarFallback>{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{profile.username}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("developer_interests")}: {profile.developerInterests.join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("personal_interests")}: {profile.personalInterests.join(", ")}
                  </p>
                </div>
              </div>
              <Button onClick={() => handleConnect(profile.id)}>{t("connect")}</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

