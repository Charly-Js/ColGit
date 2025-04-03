"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/utils/use-translation"
import { Github, Linkedin, Twitter } from "lucide-react"

interface SocialNetwork {
  name: string
  url: string
  icon: React.ReactNode
}

interface SocialNetworksProps {
  isEditable: boolean
}

export function SocialNetworks({ isEditable }: SocialNetworksProps) {
  const { t } = useTranslation()
  const [networks, setNetworks] = useState<SocialNetwork[]>([
    { name: "GitHub", url: "", icon: <Github className="w-5 h-5" /> },
    { name: "LinkedIn", url: "", icon: <Linkedin className="w-5 h-5" /> },
    { name: "Twitter", url: "", icon: <Twitter className="w-5 h-5" /> },
  ])

  const handleNetworkChange = (index: number, url: string) => {
    const newNetworks = [...networks]
    newNetworks[index].url = url
    setNetworks(newNetworks)
  }

  const addNetwork = () => {
    setNetworks([...networks, { name: "", url: "", icon: null }])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("social_networks")}</CardTitle>
        <CardDescription>{t("social_networks_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        {networks.map((network, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            {network.icon}
            <Input
              value={network.url}
              onChange={(e) => handleNetworkChange(index, e.target.value)}
              placeholder={`${network.name} URL`}
              disabled={!isEditable}
            />
          </div>
        ))}
        {isEditable && (
          <Button onClick={addNetwork} className="mt-2">
            {t("add_network")}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

