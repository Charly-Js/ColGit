"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/utils/use-translation"

export function ProfileGroups() {
  const { t } = useTranslation()
  const [groups, setGroups] = useState([
    { id: "1", name: "React Developers", description: "A group for React enthusiasts" },
    { id: "2", name: "Python Coders", description: "Share your Python knowledge and projects" },
    { id: "3", name: "UI/UX Design", description: "Discuss and share UI/UX design ideas" },
  ])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("groups")}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                {t("view_group")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

