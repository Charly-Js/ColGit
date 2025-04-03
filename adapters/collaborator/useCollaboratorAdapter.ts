"use client"

import { useState, useEffect } from "react"
import { CollaboratorService } from "@/services/collaborator.service"
import type { Collaborator } from "@/domain/collaborator/collaborator.entity"

// Adaptador para conectar la UI con el dominio de colaborador
export function useCollaboratorAdapter(repositoryId?: string) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const collaboratorService = new CollaboratorService()

  useEffect(() => {
    if (repositoryId) {
      const loadCollaborators = async () => {
        try {
          const repoCollaborators = await collaboratorService.getCollaboratorsByRepositoryId(repositoryId)
          setCollaborators(repoCollaborators)
        } catch (error) {
          console.error("Error loading collaborators:", error)
        }
      }

      loadCollaborators()
    }
  }, [repositoryId])

  const addCollaborator = async (username: string, role: Collaborator["role"]) => {
    if (!repositoryId) return

    try {
      const newCollaborator = await collaboratorService.addCollaborator({
        username,
        role,
        repositoryId,
      })

      setCollaborators([...collaborators, newCollaborator])
      return newCollaborator
    } catch (error) {
      console.error("Error adding collaborator:", error)
      return null
    }
  }

  const removeCollaborator = async (collaboratorId: string) => {
    try {
      const success = await collaboratorService.removeCollaborator(collaboratorId)
      if (success) {
        setCollaborators(collaborators.filter((c) => c.id !== collaboratorId))
      }
      return success
    } catch (error) {
      console.error("Error removing collaborator:", error)
      return false
    }
  }

  return {
    collaborators,
    addCollaborator,
    removeCollaborator,
  }
}

