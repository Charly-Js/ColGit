"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/utils/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/utils/use-translation"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const success = await login(username, password)
    if (success) {
      router.push("/")
    } else {
      setError(t("invalid_credentials"))
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Features */}
      <div className="hidden w-1/2 lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9]">
        <div>
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Icons.git className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">{t("welcome_to_colgit")}</h1>
          <p className="text-lg text-white/80">{t("colgit_login_description")}</p>
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

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">{t("welcome_back")}</h2>
            <p className="mt-2 text-sm text-gray-400">{t("login_to_continue")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-400">
                {t("username")}
              </Label>
              <Input
                id="username"
                placeholder={t("enter_username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-400">
                {t("password")}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("enter_password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? t("hide_password") : t("show_password")}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-gray-400">
                  {t("remember_me")}
                </Label>
              </div>

              <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                {t("forgot_password")}
              </Link>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              {t("login")}
            </Button>

            <p className="text-center text-sm text-gray-400">
              {t("dont_have_account")}{" "}
              <Link href="/register" className="text-purple-400 hover:text-purple-300">
                {t("register_here")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

