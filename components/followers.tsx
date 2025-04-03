"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/utils/use-translation"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FollowerDetail } from "@/components/follower-detail"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface Follower {
  id: string
  name: string
  avatar: string
  isFollowing: boolean
  isPrivate: boolean
}

interface FollowersProps {
  isOwnProfile: boolean
}

export function Followers({ isOwnProfile }: FollowersProps) {
  const { t } = useTranslation()
  const [followers, setFollowers] = useState<Follower[]>([
    {
      id: "1",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      isFollowing: false,
      isPrivate: false,
    },
    { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32", isFollowing: true, isPrivate: true },
    {
      id: "3",
      name: "Carol Williams",
      avatar: "/placeholder.svg?height=32&width=32",
      isFollowing: false,
      isPrivate: false,
    },
  ])
  const [selectedFollower, setSelectedFollower] = useState<Follower | null>(null)

  const handleFollow = (id: string) => {
    setFollowers(
      followers.map((follower) =>
        follower.id === id ? { ...follower, isFollowing: !follower.isFollowing } : follower,
      ),
    )
    toast({
      title: t("follow_status_changed"),
      description: t("follow_status_changed_description"),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("followers")}</CardTitle>
        <CardDescription>{t("followers_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {followers.map((follower) => (
            <div key={follower.id} className="flex items-center justify-between mb-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setSelectedFollower(follower)}
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={follower.avatar} alt={follower.name} />
                      <AvatarFallback>{follower.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{follower.name}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <FollowerDetail follower={follower} />
                </DialogContent>
              </Dialog>
              {!isOwnProfile && (
                <Button
                  onClick={() => handleFollow(follower.id)}
                  variant={follower.isFollowing ? "outline" : "default"}
                  size="sm"
                >
                  {follower.isFollowing ? t("unfollow") : t("follow")}
                </Button>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

