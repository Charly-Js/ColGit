import type { Activity, ActivityPort } from "@/domain/activity/activity.entity"

// Implementación del servicio de actividad (adaptador secundario)
export class ActivityService implements ActivityPort {
  private mockActivities: Activity[] = [
    {
      id: "1",
      repositoryId: "1",
      type: "commit",
      message: "Initial Setup",
      date: "2023-05-10",
      author: "user",
    },
    {
      id: "2",
      repositoryId: "1",
      type: "commit",
      message: "Add Documentation",
      date: "2023-05-12",
      author: "user",
    },
    {
      id: "3",
      repositoryId: "1",
      type: "commit",
      message: "Fix Bug in Main Component",
      date: "2023-05-15",
      author: "user",
    },
    {
      id: "4",
      repositoryId: "1",
      type: "branch_created",
      message: "feature/new-ui",
      date: "2023-05-18",
      author: "user",
    },
    {
      id: "5",
      repositoryId: "1",
      type: "merge",
      message: "feature/new-ui → main",
      date: "2023-05-20",
      author: "user",
    },
  ]

  async getActivitiesByRepositoryId(repositoryId: string): Promise<Activity[]> {
    // En una aplicación real, esto sería una llamada a la API
    return Promise.resolve(this.mockActivities.filter((activity) => activity.repositoryId === repositoryId))
  }

  async createActivity(activity: Omit<Activity, "id">): Promise<Activity> {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
    }
    this.mockActivities.push(newActivity)
    return Promise.resolve(newActivity)
  }

  async getLatestActivity(repositoryId: string): Promise<Activity | null> {
    const activities = await this.getActivitiesByRepositoryId(repositoryId)
    if (activities.length === 0) {
      return null
    }

    // Ordenar por fecha (más reciente primero)
    activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return activities[0]
  }
}

