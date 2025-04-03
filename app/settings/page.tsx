"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { LANGUAGES, type Language } from "@/utils/translations"
import { useTranslation } from "@/utils/use-translation"

export default function SettingsPage() {
  const { t, setLanguage, language } = useTranslation()
  const [theme, setTheme] = useState("light")
  const [notificationPreference, setNotificationPreference] = useState("all")

  const handleSave = () => {
    // Here you would typically save these settings to your backend
    console.log({ language, theme, notificationPreference })
    toast({
      title: t("settings_saved"),
      description: t("settings_saved_description"),
    })
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">{t("personalization")}</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("language")}</CardTitle>
            <CardDescription>{t("choose_language")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("select_language")} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(LANGUAGES).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("theme")}</CardTitle>
            <CardDescription>{t("choose_theme")}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={setTheme}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">{t("light")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">{t("dark")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system">{t("system")}</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("notification_preferences")}</CardTitle>
            <CardDescription>{t("choose_notification_preferences")}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={notificationPreference} onValueChange={setNotificationPreference}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">{t("all_notifications")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="important" id="important" />
                <Label htmlFor="important">{t("important_notifications")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none">{t("no_notifications")}</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Button onClick={handleSave}>{t("save")}</Button>
      </div>
    </Layout>
  )
}

