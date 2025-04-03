import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslation } from "@/utils/use-translation"

interface FileVersion {
  id: string
  date: string
  author: string
  message: string
}

interface FileHistoryProps {
  fileName: string
  versions: FileVersion[]
  onRevert: (versionId: string) => void
}

export function FileHistory({ fileName, versions, onRevert }: FileHistoryProps) {
  const { t } = useTranslation()
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("file_history")}</CardTitle>
        <CardDescription>{t("file_history_description", { fileName })}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {versions.map((version) => (
            <div
              key={version.id}
              className={`p-2 mb-2 rounded ${selectedVersion === version.id ? "bg-primary/10" : "hover:bg-muted"}`}
              onClick={() => setSelectedVersion(version.id)}
            >
              <p className="font-medium">{version.date}</p>
              <p>
                {t("author")}: {version.author}
              </p>
              <p>{version.message}</p>
            </div>
          ))}
        </ScrollArea>
        <Button
          onClick={() => selectedVersion && onRevert(selectedVersion)}
          disabled={!selectedVersion}
          className="mt-4"
        >
          {t("revert_to_selected_version")}
        </Button>
      </CardContent>
    </Card>
  )
}

