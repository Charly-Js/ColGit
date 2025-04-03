// Entidad de dominio para actividades
export interface Activity {
  id: string
  repositoryId: string
  type: "commit" | "branch_created" | "merge" | "pull_request" | "issue"
  message: string
  date: string
  author: string
}

// Puertos (interfaces) para el dominio de actividad
export interface ActivityPort {
  getActivitiesByRepositoryId(repositoryId: string): Promise<Activity[]>
  createActivity(activity: Omit<Activity, "id">): Promise<Activity>
  getLatestActivity(repositoryId: string): Promise<Activity | null>
}

