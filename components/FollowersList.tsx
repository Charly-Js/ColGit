import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Follower {
  id: string
  name: string
  username: string
  avatar: string
}

interface FollowersListProps {
  followers: Follower[]
}

export function FollowersList({ followers }: FollowersListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {followers.map((follower) => (
        <Card key={follower.id} className="p-4 bg-gray-900">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={follower.avatar} alt={follower.name} />
              <AvatarFallback>{follower.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{follower.name}</h3>
              <Link href={`/profile/${follower.username}`} passHref>
                <Button variant="link" className="h-auto p-0 text-primary">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

