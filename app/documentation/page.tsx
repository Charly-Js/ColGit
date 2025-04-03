"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/utils/use-translation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function DocumentationPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("usage")

  const documentationContent = {
    usage: {
      title: t("how_to_use_colgit"),
      content: `
        <h2>${t("getting_started")}</h2>
        <p>${t("getting_started_description")}</p>
        <ol>
          <li>${t("create_account_step")}</li>
          <li>${t("setup_repository_step")}</li>
          <li>${t("make_first_commit_step")}</li>
          <li>${t("explore_features_step")}</li>
        </ol>

        <h2>${t("authentication")}</h2>
        <p>${t("authentication_description")}</p>
        <ul>
          <li>${t("modern_auth_interface")}: ${t("auth_interface_description")}</li>
          <li>${t("dark_theme")}: ${t("dark_theme_description")}</li>
          <li>${t("responsive_design")}: ${t("responsive_design_description")}</li>
        </ul>

        <h2>${t("version_control")}</h2>
        <p>${t("version_control_description")}</p>
        <ul>
          <li>${t("commit_changes")}: ${t("commit_description")}</li>
          <li>${t("create_branch")}: ${t("branch_description")}</li>
          <li>${t("merge_changes")}: ${t("merge_description")}</li>
        </ul>

        <h2>${t("project_management")}</h2>
        <p>${t("project_management_description")}</p>
        <ul>
          <li>${t("calendar_feature")}: ${t("calendar_description")}</li>
          <li>${t("task_management")}: ${t("task_description")}</li>
          <li>${t("notes_feature")}: ${t("notes_description")}</li>
        </ul>

        <h2>${t("chat_system")}</h2>
        <p>${t("chat_system_description")}</p>
        <ul>
          <li>${t("personal_chat")}: ${t("personal_chat_description")}</li>
          <li>${t("authenticated_only")}: ${t("authenticated_only_description")}</li>
          <li>${t("real_time_communication")}: ${t("real_time_communication_description")}</li>
        </ul>

        <h2>${t("collaboration")}</h2>
        <p>${t("collaboration_description")}</p>
      `,
    },
    purpose: {
      title: t("why_colgit"),
      content: `
        <h2>${t("vision")}</h2>
        <p>${t("vision_description")}</p>

        <h2>${t("key_features")}</h2>
        <ul>
          <li><strong>${t("integrated_environment")}</strong>: ${t("integrated_environment_description")}</li>
          <li><strong>${t("user_friendly")}</strong>: ${t("user_friendly_description")}</li>
          <li><strong>${t("educational_tool")}</strong>: ${t("educational_tool_description")}</li>
          <li><strong>${t("collaboration_focus")}</strong>: ${t("collaboration_focus_description")}</li>
        </ul>

        <h2>${t("design_philosophy")}</h2>
        <ul>
          <li><strong>${t("modern_interface")}</strong>: ${t("modern_interface_description")}</li>
          <li><strong>${t("dark_mode_first")}</strong>: ${t("dark_mode_first_description")}</li>
          <li><strong>${t("accessibility")}</strong>: ${t("accessibility_description")}</li>
          <li><strong>${t("responsive_design")}</strong>: ${t("responsive_design_philosophy")}</li>
        </ul>

        <h2>${t("future_development")}</h2>
        <p>${t("future_development_description")}</p>
      `,
    },
    contribute: {
      title: t("contribute_to_colgit"),
      content: `
        <h2>${t("join_our_community")}</h2>
        <p>${t("contribute_description")}</p>

        <h3>${t("how_to_contribute")}</h3>
        <ul>
          <li>${t("fork_repository")}</li>
          <li>${t("create_branch")}</li>
          <li>${t("make_changes")}</li>
          <li>${t("submit_pull_request")}</li>
        </ul>

        <h3>${t("contribution_areas")}</h3>
        <ul>
          <li>${t("bug_fixes")}</li>
          <li>${t("feature_enhancements")}</li>
          <li>${t("documentation_improvements")}</li>
          <li>${t("translations")}</li>
          <li>${t("ui_improvements")}</li>
          <li>${t("theme_customization")}</li>
        </ul>

        <h3>${t("design_guidelines")}</h3>
        <ul>
          <li>${t("follow_dark_theme")}</li>
          <li>${t("maintain_accessibility")}</li>
          <li>${t("ensure_responsiveness")}</li>
          <li>${t("use_shadcn_components")}</li>
        </ul>

        <p>${t("contribution_guide")}</p>
      `,
    },
    map: {
      title: t("project_map"),
      content: `
        <h2>${t("project_structure")}</h2>
        <p>${t("project_structure_description")}</p>
        <pre>
ColGit/
├── app/
│   ├── api/
│   ├── calendar/
│   ├── communities/
│   ├── documentation/
│   ├── login/          # Updated dark theme authentication
│   ├── profile/
│   ├── register/       # Updated dark theme authentication
│   ├── repository/
│   ├── settings/
│   └── upload/
├── components/
│   ├── ui/
│   ├── chat-button.tsx    # New conditional chat component
│   ├── chat-interface.tsx # New personal chat interface
│   └── [other components]
├── lib/
├── public/
└── utils/
        </pre>
        <p>${t("project_structure_explanation")}</p>

        <h2>${t("key_components")}</h2>
        <ul>
          <li><strong>app/</strong>: ${t("app_folder_description")}</li>
          <li><strong>components/</strong>: ${t("components_folder_description")}</li>
          <li><strong>lib/</strong>: ${t("lib_folder_description")}</li>
          <li><strong>public/</strong>: ${t("public_folder_description")}</li>
          <li><strong>utils/</strong>: ${t("utils_folder_description")}</li>
        </ul>

        <h2>${t("authentication_flow")}</h2>
        <p>${t("authentication_flow_description")}</p>
        <ul>
          <li>${t("login_process")}</li>
          <li>${t("registration_process")}</li>
          <li>${t("password_recovery")}</li>
          <li>${t("session_management")}</li>
        </ul>
      `,
    },
    features: {
      title: t("features_and_updates"),
      content: `
        <h2>${t("recent_updates")}</h2>
        <ul>
          <li>
            <strong>${t("auth_redesign")}</strong>
            <p>${t("auth_redesign_description")}</p>
            <ul>
              <li>${t("dark_theme_implementation")}</li>
              <li>${t("gradient_backgrounds")}</li>
              <li>${t("improved_form_layout")}</li>
            </ul>
          </li>
          <li>
            <strong>${t("chat_system_update")}</strong>
            <p>${t("chat_system_update_description")}</p>
            <ul>
              <li>${t("personal_messaging")}</li>
              <li>${t("authenticated_access")}</li>
              <li>${t("real_time_updates")}</li>
            </ul>
          </li>
          <li>
            <strong>${t("ui_improvements")}</strong>
            <p>${t("ui_improvements_description")}</p>
            <ul>
              <li>${t("consistent_dark_theme")}</li>
              <li>${t("responsive_layouts")}</li>
              <li>${t("accessibility_enhancements")}</li>
            </ul>
          </li>
        </ul>

        <h2>${t("planned_features")}</h2>
        <ul>
          <li>
            <strong>${t("enhanced_collaboration")}</strong>
            <p>${t("enhanced_collaboration_description")}</p>
          </li>
          <li>
            <strong>${t("advanced_git_features")}</strong>
            <p>${t("advanced_git_features_description")}</p>
          </li>
          <li>
            <strong>${t("ai_integration")}</strong>
            <p>${t("ai_integration_description")}</p>
          </li>
        </ul>
      `,
    },
  }

  return (
    <Layout>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{t("documentation")}</CardTitle>
          <CardDescription>{t("documentation_description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="usage" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="usage">{t("how_to_use")}</TabsTrigger>
              <TabsTrigger value="purpose">{t("why_colgit")}</TabsTrigger>
              <TabsTrigger value="contribute">{t("contribute")}</TabsTrigger>
              <TabsTrigger value="map">{t("project_map")}</TabsTrigger>
              <TabsTrigger value="features">{t("features")}</TabsTrigger>
            </TabsList>
            {Object.entries(documentationContent).map(([key, { title, content }]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[60vh]">
                      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
                    </ScrollArea>
                    {key === "contribute" && (
                      <div className="mt-6 flex justify-center">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Github className="w-4 h-4" />
                          {t("view_on_github")}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  )
}

