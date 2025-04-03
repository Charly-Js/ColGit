"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { AICodeAssistant } from "@/components/ai-code-assistant"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/utils/use-translation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AIDebugger } from "@/components/ai-debugger"

/**
 * Lista de lenguajes de programación soportados por el asistente de IA.
 * Cada elemento tiene un valor (para uso interno) y una etiqueta (para mostrar al usuario).
 */
const SUPPORTED_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
]

/**
 * Página principal del espacio de código (Codespace).
 * Proporciona acceso al asistente de IA y al depurador de IA.
 * Permite seleccionar el lenguaje de programación y cambiar entre las diferentes herramientas.
 */
export default function CodespacePage() {
  const { t } = useTranslation()
  // Estado para almacenar el lenguaje de programación seleccionado
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES[0].value)

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">{t("codespace")}</h1>

        {/* Selector de lenguaje de programación */}
        <div className="mb-4">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("select_language")} />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pestañas para cambiar entre el asistente y el depurador */}
        <Tabs defaultValue="ai-assistant">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-assistant">{t("ai_assistant")}</TabsTrigger>
            <TabsTrigger value="ai-debugger">{t("ai_debugger")}</TabsTrigger>
          </TabsList>

          {/* Contenido del asistente de IA */}
          <TabsContent value="ai-assistant" className="mt-4">
            <AICodeAssistant language={selectedLanguage} />
          </TabsContent>

          {/* Contenido del depurador de IA (versión anterior) */}
          <TabsContent value="ai-debugger" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("legacy_ai_debugger")}</CardTitle>
                <CardDescription>{t("legacy_ai_debugger_description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <AIDebugger language={selectedLanguage} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Información adicional sobre la integración de IA */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("about_ai_integration")}</CardTitle>
              <CardDescription>{t("about_ai_integration_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{t("ai_integration_explanation")}</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>{t("ai_feature_code_analysis")}</li>
                <li>{t("ai_feature_code_generation")}</li>
                <li>{t("ai_feature_code_explanation")}</li>
                <li>{t("ai_feature_code_fixing")}</li>
                <li>{t("ai_feature_code_qa")}</li>
              </ul>
              <p className="mt-4">{t("ai_privacy_note")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

