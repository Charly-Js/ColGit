"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/utils/use-translation"
import { Lock, Mail, MapPin, Briefcase, Calendar, ExternalLink } from "lucide-react"
import { ProfileFollowers } from "@/components/profile-followers"
import { ProfileWorkspaces } from "@/components/profile-workspaces"
import { ProfileGroups } from "@/components/profile-groups"
import { ProfileContacts } from "@/components/profile-contacts"
import { ProfileConnections } from "@/components/profile-connections"
import { ProfileInterests } from "@/components/profile-interests"
import { ActivityHeatmap } from "@/components/activity-heatmap"

interface ProfileData {
  id: string
  username: string
  displayName: string
  avatar: string
  coverImage: string
  bio: string
  location: string
  professionalTitle: string
  email: string
  website: string
  joinDate: string
  isPublic: boolean
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
  }
}

interface ProfileViewerProps {
  username: string
}

export function ProfileViewer({ username }: ProfileViewerProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate loading and then return mock data
    setLoading(true)

    setTimeout(() => {
      // Mock data - in a real app, this would come from your API
      const mockProfile: ProfileData = {
        id: "user-123",
        username: username,
        displayName:
          username === "alice"
            ? "Alice Johnson"
            : username === "bob"
              ? "Bob Smith"
              : `${username.charAt(0).toUpperCase()}${username.slice(1)}`,
        avatar: "/placeholder.svg?height=128&width=128",
        coverImage: "/placeholder.svg?height=300&width=1200",
        bio: username === "private_user" ? "" : "Software developer passionate about creating amazing user experiences",
        location: username === "private_user" ? "" : "San Francisco, CA",
        professionalTitle: username === "private_user" ? "" : "Senior Frontend Developer",
        email: username === "private_user" ? "" : "user@example.com",
        website: username === "private_user" ? "" : "https://example.com",
        joinDate: "January 2023",
        isPublic: username !== "private_user",
        socialLinks: {
          github: username === "private_user" ? "" : "github.com/user",
          linkedin: username === "private_user" ? "" : "linkedin.com/in/user",
          twitter: username === "private_user" ? "" : "twitter.com/user",
        },
      }

      setProfile(mockProfile)
      setLoading(false)
    }, 1000)
  }, [username])

  const toggleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{t("error")}</h2>
        <p>{error}</p>
        <Button onClick={() => router.back()} className="mt-4">
          {t("go_back")}
        </Button>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">{t("user_not_found")}</h2>
        <p>{t("user_not_found_description")}</p>
        <Button onClick={() => router.back()} className="mt-4">
          {t("go_back")}
        </Button>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <div className="h-48 overflow-hidden rounded-t-lg">
          <img src={profile.coverImage || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-16 left-8">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={profile.avatar} alt={profile.displayName} />
            <AvatarFallback>{profile.displayName.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardContent className="pt-20">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{profile.displayName}</h1>
              {!profile.isPublic && (
                <Badge variant="secondary">
                  <Lock className="mr-1 h-3 w-3" />
                  {t("private_profile")}
                </Badge>
              )}
            </div>
            {profile.professionalTitle && <p className="text-muted-foreground">{profile.professionalTitle}</p>}
          </div>

          <Button variant={isFollowing ? "outline" : "default"} onClick={toggleFollow}>
            {isFollowing ? t("unfollow") : t("follow")}
          </Button>
        </div>

        {profile.isPublic ? (
          <div className="mt-6 space-y-4">
            {profile.bio && <p>{profile.bio}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {profile.location && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.professionalTitle && (
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>{profile.professionalTitle}</span>
                  </div>
                )}
                {profile.joinDate && (
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{t("member_since", { date: profile.joinDate })}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {profile.email && (
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-center text-muted-foreground">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {profile.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <Tabs defaultValue="followers">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
                <TabsTrigger value="followers">{t("followers")}</TabsTrigger>
                <TabsTrigger value="workspaces">{t("workspaces")}</TabsTrigger>
                <TabsTrigger value="groups">{t("groups")}</TabsTrigger>
                <TabsTrigger value="contacts">{t("contacts")}</TabsTrigger>
                <TabsTrigger value="connections">{t("connections")}</TabsTrigger>
                <TabsTrigger value="interests">{t("interests")}</TabsTrigger>
                <TabsTrigger value="activity">{t("activity")}</TabsTrigger>
              </TabsList>
              <TabsContent value="followers">
                <ProfileFollowers />
              </TabsContent>
              <TabsContent value="workspaces">
                <ProfileWorkspaces />
              </TabsContent>
              <TabsContent value="groups">
                <ProfileGroups />
              </TabsContent>
              <TabsContent value="contacts">
                <ProfileContacts />
              </TabsContent>
              <TabsContent value="connections">
                <ProfileConnections />
              </TabsContent>
              <TabsContent value="interests">
                <ProfileInterests />
              </TabsContent>
              <TabsContent value="activity">
                <ActivityHeatmap />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="mt-6 p-8 text-center">
            <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t("private_profile")}</h2>
            <p className="text-muted-foreground">{t("private_profile_description")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

