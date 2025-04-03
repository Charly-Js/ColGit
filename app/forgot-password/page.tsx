"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/utils/use-translation"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your backend to handle password reset
    // For now, we'll just simulate a successful request
    setMessage(t("password_reset_sent"))
    setTimeout(() => {
      router.push("/login")
    }, 3000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-indigo-950 to-purple-950">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{t("forgot_password")}</CardTitle>
          <CardDescription>{t("enter_email_for_reset")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder={t("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {message && <p className="text-green-500">{message}</p>}
            <Button type="submit" className="w-full">
              {t("reset_password")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline">
                {t("back_to_login")}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

