import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslation } from "@/utils/use-translation"
import { FileIcon, FolderIcon, GitBranchIcon, GitCommitIcon } from "lucide-react"

interface RepositoryViewProps {
  repository: {
    id: string
    name: string
    description: string
    files: string[]
    branches: string[]
    lastCommit: string
  }
  onClose: () => void
}

export function RepositoryView({ repository, onClose }: RepositoryViewProps) {
  const { t } = useTranslation()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{repository.name}</CardTitle>
        <CardDescription>{repository.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("files")}</h3>
            <ScrollArea className="h-40 rounded-md border">
              {repository.files.map((file, index) => (
                <div key={index} className="flex items-center p-2 hover:bg-accent">
                  {file.includes(".") ? <FileIcon className="mr-2 h-4 w-4" /> : <FolderIcon className="mr-2 h-4 w-4" />}
                  <span>{file}</span>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("branches")}</h3>
            <ScrollArea className="h-20 rounded-md border">
              {repository.branches.map((branch, index) => (
                <div key={index} className="flex items-center p-2 hover:bg-accent">
                  <GitBranchIcon className="mr-2 h-4 w-4" />
                  <span>{branch}</span>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("last_commit")}</h3>
            <div className="flex items-center p-2 rounded-md border">
              <GitCommitIcon className="mr-2 h-4 w-4" />
              <span>{repository.lastCommit}</span>
            </div>
          </div>
          <Button onClick={onClose}>{t("close")}</Button>
        </div>
      </CardContent>
    </Card>
  )
}

