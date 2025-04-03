"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitBranch, GitCommit, GitMerge, Github, Upload } from "lucide-react"
import { useTranslation } from "@/utils/use-translation"
import { toast } from "@/components/ui/use-toast"
import { RepositorySelector } from "@/components/repository-selector"
import { AIDebugger } from "@/components/ai-debugger"
import { RepositoryForm, type RepositoryData } from "@/components/repository-form"
import { FileHistory } from "@/components/file-history"

interface Repository {
  id: string
  name: string
  description?: string
  isPrivate: boolean
}

interface FileVersion {
  id: string
  date: string
  author: string
  message: string
}

export function IntegratedRepositoryManager() {
  const { t } = useTranslation()
  const [commitMessage, setCommitMessage] = useState("")
  const [branchName, setBranchName] = useState("")
  const [activity, setActivity] = useState<string[]>([])
  const [selectedRepository, setSelectedRepository] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [fileVersions, setFileVersions] = useState<FileVersion[]>([])
  const [showNewRepoForm, setShowNewRepoForm] = useState(false)
  const [repositories, setRepositories] = useState<Repository[]>([])

  const handleCreateRepository = (data: RepositoryData) => {
    const newRepo: Repository = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      isPrivate: data.isPrivate,
    }
    setRepositories([...repositories, newRepo])
    setActivity([`${t("repository_created")}: ${data.name}`, ...activity])
    setShowNewRepoForm(false)
    setSelectedRepository(newRepo.id)
    toast({
      title: t("repository_created"),
      description: t("repository_created_description"),
    })
  }

  const handleRepositorySelect = (repoId: string) => {
    setSelectedRepository(repoId)
    setActivity([`${t("repository_selected")}: ${repoId}`, ...activity])
  }

  const handleCommit = () => {
    if (!selectedRepository) {
      toast({
        title: t("no_repository_selected"),
        description: t("please_select_repository"),
        variant: "destructive",
      })
      return
    }

    if (commitMessage.trim()) {
      setActivity([`${t("commit")}: ${commitMessage} (${t("repository")}: ${selectedRepository})`, ...activity])
      setCommitMessage("")
      toast({
        title: t("commit_successful"),
        description: t("changes_committed"),
      })
    } else {
      toast({
        title: t("commit_error"),
        description: t("enter_commit_message"),
        variant: "destructive",
      })
    }
  }

  const handleCreateBranch = () => {
    if (!selectedRepository) {
      toast({
        title: t("no_repository_selected"),
        description: t("please_select_repository"),
        variant: "destructive",
      })
      return
    }

    if (branchName.trim()) {
      setActivity([`${t("branch_created")}: ${branchName} (${t("repository")}: ${selectedRepository})`, ...activity])
      setBranchName("")
      toast({
        title: t("branch_created"),
        description: t("new_branch_created", { name: branchName }),
      })
    } else {
      toast({
        title: t("branch_error"),
        description: t("enter_branch_name"),
        variant: "destructive",
      })
    }
  }

  const handleMerge = () => {
    if (!selectedRepository) {
      toast({
        title: t("no_repository_selected"),
        description: t("please_select_repository"),
        variant: "destructive",
      })
      return
    }

    setActivity([`${t("merge_initiated")} (${t("repository")}: ${selectedRepository})`, ...activity])
    toast({
      title: t("merge_successful"),
      description: t("branches_merged"),
    })
  }

  const handleConnectGithub = () => {
    if (!selectedRepository) {
      toast({
        title: t("no_repository_selected"),
        description: t("please_select_repository"),
        variant: "destructive",
      })
      return
    }

    setActivity([`${t("github_connection_initiated")} (${t("repository")}: ${selectedRepository})`, ...activity])
    toast({
      title: t("github_connected"),
      description: t("github_connection_successful"),
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file.name)
      setActivity([`${t("file_selected")}: ${file.name}`, ...activity])
      // Simulate fetching file versions. Replace with actual backend call.
      setFileVersions([
        { id: "1", date: "2023-05-01 10:00", author: "User1", message: "Initial commit" },
        { id: "2", date: "2023-05-02 14:30", author: "User2", message: "Updated content" },
        { id: "3", date: "2023-05-03 09:15", author: "User1", message: "Fixed typo" },
      ])
    }
  }

  const handleUpload = () => {
    if (!selectedRepository) {
      toast({
        title: t("no_repository_selected"),
        description: t("please_select_repository"),
        variant: "destructive",
      })
      return
    }

    if (selectedFile) {
      setActivity([`${t("file_uploaded")}: ${selectedFile} (${t("repository")}: ${selectedRepository})`, ...activity])
      setSelectedFile(null)
      setFileVersions([])
      toast({
        title: t("upload_successful"),
        description: t("file_uploaded_successfully"),
      })
    } else {
      toast({
        title: t("upload_error"),
        description: t("select_file_to_upload"),
        variant: "destructive",
      })
    }
  }

  const handleDebug = (result: string) => {
    setActivity([`${t("debug_completed")} (${t("repository")}: ${selectedRepository})`, ...activity])
  }

  const handleRevert = (versionId: string) => {
    // Aquí iría la lógica para revertir a una versión anterior
    console.log(`Reverting to version ${versionId}`)
    toast({
      title: t("version_reverted"),
      description: t("file_reverted_to_previous_version"),
    })
  }

  return (
    <div className="space-y-4">
      {showNewRepoForm ? (
        <RepositoryForm onSubmit={handleCreateRepository} onCancel={() => setShowNewRepoForm(false)} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t("repository_management")}</CardTitle>
              <CardDescription>{t("select_or_create_repository")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RepositorySelector onRepositorySelect={handleRepositorySelect} />
              <Button className="w-full" onClick={() => setShowNewRepoForm(true)}>
                {t("create_new_repository")}
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("version_control")}</CardTitle>
              <CardDescription>{t("manage_your_code_versions")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder={t("enter_commit_message")}
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                />
                <Button className="w-full" onClick={handleCommit}>
                  <GitCommit className="mr-2 h-4 w-4" />
                  {t("commit_changes")}
                </Button>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder={t("enter_branch_name")}
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                />
                <Button className="w-full" onClick={handleCreateBranch}>
                  <GitBranch className="mr-2 h-4 w-4" />
                  {t("create_branch")}
                </Button>
              </div>
              <Button className="w-full" onClick={handleMerge}>
                <GitMerge className="mr-2 h-4 w-4" />
                {t("merge_changes")}
              </Button>
              <Button className="w-full" onClick={handleConnectGithub}>
                <Github className="mr-2 h-4 w-4" />
                {t("connect_to_github")}
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("file_upload")}</CardTitle>
              <CardDescription>{t("upload_files_to_repository")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="file" onChange={handleFileUpload} />
              <Button className="w-full" onClick={handleUpload}>
                <Upload className="mr-2 h-4 w-4" />
                {t("upload_file")}
              </Button>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("ai_debugger")}</CardTitle>
              <CardDescription>{t("debug_your_code")}</CardDescription>
            </CardHeader>
            <CardContent>
              <AIDebugger onDebugComplete={handleDebug} />
            </CardContent>
          </Card>
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>{t("recent_activity")}</CardTitle>
              <CardDescription>{t("your_recent_version_control_activity")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {activity.map((action, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{action}</p>
                        <p className="text-sm text-muted-foreground">{t("just_now")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          {selectedFile && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{t("file_details")}</CardTitle>
              </CardHeader>
              <CardContent>
                <FileHistory fileName={selectedFile} versions={fileVersions} onRevert={handleRevert} />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

