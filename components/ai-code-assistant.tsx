"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useTranslation } from "@/utils/use-translation"
import { useAIAssistantAdapter } from "@/adapters/ai/useAIAssistantAdapter"
import { Loader2, AlertCircle, CheckCircle, Wand, MessageSquare, FileCode, Bug } from "lucide-react"
import type { CodeAnalysisResult } from "@/domain/ai/ai-assistant.entity"

interface AICodeAssistantProps {
  initialCode?: string
  language?: string
}

/**
 * Componente principal que proporciona la interfaz de usuario para el asistente de IA.
 * Permite a los usuarios analizar, generar, explicar y corregir código,
 * así como hacer preguntas relacionadas con programación.
 *
 * @param initialCode - Código inicial para el editor (opcional)
 * @param language - Lenguaje de programación seleccionado por defecto
 */
export function AICodeAssistant({ initialCode = "", language = "javascript" }: AICodeAssistantProps) {
  const { t } = useTranslation()
  const [code, setCode] = useState(initialCode)
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [prompt, setPrompt] = useState("")
  const [question, setQuestion] = useState("")
  const [activeTab, setActiveTab] = useState("analyze")
  const codeEditorRef = useRef<HTMLTextAreaElement>(null)

  // Utiliza el adaptador para conectar con el dominio del asistente de IA
  const {
    isAnalyzing,
    isGenerating,
    analysisResult,
    completionResult,
    explanation,
    fixedCode,
    answer,
    analyzeCode,
    generateCodeCompletion,
    explainCode,
    fixCode,
    answerCodeQuestion,
  } = useAIAssistantAdapter()

  /**
   * Maneja el análisis del código actual.
   * Verifica que el código no esté vacío antes de enviarlo.
   */
  const handleAnalyzeCode = async () => {
    if (!code.trim()) return
    await analyzeCode(code, selectedLanguage)
  }

  /**
   * Maneja la generación de código basado en el prompt.
   * Verifica que el prompt no esté vacío antes de enviarlo.
   */
  const handleGenerateCode = async () => {
    if (!prompt.trim()) return

    // IMPORTANTE: Este espacio lo trabajará personal experto en integración de la IA al código.
    // Aquí se implementará la lógica para conectar con la cuenta personal del usuario
    // y utilizar sus credenciales para acceder a los servicios de IA que haya contratado.
    // Se debe garantizar la seguridad de las credenciales y datos del usuario.

    await generateCodeCompletion(prompt, selectedLanguage, code)
  }

  /**
   * Solicita una explicación del código actual.
   * Verifica que el código no esté vacío antes de enviarlo.
   */
  const handleExplainCode = async () => {
    if (!code.trim()) return
    await explainCode(code, selectedLanguage)
  }

  /**
   * Solicita la corrección automática del código actual.
   * Actualiza el editor con el código corregido.
   */
  const handleFixCode = async () => {
    if (!code.trim()) return
    const result = await fixCode(code, selectedLanguage)
    setCode(result)
  }

  /**
   * Envía una pregunta sobre el código actual.
   * Verifica que la pregunta no esté vacía antes de enviarla.
   */
  const handleAnswerQuestion = async () => {
    if (!question.trim()) return
    await answerCodeQuestion(question, code)
  }

  /**
   * Aplica una sugerencia de código al editor.
   * @param suggestion - Código sugerido a aplicar
   */
  const applyCodeSuggestion = (suggestion: string) => {
    if (suggestion && codeEditorRef.current) {
      setCode(suggestion)
    }
  }

  /**
   * Renderiza el resultado del análisis de código.
   * Muestra errores, sugerencias y explicación general.
   * @param result - Resultado del análisis
   */
  const renderAnalysisResult = (result: CodeAnalysisResult) => {
    return (
      <div className="space-y-4">
        {result.errors.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{t("errors_and_warnings")}</h3>
            {result.errors.map((error, index) => (
              <Alert key={index} variant={error.severity === "error" ? "destructive" : "default"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {t("line")} {error.line}: {error.message}
                </AlertTitle>
                {error.suggestion && <AlertDescription>{error.suggestion}</AlertDescription>}
              </Alert>
            ))}
          </div>
        )}

        {result.suggestions.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{t("suggestions")}</h3>
            {result.suggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <p className="mb-2">{suggestion.description}</p>
                {suggestion.code && (
                  <div className="relative">
                    <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                      <code>{suggestion.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => applyCodeSuggestion(suggestion.code || "")}
                    >
                      {t("apply")}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {result.explanation && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{t("explanation")}</h3>
            <div className="p-4 border rounded-lg">
              <p className="whitespace-pre-line">{result.explanation}</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Interfaz de usuario principal con pestañas para diferentes funcionalidades
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("ai_code_assistant")}</CardTitle>
        <CardDescription>{t("ai_code_assistant_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="analyze">
              <Bug className="mr-2 h-4 w-4" />
              {t("analyze")}
            </TabsTrigger>
            <TabsTrigger value="generate">
              {/* IMPORTANTE: Este espacio lo trabajará personal experto en integración de la IA al código.
                  Esta funcionalidad permitirá a los usuarios conectar sus propias cuentas de servicios de IA
                  para generar código sin costos adicionales para la plataforma. */}
              <Wand className="mr-2 h-4 w-4" />
              {t("generate")}
            </TabsTrigger>
            <TabsTrigger value="explain">
              <FileCode className="mr-2 h-4 w-4" />
              {t("explain")}
            </TabsTrigger>
            <TabsTrigger value="fix">
              <CheckCircle className="mr-2 h-4 w-4" />
              {t("fix")}
            </TabsTrigger>
            <TabsTrigger value="ask">
              <MessageSquare className="mr-2 h-4 w-4" />
              {t("ask")}
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            {/* Selector de lenguaje de programación */}
            <div className="flex items-center space-x-2">
              <label htmlFor="language-select" className="text-sm font-medium">
                {t("language")}:
              </label>
              <select
                id="language-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="swift">Swift</option>
                <option value="kotlin">Kotlin</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="sql">SQL</option>
              </select>
            </div>

            {/* Editor de código para las pestañas que lo requieren */}
            {(activeTab === "analyze" || activeTab === "explain" || activeTab === "fix" || activeTab === "ask") && (
              <div className="space-y-2">
                <label htmlFor="code-editor" className="text-sm font-medium">
                  {t("your_code")}:
                </label>
                <Textarea
                  id="code-editor"
                  ref={codeEditorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={t("enter_your_code_here")}
                  className="font-mono h-64"
                />
              </div>
            )}

            {/* Campo de entrada para generar código */}
            {activeTab === "generate" && (
              <div className="space-y-2">
                <label htmlFor="prompt-input" className="text-sm font-medium">
                  {t("what_code_do_you_want_to_generate")}:
                </label>
                <Textarea
                  id="prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t("describe_the_code_you_need")}
                  className="h-32"
                />
              </div>
            )}

            {/* Campo de entrada para preguntas */}
            {activeTab === "ask" && (
              <div className="space-y-2">
                <label htmlFor="question-input" className="text-sm font-medium">
                  {t("your_question")}:
                </label>
                <Input
                  id="question-input"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={t("ask_a_question_about_your_code")}
                />
              </div>
            )}

            {/* Botones de acción específicos para cada pestaña */}
            <div className="flex justify-end">
              {activeTab === "analyze" && (
                <Button onClick={handleAnalyzeCode} disabled={isAnalyzing || !code.trim()}>
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("analyzing")}
                    </>
                  ) : (
                    <>
                      <Bug className="mr-2 h-4 w-4" />
                      {t("analyze_code")}
                    </>
                  )}
                </Button>
              )}

              {activeTab === "generate" && (
                <Button onClick={handleGenerateCode} disabled={isGenerating || !prompt.trim()}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("generating")}
                    </>
                  ) : (
                    <>
                      <Wand className="mr-2 h-4 w-4" />
                      {t("generate_code")}
                    </>
                  )}
                </Button>
              )}

              {activeTab === "explain" && (
                <Button onClick={handleExplainCode} disabled={!code.trim()}>
                  <FileCode className="mr-2 h-4 w-4" />
                  {t("explain_code")}
                </Button>
              )}

              {activeTab === "fix" && (
                <Button onClick={handleFixCode} disabled={!code.trim()}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {t("fix_code")}
                </Button>
              )}

              {activeTab === "ask" && (
                <Button onClick={handleAnswerQuestion} disabled={!question.trim()}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {t("answer_question")}
                </Button>
              )}
            </div>
          </div>

          {/* Contenido específico para cada pestaña */}
          <TabsContent value="analyze" className="mt-4">
            {isAnalyzing ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">{t("analyzing_your_code")}</span>
              </div>
            ) : analysisResult ? (
              renderAnalysisResult(analysisResult)
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Bug className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t("enter_code_and_click_analyze")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="generate" className="mt-4">
            {isGenerating ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">{t("generating_code")}</span>
              </div>
            ) : completionResult ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("generated_code")}</h3>
                <div className="relative">
                  <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                    <code>{completionResult.completion}</code>
                  </pre>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setCode(completionResult.completion)}
                  >
                    {t("use_this_code")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Wand className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t("describe_what_code_you_need")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="explain" className="mt-4">
            {explanation ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("code_explanation")}</h3>
                <div className="p-4 border rounded-lg">
                  <p className="whitespace-pre-line">{explanation}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <FileCode className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t("enter_code_to_explain")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="fix" className="mt-4">
            {fixedCode ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("fixed_code")}</h3>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>{t("code_fixed")}</AlertTitle>
                  <AlertDescription>{t("code_has_been_fixed_and_applied")}</AlertDescription>
                </Alert>
                <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                  <code>{fixedCode}</code>
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <CheckCircle className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t("enter_code_to_fix")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ask" className="mt-4">
            {answer ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("answer")}</h3>
                <div className="p-4 border rounded-lg">
                  <p className="whitespace-pre-line">{answer}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t("ask_a_question_about_your_code")}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

