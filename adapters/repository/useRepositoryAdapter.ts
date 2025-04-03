"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/utils/auth-context"
import type { Repository } from "@/domain/repository/repository.entity"
import { RepositoryService } from "@/services/repository.service"

// Adaptador para conectar la UI con el dominio de repositorio
export function useRepositoryAdapter() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const { user } = useAuth()
  const repositoryService = new RepositoryService()

  useEffect(() => {
    // En una aplicación real, esto llamaría al servicio de repositorio
    // Por ahora, usamos datos de ejemplo
    const loadRepositories = async () => {
      try {
        const repos = await repositoryService.getRepositories()
        setRepositories(repos)
        if (repos.length > 0) {
          setSelectedRepo(repos[0])
        }
      } catch (error) {
        console.error("Error loading repositories:", error)
      }
    }

    loadRepositories()
  }, [user])

  const handleToggleVisibility = async (repoId: string) => {
    try {
      const updatedRepo = await repositoryService.toggleVisibility(repoId)

      // Actualizar la lista de repositorios
      setRepositories(repositories.map((repo) => (repo.id === repoId ? { ...repo, isPublic: !repo.isPublic } : repo)))

      // Actualizar el repositorio seleccionado si es necesario
      if (selectedRepo?.id === repoId) {
        setSelectedRepo((prev) => (prev ? { ...prev, isPublic: !prev.isPublic } : null))
      }
    } catch (error) {
      console.error("Error toggling visibility:", error)
    }
  }

  const canDownload = (repo: Repository) => {
    if (repo.owner === user?.username) return true
    if (repo.isPublic) return true
    return false
  }

  return {
    repositories,
    selectedRepo,
    setSelectedRepo,
    handleToggleVisibility,
    canDownload,
  }
}

