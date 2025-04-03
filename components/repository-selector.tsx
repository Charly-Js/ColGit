"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/utils/use-translation"

interface Repository {
  id: string
  name: string
}

interface RepositorySelectorProps {
  onRepositorySelect: (repositoryId: string) => void
  repositories?: Repository[]
  selectedRepository?: string
}

export function RepositorySelector({
  onRepositorySelect,
  repositories: externalRepositories,
  selectedRepository: externalSelectedRepo,
}: RepositorySelectorProps) {
  const [repositories, setRepositories] = useState<Repository[]>(externalRepositories || [])
  const [selectedRepo, setSelectedRepo] = useState<string>(externalSelectedRepo || "")
  const [newRepoName, setNewRepoName] = useState<string>("")
  const { t } = useTranslation()

  useEffect(() => {
    // Si no hay repositorios externos, cargar datos de ejemplo
    if (!externalRepositories) {
      // Datos de ejemplo para mostrar
      const mockRepositories: Repository[] = [
        { id: "1", name: "Proyecto A" },
        { id: "2", name: "Proyecto B" },
        { id: "3", name: "Proyecto C" },
      ]
      setRepositories(mockRepositories)
    }
  }, [externalRepositories])

  // Actualizar el estado local si cambian las props externas
  useEffect(() => {
    if (externalRepositories) {
      setRepositories(externalRepositories)
    }
    if (externalSelectedRepo) {
      setSelectedRepo(externalSelectedRepo)
    }
  }, [externalRepositories, externalSelectedRepo])

  const handleRepositorySelect = (repoId: string) => {
    setSelectedRepo(repoId)
    onRepositorySelect(repoId)
  }

  const handleCreateRepository = () => {
    if (newRepoName.trim()) {
      // En una implementación real, esto sería una llamada a la API
      const newRepo: Repository = {
        id: Date.now().toString(),
        name: newRepoName.trim(),
      }
      setRepositories([...repositories, newRepo])
      setNewRepoName("")
      handleRepositorySelect(newRepo.id)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="repository-select" className="block text-sm font-medium mb-1">
          {t("select_repository")}
        </label>
        <Select onValueChange={handleRepositorySelect} value={selectedRepo}>
          <SelectTrigger id="repository-select">
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
        <label htmlFor="new-repo-name" className="block text-sm font-medium mb-1">
          {t("create_new_repository")}
        </label>
        <div className="flex rounded-md shadow-sm">
          <Input
            type="text"
            name="new-repo-name"
            id="new-repo-name"
            value={newRepoName}
            onChange={(e) => setNewRepoName(e.target.value)}
            placeholder={t("new_repository_name")}
            className="flex-1 rounded-none rounded-l-md"
          />
          <Button onClick={handleCreateRepository} className="rounded-none rounded-r-md">
            {t("create")}
          </Button>
        </div>
      </div>
    </div>
  )
}

