"use client"

import type React from "react"

/**
 * Componente de formulario de registro mejorado
 * Permite a los usuarios registrarse con email/contraseña o con proveedores externos
 * Incluye validación de campos y feedback visual
 */

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthAdapter } from "@/adapters/auth/useAuthAdapter"
import { useTranslation } from "@/utils/translations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Github, Mail, User, Lock, AlertCircle, Check, Loader2 } from "lucide-react"

export default function RegisterForm() {
  const { t } = useTranslation()
  const router = useRouter()
  const { signUp, signInWithGoogle, signInWithGithub, loading, error } = useAuthAdapter()

  // Estados para el formulario
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Función para validar el formulario
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.username.trim()) {
      errors.username = t("usernameRequired")
    } else if (formData.username.length < 3) {
      errors.username = t("usernameLength")
    }

    if (!formData.email.trim()) {
      errors.email = t("emailRequired")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t("emailInvalid")
    }

    if (!formData.fullName.trim()) {
      errors.fullName = t("fullNameRequired")
    }

    if (!formData.password) {
      errors.password = t("passwordRequired")
    } else if (formData.password.length < 8) {
      errors.password = t("passwordLength")
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = t("passwordStrength")
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t("passwordsDoNotMatch")
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Manejador de cambios en los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error del campo cuando el usuario escribe
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Manejador de envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (!validateForm()) {
      return
    }

    try {
      const response = await signUp(
        { email: formData.email, password: formData.password, provider: "email" },
        { username: formData.username, fullName: formData.fullName },
      )

      if (response.success) {
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("Error al registrar:", err)
    }
  }

  // Manejadores para autenticación con proveedores externos
  const handleGoogleSignIn = async () => {
    const response = await signInWithGoogle()
    if (response.success) {
      router.push("/dashboard")
    }
  }

  const handleGithubSignIn = async () => {
    const response = await signInWithGithub()
    if (response.success) {
      router.push("/dashboard")
    }
  }

  // Función para renderizar el estado de validación de un campo
  const renderFieldStatus = (fieldName: string) => {
    if (!formSubmitted) return null

    if (formErrors[fieldName]) {
      return (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
          <AlertCircle size={16} />
        </div>
      )
    }

    if (formData[fieldName as keyof typeof formData]) {
      return (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
          <Check size={16} />
        </div>
      )
    }

    return null
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t("createAccount")}</CardTitle>
        <CardDescription className="text-center">{t("registerDescription")}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Botones de proveedores externos */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" onClick={handleGoogleSignIn} disabled={loading} className="w-full">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>

            <Button variant="outline" type="button" onClick={handleGithubSignIn} disabled={loading} className="w-full">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t("orContinueWith")}</span>
            </div>
          </div>

          {/* Formulario de registro */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de nombre completo */}
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("fullName")}</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <User size={16} />
                </div>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`pl-10 ${formErrors.fullName ? "border-red-500" : ""}`}
                  placeholder={t("fullNamePlaceholder")}
                />
                {renderFieldStatus("fullName")}
              </div>
              {formErrors.fullName && <p className="text-sm text-red-500">{formErrors.fullName}</p>}
            </div>

            {/* Campo de nombre de usuario */}
            <div className="space-y-2">
              <Label htmlFor="username">{t("username")}</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <User size={16} />
                </div>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`pl-10 ${formErrors.username ? "border-red-500" : ""}`}
                  placeholder={t("usernamePlaceholder")}
                />
                {renderFieldStatus("username")}
              </div>
              {formErrors.username && <p className="text-sm text-red-500">{formErrors.username}</p>}
            </div>

            {/* Campo de email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail size={16} />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 ${formErrors.email ? "border-red-500" : ""}`}
                  placeholder={t("emailPlaceholder")}
                />
                {renderFieldStatus("email")}
              </div>
              {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock size={16} />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 ${formErrors.password ? "border-red-500" : ""}`}
                  placeholder={t("passwordPlaceholder")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}

              {/* Indicador de fortaleza de contraseña */}
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    <div
                      className={`h-1 flex-1 rounded-full ${formData.password.length >= 8 ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <div
                      className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <div
                      className={`h-1 flex-1 rounded-full ${/[a-z]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <div
                      className={`h-1 flex-1 rounded-full ${/\d/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{t("passwordRequirements")}</p>
                </div>
              )}
            </div>

            {/* Campo de confirmación de contraseña */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock size={16} />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`pl-10 ${formErrors.confirmPassword ? "border-red-500" : ""}`}
                  placeholder={t("confirmPasswordPlaceholder")}
                />
              </div>
              {formErrors.confirmPassword && <p className="text-sm text-red-500">{formErrors.confirmPassword}</p>}
            </div>

            {/* Mensaje de error general */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Botón de envío */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("creating")}
                </>
              ) : (
                t("createAccount")
              )}
            </Button>
          </form>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          {t("alreadyHaveAccount")}{" "}
          <a href="/login" className="text-primary font-medium hover:underline">
            {t("signIn")}
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}

