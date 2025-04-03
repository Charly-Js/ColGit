"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/utils/use-translation"
import { AIDebugger } from "@/components/ai-debugger"
import { RepositoryManager } from "@/components/repository-manager"

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>("")
  const [debugResult, setDebugResult] = useState<string>("")
  const [isDebugging, setIsDebugging] = useState(false)
  const [selectedRepository, setSelectedRepository] = useState<string | null>(null)
  const [isModification, setIsModification] = useState(false) // Added state for modification tracking
  const { t } = useTranslation()

  // Simulate repositories data for modification check (replace with actual data fetching)
  const repositories = [
    { name: "repo1", files: ["file1.txt", "file2.js"] },
    { name: "repo2", files: ["file3.py"] },
  ]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Check if file already exists in any repository (simulated here)
      setIsModification(repositories.some((repo) => repo.files?.includes(selectedFile.name)))
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setFileContent(content)
        setIsDebugging(true)
      }
      reader.readAsText(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (file && debugResult && selectedRepository) {
      // Aquí iría la lógica para subir el archivo al repositorio seleccionado
      console.log("Subiendo archivo:", file.name)
      console.log("Contenido depurado:", debugResult)
      console.log("Repositorio seleccionado:", selectedRepository)
      // Reiniciar el estado después de la subida
      setFile(null)
      setFileContent("")
      setDebugResult("")
      setIsDebugging(false)
      setIsModification(false) // Reset modification state after upload
    } else {
      console.error("No se puede subir: falta archivo, resultado de depuración o repositorio seleccionado")
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{t("upload_file")}</CardTitle>
        <CardDescription>{t("select_file_to_upload")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RepositoryManager onRepositorySelect={setSelectedRepository} />
        <div className="space-y-4">
          <Input
            type="file"
            onChange={handleFileChange}
            accept=".js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.cs"
            disabled={!selectedRepository}
          />
          {isDebugging && fileContent && (
            <AIDebugger
              initialCode={fileContent}
              onDebugComplete={(result) => {
                setDebugResult(result)
                setIsDebugging(false)
              }}
            />
          )}
          {debugResult && (
            <div>
              <h3 className="text-lg font-semibold mb-2">{t("debug_result")}</h3>
              <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap">{debugResult}</pre>
            </div>
          )}
          <Button onClick={handleUpload} disabled={!file || isDebugging || !selectedRepository}>
            {isModification ? t("update_file") : t("upload_to_repository")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

