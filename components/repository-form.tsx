"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/utils/use-translation"
import { useAuth } from "@/utils/auth-context"

interface RepositoryFormProps {
  onSubmit: (data: RepositoryData) => void
  onCancel: () => void
}

export interface RepositoryData {
  name: string
  description?: string
  isPrivate: boolean
  initializeWithReadme: boolean
  gitignoreTemplate: string
  license: string
}

export function RepositoryForm({ onSubmit, onCancel }: RepositoryFormProps) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [formData, setFormData] = useState<RepositoryData>({
    name: "",
    description: "",
    isPrivate: false,
    initializeWithReadme: true,
    gitignoreTemplate: "none",
    license: "mit",
  })

  const gitignoreTemplates = [
    { value: "none", label: "None" },
    { value: "node", label: "Node" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "react", label: "React" },
  ]

  const licenses = [
    { value: "none", label: "None" },
    { value: "mit", label: "MIT License" },
    { value: "apache", label: "Apache License 2.0" },
    { value: "gpl", label: "GNU GPL v3" },
    { value: "bsd", label: "BSD 3-Clause" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("create_new_repository")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label>{t("owner")}</Label>
              <span className="text-sm font-medium">{user?.username}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="repo-name">{t("repository_name")} *</Label>
              <Input
                id="repo-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder={t("repository_name_placeholder")}
              />
              <p className="text-sm text-muted-foreground">{t("repository_name_tip")}</p>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">{t("description")}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t("repository_description_placeholder")}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("visibility")}</Label>
            <RadioGroup
              value={formData.isPrivate ? "private" : "public"}
              onValueChange={(value) => setFormData({ ...formData, isPrivate: value === "private" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public">{t("public")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private">{t("private")}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>{t("initialize_repository")}</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="readme"
                  checked={formData.initializeWithReadme}
                  onCheckedChange={(checked) => setFormData({ ...formData, initializeWithReadme: checked as boolean })}
                />
                <Label htmlFor="readme">{t("add_readme")}</Label>
              </div>
              <p className="text-sm text-muted-foreground pl-6">{t("readme_description")}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gitignore">{t("add_gitignore")}</Label>
              <Select
                value={formData.gitignoreTemplate}
                onValueChange={(value) => setFormData({ ...formData, gitignoreTemplate: value })}
              >
                <SelectTrigger id="gitignore">
                  <SelectValue placeholder={t("select_gitignore_template")} />
                </SelectTrigger>
                <SelectContent>
                  {gitignoreTemplates.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="license">{t("choose_license")}</Label>
              <Select value={formData.license} onValueChange={(value) => setFormData({ ...formData, license: value })}>
                <SelectTrigger id="license">
                  <SelectValue placeholder={t("select_license")} />
                </SelectTrigger>
                <SelectContent>
                  {licenses.map((license) => (
                    <SelectItem key={license.value} value={license.value}>
                      {license.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onCancel} type="button">
              {t("cancel")}
            </Button>
            <Button type="submit">{t("create_repository")}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

