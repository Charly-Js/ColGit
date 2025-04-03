"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/utils/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/utils/use-translation"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { WorkspaceManager } from "@/components/workspace-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function HomePage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <Layout>
      <div className="space-y-8">
        <section className="text-center py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-lg">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none mb-4">
            {t("welcome_to_colgit")}
          </h1>
          <p className="max-w-[600px] text-muted-foreground sm:text-xl mx-auto">{t("colgit_description")}</p>
        </section>

        <Tabs defaultValue="workspaces" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="workspaces">{t("workspaces")}</TabsTrigger>
            <TabsTrigger value="instructions">{t("instructions")}</TabsTrigger>
          </TabsList>
          <TabsContent value="workspaces">
            <WorkspaceManager />
          </TabsContent>
          <TabsContent value="instructions">
            <Card>
              <CardHeader>
                <CardTitle>{t("how_to_use_colgit")}</CardTitle>
                <CardDescription>{t("instructions_description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <ol className="list-decimal list-inside space-y-4">
                    <li>
                      <h3 className="text-lg font-semibold inline-block">{t("create_account")}</h3>
                      <p>{t("create_account_description")}</p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold inline-block">{t("setup_repository")}</h3>
                      <p>{t("setup_repository_description")}</p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold inline-block">{t("make_first_commit")}</h3>
                      <p>{t("make_first_commit_description")}</p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold inline-block">{t("explore_calendar")}</h3>
                      <p>{t("explore_calendar_description")}</p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold inline-block">{t("collaborate_with_team")}</h3>
                      <p>{t("collaborate_with_team_description")}</p>
                    </li>
                  </ol>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t("version_control")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{t("version_control_description")}</p>
              <Button variant="outline" onClick={() => router.push("/repository")}>
                {t("go_to_repository")}
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("project_management")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{t("project_management_description")}</p>
              <Button variant="outline" onClick={() => router.push("/calendar")}>
                {t("go_to_calendar")}
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("community")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{t("community_description")}</p>
              <Button variant="outline" onClick={() => router.push("/communities")}>
                {t("explore_communities")}
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  )
}

