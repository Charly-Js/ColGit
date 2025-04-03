"use client"

import { useState } from "react"
import { ActivityService } from "@/services/activity.service"
import type { Activity } from "@/domain/activity/activity.entity"

// Adaptador para conectar la UI con el dominio de actividad
export function useActivityAdapter(repositoryId?: string) {
  const [showDetailedActivity, setShowDetailedActivity] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])
  const activityService = new ActivityService()

  const handleViewDetailedActivity = async () => {
    if (!showDetailedActivity && repositoryId) {
      try {
        // En una aplicación real, esto cargaría las actividades del repositorio
        const repoActivities = await activityService.getActivitiesByRepositoryId(repositoryId)
        setActivities(repoActivities)
      } catch (error) {
        console.error("Error loading activities:", error)
      }
    }
    setShowDetailedActivity(!showDetailedActivity)
  }

  const getDetailedActivities = () => {
    // Si no hay actividades reales, devolvemos datos de ejemplo
    if (activities.length === 0) {
      return [
        { type: "commit", message: "Initial Setup", date: "2023-05-10", author: "user" },
        { type: "commit", message: "Add Documentation", date: "2023-05-12", author: "user" },
        { type: "commit", message: "Fix Bug in Main Component", date: "2023-05-15", author: "user" },
        { type: "branch_created", message: "feature/new-ui", date: "2023-05-18", author: "user" },
        { type: "merge", message: "feature/new-ui → main", date: "2023-05-20", author: "user" },
      ]
    }

    return activities.map((activity) => ({
      type: activity.type,
      message: activity.message,
      date: activity.date,
      author: activity.author,
    }))
  }

  return {
    showDetailedActivity,
    handleViewDetailedActivity,
    getDetailedActivities,
  }
}

