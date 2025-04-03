import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { OnlineIndicator } from "@/components/online-indicator"
import { Search } from "@/components/search"
import { Notifications } from "@/components/notifications"
import type React from "react" // Added import for React

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-indigo-950 to-purple-950">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <MainNav />
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Search />
            </div>
            <Notifications />
            <OnlineIndicator />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="container max-w-screen-2xl py-6 md:py-10">{children}</main>
      <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <p className="text-sm text-muted-foreground">Developed by YouBriefSoft</p>
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
        </div>
      </footer>
    </div>
  )
}

