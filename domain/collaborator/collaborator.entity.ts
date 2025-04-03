// Entidad de dominio para colaboradores
export interface Collaborator {
  id: string
  username: string
  role: "owner" | "collaborator" | "viewer"
  repositoryId: string
}

// Puertos (interfaces) para el dominio de colaborador
export interface CollaboratorPort {
  getCollaboratorsByRepositoryId(repositoryId: string): Promise<Collaborator[]>
  addCollaborator(collaborator: Omit<Collaborator, "id">): Promise<Collaborator>
  removeCollaborator(id: string): Promise<boolean>
  updateCollaboratorRole(id: string, role: Collaborator["role"]): Promise<Collaborator>
}

