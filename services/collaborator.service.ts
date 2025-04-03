import type { Collaborator, CollaboratorPort } from "@/domain/collaborator/collaborator.entity"

// Implementación del servicio de colaborador (adaptador secundario)
export class CollaboratorService implements CollaboratorPort {
  private mockCollaborators: Collaborator[] = [
    {
      id: "1",
      username: "alice",
      role: "collaborator",
      repositoryId: "1",
    },
    {
      id: "2",
      username: "bob",
      role: "collaborator",
      repositoryId: "1",
    },
    {
      id: "3",
      username: "user",
      role: "owner",
      repositoryId: "1",
    },
    {
      id: "4",
      username: "user",
      role: "owner",
      repositoryId: "2",
    },
    {
      id: "5",
      username: "carol",
      role: "owner",
      repositoryId: "3",
    },
    {
      id: "6",
      username: "user",
      role: "collaborator",
      repositoryId: "3",
    },
    {
      id: "7",
      username: "dave",
      role: "collaborator",
      repositoryId: "3",
    },
  ]

  async getCollaboratorsByRepositoryId(repositoryId: string): Promise<Collaborator[]> {
    // En una aplicación real, esto sería una llamada a la API
    return Promise.resolve(this.mockCollaborators.filter((collaborator) => collaborator.repositoryId === repositoryId))
  }

  async addCollaborator(collaborator: Omit<Collaborator, "id">): Promise<Collaborator> {
    const newCollaborator: Collaborator = {
      ...collaborator,
      id: Date.now().toString(),
    }
    this.mockCollaborators.push(newCollaborator)
    return Promise.resolve(newCollaborator)
  }

  async removeCollaborator(id: string): Promise<boolean> {
    const initialLength = this.mockCollaborators.length
    this.mockCollaborators = this.mockCollaborators.filter((collaborator) => collaborator.id !== id)
    return Promise.resolve(this.mockCollaborators.length < initialLength)
  }

  async updateCollaboratorRole(id: string, role: Collaborator["role"]): Promise<Collaborator> {
    const index = this.mockCollaborators.findIndex((collaborator) => collaborator.id === id)
    if (index === -1) {
      throw new Error(`Collaborator with id ${id} not found`)
    }

    const updatedCollaborator = {
      ...this.mockCollaborators[index],
      role,
    }

    this.mockCollaborators[index] = updatedCollaborator
    return Promise.resolve(updatedCollaborator)
  }
}

