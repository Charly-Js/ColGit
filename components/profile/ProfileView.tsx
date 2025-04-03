import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, Mail, MapPin, Users } from "lucide-react"

interface ProfileViewProps {
  user: {
    id: string
    name: string
    username: string
    avatar: string
    jobTitle: string
    location: string
    bio: string
    email: string
    isPublic: boolean
  }
}

export default function ProfileView({ user }: ProfileViewProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner Image */}
      <div className="relative h-48 w-full bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute -bottom-12 left-8">
          <Avatar className="h-24 w-24 border-4 border-black">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-8 pt-16">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {!user.isPublic && (
                <Badge variant="secondary">
                  <Lock className="mr-1 h-3 w-3" />
                  Private
                </Badge>
              )}
            </div>
            <p className="text-gray-400">{user.jobTitle}</p>
          </div>
          {user.isPublic && (
            <Button variant="secondary">
              <Users className="mr-2 h-4 w-4" />
              Follow
            </Button>
          )}
        </div>

        {user.isPublic ? (
          <div className="mt-4 space-y-2">
            {user.location && (
              <p className="flex items-center text-gray-400">
                <MapPin className="mr-2 h-4 w-4" />
                {user.location}
              </p>
            )}
            {user.email && (
              <p className="flex items-center text-gray-400">
                <Mail className="mr-2 h-4 w-4" />
                {user.email}
              </p>
            )}
            <p className="mt-4">{user.bio}</p>
          </div>
        ) : (
          <p className="mt-4 text-gray-400">This profile is private</p>
        )}

        {/* Tabs */}
        <Tabs defaultValue="followers" className="mt-8">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Example Follower Card */}
              <Card className="p-4 bg-gray-900">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Alice Johnson</h3>
                    <Button variant="link" className="h-auto p-0 text-primary">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Other tab contents would go here */}
        </Tabs>
      </div>
    </div>
  )
}

