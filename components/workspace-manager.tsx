"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useTranslation } from "@/utils/use-translation"
import { toast } from "@/components/ui/use-toast"

interface Workspace {
  id: string
  name: string
  isPublic: boolean
}

export function WorkspaceManager() {
  const { t } = useTranslation()
  const [workspaceName, setWorkspaceName] = useState("")
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [publicWorkspaces, setPublicWorkspaces] = useState<Workspace[]>([
    { id: "1", name: "Open Source Projects", isPublic: true },
    { id: "2", name: "Web Development", isPublic: true },
    { id: "3", name: "Machine Learning", isPublic: true },
  ])

  const createWorkspace = () => {
    if (workspaceName.trim()) {
      const newWorkspace: Workspace = {
        id: Date.now().toString(),
        name: workspaceName.trim(),
        isPublic: false,
      }
      setWorkspaces([...workspaces, newWorkspace])
      setWorkspaceName("")
      toast({
        title: t("workspace_created"),
        description: t("workspace_created_description", { name: newWorkspace.name }),
      })
    }
  }

  const requestAccess = (workspace: Workspace) => {
    toast({
      title: t("access_requested"),
      description: t("access_requested_description", { name: workspace.name }),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("workspace_management")}</CardTitle>
        <CardDescription>{t("manage_your_workspaces")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder={t("enter_workspace_name")}
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
          <Button onClick={createWorkspace}>{t("create_workspace")}</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{t("your_workspaces")}</h3>
          {workspaces.map((workspace) => (
            <div key={workspace.id} className="flex justify-between items-center mb-2">
              <span>{workspace.name}</span>
              <Button variant="outline" size="sm">
                {t("enter")}
              </Button>
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{t("browse_public_workspaces")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("public_workspaces")}</DialogTitle>
              <DialogDescription>{t("request_access_to_public_workspaces")}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {publicWorkspaces.map((workspace) => (
                <div key={workspace.id} className="flex justify-between items-center">
                  <span>{workspace.name}</span>
                  <Button onClick={() => requestAccess(workspace)}>{t("request_access")}</Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

