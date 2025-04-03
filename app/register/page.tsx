"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/utils/use-translation"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { Icons } from "@/components/ui/icons"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    developerType: "",
    projectSize: "",
    useCase: "",
    termsAccepted: false,
  })
  const [error, setError] = useState("")
  const router = useRouter()
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.termsAccepted) {
      setError(t("must_accept_terms"))
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("passwords_dont_match"))
      return
    }

    // Aquí iría la lógica de registro
    console.log("Registering:", formData)
    router.push("/login")
  }

  const termsAndConditions = `
# ColGit Terms of Service

Last updated: February 16, 2024

[Terms content remains the same...]
`

  return (
    <div className="flex min-h-screen">
      {/* Left side - Features */}
      <div className="hidden w-1/2 lg:flex flex-col justify-between p-12 bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800">
        <div>
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Icons.git className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">{t("join_colgit_community")}</h1>
          <p className="text-lg text-white/80">{t("colgit_description")}</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icons.git className="w-4 h-4 text-white" />
              </div>
              <p className="text-white">{t("feature_version_control")}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icons.calendar className="w-4 h-4 text-white" />
              </div>
              <p className="text-white">{t("feature_project_management")}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icons.users className="w-4 h-4 text-white" />
              </div>
              <p className="text-white">{t("feature_collaboration")}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icons.code className="w-4 h-4 text-white" />
              </div>
              <p className="text-white">{t("feature_code_review")}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white/60 hover:text-white">
            <Icons.twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-white/60 hover:text-white">
            <Icons.github className="w-5 h-5" />
          </a>
          <a href="#" className="text-white/60 hover:text-white">
            <Icons.linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">{t("create_account")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("join_colgit_community")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">{t("username")}</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">{t("confirm_password")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>{t("developer_type")}</Label>
                <RadioGroup
                  value={formData.developerType}
                  onValueChange={(value) => setFormData({ ...formData, developerType: value })}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">{t("individual_developer")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team">{t("team_developer")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enterprise" id="enterprise" />
                    <Label htmlFor="enterprise">{t("enterprise_developer")}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>{t("project_size")}</Label>
                <Select
                  value={formData.projectSize}
                  onValueChange={(value) => setFormData({ ...formData, projectSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_project_size")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">{t("small_projects")}</SelectItem>
                    <SelectItem value="medium">{t("medium_projects")}</SelectItem>
                    <SelectItem value="large">{t("large_projects")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{t("primary_use_case")}</Label>
                <Select
                  value={formData.useCase}
                  onValueChange={(value) => setFormData({ ...formData, useCase: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_use_case")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">{t("personal_projects")}</SelectItem>
                    <SelectItem value="educational">{t("educational_use")}</SelectItem>
                    <SelectItem value="commercial">{t("commercial_use")}</SelectItem>
                    <SelectItem value="opensource">{t("opensource_projects")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
                  required
                />
                <Label htmlFor="terms">
                  {t("accept_terms_and_conditions")}{" "}
                  <Dialog>
                    <DialogTrigger className="text-primary hover:underline">{t("read_terms")}</DialogTrigger>
                    <DialogContent className="max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>{t("terms_and_conditions")}</DialogTitle>
                        <DialogDescription>{t("please_read_carefully")}</DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                        <div className="prose prose-sm dark:prose-invert">
                          <div dangerouslySetInnerHTML={{ __html: termsAndConditions.replace(/\n/g, "<br />") }} />
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </Label>
              </div>

              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{t("liability_warning")}</AlertDescription>
              </Alert>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full">
              {t("create_account")}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {t("already_have_account")}{" "}
              <Link href="/login" className="text-primary hover:text-primary/90">
                {t("login_here")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

