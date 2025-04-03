"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/utils/use-translation"
import Link from "next/link"

export function ProfileFollowers() {
  const { t } = useTranslation()
  const [followers, setFollowers] = useState([
    { id: "1", name: "Alice Johnson", avatar: "/avatars/01.png" },
    { id: "2", name: "Bob Smith", avatar: "/avatars/02.png" },
    { id: "3", name: "Carol Williams", avatar: "/avatars/03.png" },
  ])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("followers")}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {followers.map((follower) => (
          <div key={follower.id} className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={follower.avatar} alt={follower.name} />
              <AvatarFallback>{follower.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{follower.name}</p>
              <Link href={`/profile/${follower.name.toLowerCase().replace(" ", "-")}`}>
                <Button variant="link" className="p-0">
                  {t("view_profile")}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

