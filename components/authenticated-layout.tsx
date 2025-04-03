"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/utils/auth-context"
import { Layout } from "@/components/layout"

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/login" && pathname !== "/register") {
      router.push("/login")
    }
  }, [user, isLoading, router, pathname])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user && pathname !== "/login" && pathname !== "/register") {
    return null
  }

  if (pathname === "/login" || pathname === "/register" || pathname === "/forgot-password") {
    return children
  }

  return <>{children}</>
}

