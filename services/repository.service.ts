import type { Repository, RepositoryPort } from "@/domain/repository/repository.entity"

// Implementación del servicio de repositorio (adaptador secundario)
export class RepositoryService implements RepositoryPort {
  private mockRepositories: Repository[] = [
    {
      id: "1",
      name: "Proyecto A",
      description: "Un proyecto de ejemplo con documentación completa",
      isPublic: true,
      lastUpdated: "2023-05-15",
      owner: "user",
      collaborators: ["alice", "bob"],
      files: [
        { name: "README.md", type: "document", size: "12KB", lastModified: "2023-05-10" },
        { name: "src", type: "folder" },
        { name: "docs", type: "folder" },
        { name: "main.js", type: "file", size: "45KB", lastModified: "2023-05-15" },
      ],
    },
    {
      id: "2",
      name: "Proyecto Privado",
      description: "Un proyecto privado solo visible para el propietario",
      isPublic: false,
      lastUpdated: "2023-05-20",
      owner: "user",
      collaborators: [],
      files: [
        { name: "README.md", type: "document", size: "8KB", lastModified: "2023-05-18" },
        { name: "src", type: "folder" },
        { name: "config.json", type: "file", size: "2KB", lastModified: "2023-05-20" },
      ],
    },
    {
      id: "3",
      name: "Proyecto Colaborativo",
      description: "Un proyecto en el que estoy colaborando",
      isPublic: true,
      lastUpdated: "2023-05-22",
      owner: "carol",
      collaborators: ["user", "dave"],
      files: [
        { name: "README.md", type: "document", size: "15KB", lastModified: "2023-05-21" },
        { name: "src", type: "folder" },
        { name: "tests", type: "folder" },
        { name: "index.js", type: "file", size: "30KB", lastModified: "2023-05-22" },
      ],
    },
  ]

  async getRepositories(): Promise<Repository[]> {
    // En una aplicación real, esto sería una llamada a la API
    return Promise.resolve(this.mockRepositories)
  }

  async getRepositoryById(id: string): Promise<Repository | null> {
    const repository = this.mockRepositories.find((repo) => repo.id === id)
    return Promise.resolve(repository || null)
  }

  async createRepository(repository: Omit<Repository, "id">): Promise<Repository> {
    const newRepository: Repository = {
      ...repository,
      id: Date.now().toString(),
    }
    this.mockRepositories.push(newRepository)
    return Promise.resolve(newRepository)
  }

  async updateRepository(id: string, repository: Partial<Repository>): Promise<Repository> {
    const index = this.mockRepositories.findIndex((repo) => repo.id === id)
    if (index === -1) {
      throw new Error(`Repository with id ${id} not found`)
    }

    const updatedRepository = {
      ...this.mockRepositories[index],
      ...repository,
    }

    this.mockRepositories[index] = updatedRepository
    return Promise.resolve(updatedRepository)
  }

  async deleteRepository(id: string): Promise<boolean> {
    const initialLength = this.mockRepositories.length
    this.mockRepositories = this.mockRepositories.filter((repo) => repo.id !== id)
    return Promise.resolve(this.mockRepositories.length < initialLength)
  }

  async toggleVisibility(id: string): Promise<Repository> {
    const repository = await this.getRepositoryById(id)
    if (!repository) {
      throw new Error(`Repository with id ${id} not found`)
    }

    return this.updateRepository(id, { isPublic: !repository.isPublic })
  }
}

