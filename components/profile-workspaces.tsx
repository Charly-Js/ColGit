"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/utils/use-translation"

export function ProfileWorkspaces() {
  const { t } = useTranslation()
  const [workspaces, setWorkspaces] = useState([
    { id: "1", name: "Project Alpha", description: "A workspace for Project Alpha" },
    { id: "2", name: "Team Beta", description: "Team Beta's collaborative space" },
    { id: "3", name: "Personal Projects", description: "Your personal workspace" },
  ])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("workspaces")}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((workspace) => (
          <Card key={workspace.id}>
            <CardHeader>
              <CardTitle>{workspace.name}</CardTitle>
              <CardDescription>{workspace.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                {t("enter_workspace")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

