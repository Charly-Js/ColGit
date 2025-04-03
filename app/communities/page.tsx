"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { CommunityList } from "@/components/community-list"
import { CreateCommunityModal } from "@/components/create-community-modal"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/utils/use-translation"

export default function CommunitiesPage() {
  const { t } = useTranslation()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("developer_communities")}</h1>
          <Button onClick={() => setIsCreateModalOpen(true)}>{t("create_community")}</Button>
        </div>
        <CommunityList />
        <CreateCommunityModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      </div>
    </Layout>
  )
}

