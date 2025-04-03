"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/utils/use-translation"
import { Camera, Upload, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ProfileImageUploaderProps {
  type: "avatar" | "cover"
  currentImage: string
  onImageChange: (imageUrl: string) => void
}

export function ProfileImageUploader({ type, currentImage, onImageChange }: ProfileImageUploaderProps) {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
      setError(t("only_jpg_png_allowed"))
      return
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      setError(t("file_too_large"))
      return
    }

    setError(null)
    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)
  }

  const handleUpload = () => {
    if (!selectedImage) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      onImageChange(selectedImage)
      setIsUploading(false)
      setIsOpen(false)

      toast({
        title: t("image_updated"),
        description: type === "avatar" ? t("profile_picture_updated") : t("cover_image_updated"),
      })
    }, 1500)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const clearSelectedImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`
            ${type === "avatar" ? "absolute bottom-0 right-0 rounded-full" : "absolute top-4 right-4"}
          `}
        >
          <Camera className="h-4 w-4 mr-2" />
          {type === "avatar" ? t("change_profile_picture") : t("change_cover")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type === "avatar" ? t("update_profile_picture") : t("update_cover_image")}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">{t("upload")}</TabsTrigger>
            <TabsTrigger value="preview">{t("preview")}</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="py-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={triggerFileInput}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">{t("drag_drop_or_click")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("jpg_png_only")} • {t("max_2mb")}
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              {selectedImage && (
                <div className="relative">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Selected"
                    className={`
                      ${
                        type === "avatar"
                          ? "w-32 h-32 rounded-full object-cover"
                          : "w-full h-32 object-cover rounded-lg"
                      }
                    `}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={clearSelectedImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <Button onClick={handleUpload} disabled={!selectedImage || isUploading} className="w-full">
                {isUploading ? t("uploading") : t("upload")}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="py-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">{t("current_image")}</p>
              </div>

              <img
                src={currentImage || "/placeholder.svg"}
                alt="Current"
                className={`
                  ${type === "avatar" ? "w-32 h-32 rounded-full object-cover" : "w-full h-32 object-cover rounded-lg"}
                `}
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

