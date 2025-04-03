"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users } from "lucide-react"
import { useTranslation } from "@/utils/use-translation"
import { toast } from "@/components/ui/use-toast"

interface Workspace {
  id: string
  name: string
  isImportant: boolean
  rating: number
  isGroup: boolean
}

export function WorkspaceList() {
  const { t } = useTranslation()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: "1", name: "Personal Project", isImportant: false, rating: 3, isGroup: false },
    { id: "2", name: "Team Alpha", isImportant: true, rating: 5, isGroup: true },
    { id: "3", name: "Open Source Contribution", isImportant: false, rating: 4, isGroup: true },
  ])

  const handleToggleImportant = (id: string) => {
    setWorkspaces(workspaces.map((ws) => (ws.id === id ? { ...ws, isImportant: !ws.isImportant } : ws)))
  }

  const handleRating = (id: string, rating: number) => {
    setWorkspaces(workspaces.map((ws) => (ws.id === id ? { ...ws, rating } : ws)))
  }

  const handleLeave = (id: string) => {
    setWorkspaces(workspaces.filter((ws) => ws.id !== id))
    toast({
      title: t("workspace_left"),
      description: t("you_have_left_the_workspace"),
    })
  }

  return (
    <div className="space-y-4">
      {workspaces.map((workspace) => (
        <Card key={workspace.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {workspace.name}
              <Button variant="ghost" size="sm" onClick={() => handleToggleImportant(workspace.id)}>
                <Star className={workspace.isImportant ? "fill-yellow-400" : "fill-none"} />
              </Button>
            </CardTitle>
            <CardDescription>{workspace.isGroup ? t("group_workspace") : t("personal_workspace")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button key={star} variant="ghost" size="sm" onClick={() => handleRating(workspace.id, star)}>
                    <Star className={workspace.rating >= star ? "fill-yellow-400" : "fill-none"} />
                  </Button>
                ))}
              </div>
              <div>
                {workspace.isGroup && (
                  <Button variant="outline" size="sm" className="mr-2">
                    <Users className="mr-2 h-4 w-4" />
                    {t("view_codeteam")}
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => handleLeave(workspace.id)}>
                  {t("leave_workspace")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

