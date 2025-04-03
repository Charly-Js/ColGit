"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/utils/use-translation"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

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

interface ProfileCustomizationProps {
  isOwnProfile: boolean
  initialData?: ProfileData
  onSave?: (data: ProfileData) => void
}

export function ProfileCustomization({ isOwnProfile, initialData, onSave }: ProfileCustomizationProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>(
    initialData || {
      coverImage: "",
      profilePicture: "",
      displayName: "",
      username: "",
      bio: "",
      location: "",
      professionalTitle: "",
      email: "",
      phone: "",
      website: "",
      socialLinks: {
        github: "",
        linkedin: "",
        twitter: "",
      },
      isPrivate: false,
      showEmail: true,
      showPhone: false,
      theme: "default",
    },
  )

  const handleSave = () => {
    // Here you would typically save to your backend
    onSave?.(profileData)
    toast({
      title: t("profile_customization_saved"),
      description: t("profile_customization_saved_description"),
    })
    setIsOpen(false)
  }

  const handleImageUpload = (type: "cover" | "profile") => {
    // Here you would typically implement image upload functionality
    console.log(`Uploading ${type} image`)
  }

  if (!isOwnProfile) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{t("customize_profile")}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("customize_your_profile")}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">{t("basic_info")}</TabsTrigger>
            <TabsTrigger value="appearance">{t("appearance")}</TabsTrigger>
            <TabsTrigger value="social">{t("social_links")}</TabsTrigger>
            <TabsTrigger value="privacy">{t("privacy")}</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">{t("display_name")}</Label>
                  <Input
                    id="displayName"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                    placeholder={t("enter_display_name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">{t("username")}</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    placeholder={t("enter_username")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">{t("bio")}</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder={t("enter_bio")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t("location")}</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    placeholder={t("enter_location")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="professionalTitle">{t("professional_title")}</Label>
                  <Input
                    id="professionalTitle"
                    value={profileData.professionalTitle}
                    onChange={(e) => setProfileData({ ...profileData, professionalTitle: e.target.value })}
                    placeholder={t("enter_professional_title")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <Label>{t("profile_picture")}</Label>
                    <div className="mt-2 flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={profileData.profilePicture} />
                        <AvatarFallback>{profileData.displayName?.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <Button onClick={() => handleImageUpload("profile")}>{t("change_picture")}</Button>
                    </div>
                  </div>
                  <div>
                    <Label>{t("cover_image")}</Label>
                    <div className="mt-2">
                      <div className="relative h-40 w-full overflow-hidden rounded-lg border">
                        {profileData.coverImage ? (
                          <img
                            src={profileData.coverImage || "/placeholder.svg"}
                            alt={t("cover_image")}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-muted">{t("no_cover_image")}</div>
                        )}
                      </div>
                      <Button className="mt-2" onClick={() => handleImageUpload("cover")}>
                        {t("change_cover")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="website">{t("website")}</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    placeholder={t("enter_website")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">{t("github_profile")}</Label>
                  <Input
                    id="github"
                    value={profileData.socialLinks.github}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        socialLinks: { ...profileData.socialLinks, github: e.target.value },
                      })
                    }
                    placeholder={t("enter_github_profile")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">{t("linkedin_profile")}</Label>
                  <Input
                    id="linkedin"
                    value={profileData.socialLinks.linkedin}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        socialLinks: { ...profileData.socialLinks, linkedin: e.target.value },
                      })
                    }
                    placeholder={t("enter_linkedin_profile")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">{t("twitter_profile")}</Label>
                  <Input
                    id="twitter"
                    value={profileData.socialLinks.twitter}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        socialLinks: { ...profileData.socialLinks, twitter: e.target.value },
                      })
                    }
                    placeholder={t("enter_twitter_profile")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("private_profile")}</Label>
                    <CardDescription>{t("private_profile_description")}</CardDescription>
                  </div>
                  <Switch
                    checked={profileData.isPrivate}
                    onCheckedChange={(checked) => setProfileData({ ...profileData, isPrivate: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("show_email")}</Label>
                    <CardDescription>{t("show_email_description")}</CardDescription>
                  </div>
                  <Switch
                    checked={profileData.showEmail}
                    onCheckedChange={(checked) => setProfileData({ ...profileData, showEmail: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("show_phone")}</Label>
                    <CardDescription>{t("show_phone_description")}</CardDescription>
                  </div>
                  <Switch
                    checked={profileData.showPhone}
                    onCheckedChange={(checked) => setProfileData({ ...profileData, showPhone: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder={t("enter_email")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder={t("enter_phone")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSave}>{t("save_changes")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

