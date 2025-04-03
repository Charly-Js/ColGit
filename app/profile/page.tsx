"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/utils/use-translation"
import { useAuth } from "@/utils/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfileFollowers } from "@/components/profile-followers"
import { ProfileWorkspaces } from "@/components/profile-workspaces"
import { ProfileGroups } from "@/components/profile-groups"
import { ProfileContacts } from "@/components/profile-contacts"
import { ProfileConnections } from "@/components/profile-connections"
import { ProfileInterests } from "@/components/profile-interests"
import { ActivityHeatmap } from "@/components/activity-heatmap"
import { ProfileCustomization } from "@/components/profile-customization"
import { ProfileImageUploader } from "@/components/profile/ProfileImageUploader"

interface ProfileData {
  coverImage: string
  profilePicture: string
  displayName: string
  username: string
  bio: string
  location: string
  professionalTitle: string
  email: string
  phone: string
  website: string
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
  }
  isPrivate: boolean
  showEmail: boolean
  showPhone: boolean
  theme: string
}

export default function ProfilePage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("followers")
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  useEffect(() => {
    // Here you would typically fetch the profile data from your backend
    // For now, we'll use mock data
    setProfileData({
      coverImage: "/placeholder.svg?height=200&width=800",
      profilePicture: "/avatars/01.png",
      displayName: "John Doe",
      username: user?.username || "",
      bio: "Software developer passionate about creating amazing user experiences",
      location: "San Francisco, CA",
      professionalTitle: "Senior Frontend Developer",
      email: "john@example.com",
      phone: "+1 234 567 890",
      website: "https://johndoe.dev",
      socialLinks: {
        github: "github.com/johndoe",
        linkedin: "linkedin.com/in/johndoe",
        twitter: "twitter.com/johndoe",
      },
      isPrivate: false,
      showEmail: true,
      showPhone: false,
      theme: "default",
    })
  }, [user])

  if (!user || !profileData) {
    return null
  }

  const handleProfileUpdate = (newData: ProfileData) => {
    // Here you would typically update the backend
    setProfileData(newData)
  }

  return (
    <Layout>
      <Card className="w-full max-w-4xl mx-auto">
        <div className="relative">
          <div className="h-48 overflow-hidden rounded-t-lg">
            <img src={profileData.coverImage || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
            <ProfileImageUploader
              type="cover"
              currentImage={profileData.coverImage || "/placeholder.svg"}
              onImageChange={(url) => setProfileData({ ...profileData, coverImage: url })}
            />
          </div>
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={profileData.profilePicture} alt={profileData.displayName} />
                <AvatarFallback>{profileData.displayName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <ProfileImageUploader
                type="avatar"
                currentImage={profileData.profilePicture}
                onImageChange={(url) => setProfileData({ ...profileData, profilePicture: url })}
              />
            </div>
          </div>
          <div className="absolute right-4 bottom-4">
            <ProfileCustomization isOwnProfile={true} initialData={profileData} onSave={handleProfileUpdate} />
          </div>
        </div>
        <CardHeader className="pt-20">
          <div className="space-y-1">
            <CardTitle className="text-2xl">{profileData.displayName}</CardTitle>
            <CardDescription>{profileData.professionalTitle}</CardDescription>
          </div>
          <div className="mt-2 space-y-1">
            {profileData.location && <p className="text-sm text-muted-foreground">📍 {profileData.location}</p>}
            {profileData.bio && <p className="text-sm">{profileData.bio}</p>}
          </div>
          {(profileData.showEmail || profileData.showPhone) && (
            <div className="mt-4 space-y-1">
              {profileData.showEmail && <p className="text-sm">✉️ {profileData.email}</p>}
              {profileData.showPhone && <p className="text-sm">📱 {profileData.phone}</p>}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="followers" onValueChange={setActiveTab}>
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
        </CardContent>
      </Card>
    </Layout>
  )
}

