// Entidad de dominio para repositorios
export interface RepositoryFile {
  name: string
  type: "file" | "folder" | "document"
  size?: string
  lastModified?: string
}

export interface Repository {
  id: string
  name: string
  description: string
  isPublic: boolean
  lastUpdated: string
  owner: string
  collaborators: string[]
  files: RepositoryFile[]
}

// Puertos (interfaces) para el dominio de repositorio
export interface RepositoryPort {
  getRepositories(): Promise<Repository[]>
  getRepositoryById(id: string): Promise<Repository | null>
  createRepository(repository: Omit<Repository, "id">): Promise<Repository>
  updateRepository(id: string, repository: Partial<Repository>): Promise<Repository>
  deleteRepository(id: string): Promise<boolean>
  toggleVisibility(id: string): Promise<Repository>
}

