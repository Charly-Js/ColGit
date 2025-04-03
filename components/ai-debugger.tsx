"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/utils/use-translation"

interface AIDebuggerProps {
  language: string
  initialCode?: string
  onDebugComplete?: (result: string) => void
}

export function AIDebugger({ language, initialCode = "", onDebugComplete }: AIDebuggerProps) {
  const [code, setCode] = useState(initialCode)
  const [debugResult, setDebugResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (initialCode) {
      handleDebug()
    }
  }, [initialCode])

  const handleDebug = async () => {
    setIsLoading(true)
    setDebugResult("")
    try {
      const response = await fetch("/api/debug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setDebugResult(data.result)
      if (onDebugComplete) {
        onDebugComplete(data.result)
      }
    } catch (error) {
      console.error("Error debugging code:", error)
      setDebugResult(t("debug_error") + ": " + (error instanceof Error ? error.message : String(error)))
      setError(t("debug_error") + ": " + (error instanceof Error ? error.message : String(error)))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("ai_debugger")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={t("enter_code_to_debug")}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          className="font-mono"
        />
        <Button onClick={handleDebug} disabled={isLoading}>
          {isLoading ? t("debugging") : t("debug_code")}
        </Button>
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <h3 className="text-lg font-semibold mb-2">{t("error")}</h3>
            <p>{error}</p>
          </div>
        )}
        {debugResult && !error && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">{t("debug_result")}</h3>
            <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap">{debugResult}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

