"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/utils/use-translation"
import { useAuth } from "@/utils/auth-context"
import { Download, Eye, Lock, Globe, Users, FileText, Code, Activity, Folder, File } from "lucide-react"

// Importar los adaptadores y puertos necesarios
import { useRepositoryAdapter } from "@/adapters/repository/useRepositoryAdapter"
import { useActivityAdapter } from "@/adapters/activity/useActivityAdapter"

interface Repository {
  id: string
  name: string
  description: string
  isPublic: boolean
  lastUpdated: string
  owner: string
  collaborators: string[]
  files: {
    name: string
    type: "file" | "folder" | "document"
    size?: string
    lastModified?: string
  }[]
}

export default function MyRepositoryPage() {
  const { t } = useTranslation()
  const { user } = useAuth()

  // Usar adaptadores para acceder a la lógica de dominio
  const { repositories, selectedRepo, setSelectedRepo, handleToggleVisibility, canDownload } = useRepositoryAdapter()

  const { showDetailedActivity, handleViewDetailedActivity, getDetailedActivities } = useActivityAdapter(
    selectedRepo?.id,
  )

  const [activeTab, setActiveTab] = useState("files")

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">{t("my_repository")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lista de repositorios */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t("my_projects")}</CardTitle>
                <CardDescription>{t("your_repositories_and_collaborations")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {repositories.map((repo) => (
                    <div
                      key={repo.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedRepo?.id === repo.id ? "bg-primary/10" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedRepo(repo)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{repo.name}</h3>
                          <p className="text-sm text-muted-foreground">{repo.description}</p>
                        </div>
                        <Badge variant={repo.isPublic ? "default" : "secondary"}>
                          {repo.isPublic ? <Globe className="h-3 w-3 mr-1" /> : <Lock className="h-3 w-3 mr-1" />}
                          {repo.isPublic ? t("public") : t("private")}
                        </Badge>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {repo.owner === user?.username ? t("you_are_owner") : t("owned_by", { owner: repo.owner })}
                        <span className="mx-2">•</span>
                        {t("last_updated", { date: repo.lastUpdated })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detalles del repositorio seleccionado */}
          <div className="md:col-span-2">
            {selectedRepo ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{selectedRepo.name}</CardTitle>
                      <CardDescription>{selectedRepo.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {selectedRepo.owner === user?.username && (
                        <Button variant="outline" size="sm" onClick={() => handleToggleVisibility(selectedRepo.id)}>
                          {selectedRepo.isPublic ? t("make_private") : t("make_public")}
                        </Button>
                      )}
                      {canDownload(selectedRepo) && (
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          {t("download")}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="files" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="files">
                        <Code className="h-4 w-4 mr-2" />
                        {t("files")}
                      </TabsTrigger>
                      <TabsTrigger value="documentation">
                        <FileText className="h-4 w-4 mr-2" />
                        {t("documentation")}
                      </TabsTrigger>
                      <TabsTrigger value="activity">
                        <Activity className="h-4 w-4 mr-2" />
                        {t("activity")}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="files" className="mt-4">
                      <div className="rounded-md border">
                        <div className="bg-muted py-2 px-4 text-sm font-medium grid grid-cols-12">
                          <div className="col-span-6">{t("name")}</div>
                          <div className="col-span-3">{t("size")}</div>
                          <div className="col-span-3">{t("last_modified")}</div>
                        </div>
                        <div className="divide-y">
                          {selectedRepo.files.map((file, index) => (
                            <div key={index} className="py-2 px-4 grid grid-cols-12 items-center">
                              <div className="col-span-6 flex items-center">
                                {file.type === "folder" && <Folder className="h-4 w-4 mr-2 text-blue-500" />}
                                {file.type === "file" && <File className="h-4 w-4 mr-2 text-gray-500" />}
                                {file.type === "document" && <FileText className="h-4 w-4 mr-2 text-green-500" />}
                                {file.name}
                              </div>
                              <div className="col-span-3 text-sm text-muted-foreground">{file.size || "-"}</div>
                              <div className="col-span-3 text-sm text-muted-foreground">{file.lastModified || "-"}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="documentation" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-semibold mb-2">{t("project_documentation")}</h3>
                          <p className="mb-4">{t("documentation_description")}</p>

                          {selectedRepo.files.some((f) => f.type === "document") ? (
                            <div className="space-y-4">
                              {selectedRepo.files
                                .filter((f) => f.type === "document")
                                .map((doc, index) => (
                                  <div key={index} className="p-4 border rounded-lg">
                                    <div className="flex items-center">
                                      <FileText className="h-5 w-5 mr-2 text-green-500" />
                                      <h4 className="font-medium">{doc.name}</h4>
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                      {t("last_updated", { date: doc.lastModified || "" })}
                                    </p>
                                    <Button variant="outline" size="sm" className="mt-2">
                                      <Eye className="h-4 w-4 mr-2" />
                                      {t("view_document")}
                                    </Button>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">{t("no_documentation_available")}</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-semibold mb-2">{t("project_activity")}</h3>
                          <p className="mb-4">{t("activity_description")}</p>

                          <div className="space-y-4">
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center">
                                <Users className="h-5 w-5 mr-2 text-blue-500" />
                                <h4 className="font-medium">{t("collaborators")}</h4>
                              </div>
                              <div className="mt-2 space-y-2">
                                {selectedRepo.owner === user?.username && (
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="mr-2">
                                      {t("owner")}
                                    </Badge>
                                    <span>{user.username}</span>
                                  </div>
                                )}
                                {selectedRepo.collaborators.map((collaborator, index) => (
                                  <div key={index} className="flex items-center">
                                    <Badge variant="outline" className="mr-2">
                                      {collaborator === user?.username ? t("you") : t("collaborator")}
                                    </Badge>
                                    <span>{collaborator}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-green-500" />
                                <h4 className="font-medium">{t("recent_activity")}</h4>
                              </div>
                              <div className="mt-2 space-y-2">
                                <p className="text-sm">{t("last_commit", { date: selectedRepo.lastUpdated })}</p>
                                <Button variant="outline" size="sm" onClick={handleViewDetailedActivity}>
                                  {showDetailedActivity ? t("hide_detailed_activity") : t("view_detailed_activity")}
                                </Button>
                                {showDetailedActivity && (
                                  <div className="mt-4 space-y-2 border-t pt-4">
                                    <h5 className="font-medium text-sm">{t("detailed_activity")}</h5>
                                    <div className="space-y-2">
                                      {getDetailedActivities().map((activity, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                          <span>
                                            {t(activity.type)}: {activity.message}
                                          </span>
                                          <span className="text-muted-foreground">{activity.date}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
                  <p className="text-muted-foreground">{t("select_repository_to_view")}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

