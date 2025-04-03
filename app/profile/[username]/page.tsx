"use client"

import { Layout } from "@/components/layout"
import { ProfileViewer } from "@/components/profile/ProfileViewer"

export default function UserProfilePage({ params }: { params: { username: string } }) {
  return (
    <Layout>
      <ProfileViewer username={params.username} />
    </Layout>
  )
}

