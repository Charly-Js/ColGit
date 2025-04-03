"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/utils/use-translation"
import { RepositoryView } from "@/components/repository-view"

interface Repository {
  id: string
  name: string
  description: string
  files: string[]
  branches: string[]
  lastCommit: string
}

interface RepositoryManagerProps {
  onRepositorySelect: (repositoryId: string) => void
}

export function RepositoryManager({ onRepositorySelect }: RepositoryManagerProps) {
  const [repositories, setRepositories] = useState<Repository[]>([
    {
      id: "1",
      name: "Proyecto A",
      description: "Descripción del Proyecto A",
      files: ["README.md", "src/", "package.json"],
      branches: ["main", "develop", "feature/new-ui"],
      lastCommit: "feat: add new login page",
    },
    {
      id: "2",
      name: "Proyecto B",
      description: "Descripción del Proyecto B",
      files: ["README.md", "docs/", "src/", "tests/"],
      branches: ["main", "staging", "production"],
      lastCommit: "fix: resolve merge conflicts",
    },
  ])
  const [newRepoName, setNewRepoName] = useState("")
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const { t } = useTranslation()

  const handleCreateRepo = () => {
    if (newRepoName.trim()) {
      const newRepo: Repository = {
        id: Date.now().toString(),
        name: newRepoName.trim(),
        description: "",
        files: ["README.md"],
        branches: ["main"],
        lastCommit: "Initial commit",
      }
      setRepositories([...repositories, newRepo])
      setNewRepoName("")
      setSelectedRepo(newRepo)
      onRepositorySelect(newRepo.id)
    }
  }

  const handleSelectRepo = (repoId: string) => {
    const repo = repositories.find((r) => r.id === repoId)
    if (repo) {
      setSelectedRepo(repo)
      onRepositorySelect(repo.id)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">{t("select_repository")}</h3>
        <Select value={selectedRepo?.id} onValueChange={handleSelectRepo}>
          <SelectTrigger>
            <SelectValue placeholder={t("select_repository")} />
          </SelectTrigger>
          <SelectContent>
            {repositories.map((repo) => (
              <SelectItem key={repo.id} value={repo.id}>
                {repo.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{t("create_new_repository")}</h3>
        <div className="flex space-x-2">
          <Input
            placeholder={t("new_repository_name")}
            value={newRepoName}
            onChange={(e) => setNewRepoName(e.target.value)}
          />
          <Button onClick={handleCreateRepo}>{t("create")}</Button>
        </div>
      </div>
      {selectedRepo && <RepositoryView repository={selectedRepo} onClose={() => setSelectedRepo(null)} />}
    </div>
  )
}

