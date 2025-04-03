import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { TranslationProvider } from "@/utils/use-translation"
import { AuthProvider } from "@/utils/auth-context"
import AuthenticatedLayout from "@/components/authenticated-layout"
import { ChatButton } from "@/components/chat-button"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ColGit",
  description: "Your all-in-one solution for version control, project management, and collaboration.",
    generator: 'v0.dev'
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password"

  return (
    <AuthProvider>
      <AuthenticatedLayout>
        {children}
        {!isAuthPage && <ChatButton />}
      </AuthenticatedLayout>
    </AuthProvider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TranslationProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </TranslationProvider>
      </body>
    </html>
  )
}



import './globals.css'