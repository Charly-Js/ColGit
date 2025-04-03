"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MessageCircle, Bell, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import ChatInterface from "./chat/ChatInterface"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img src="/logo.svg" alt="ColGit Logo" className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">ColGit</span>
          </Link>
          <div className="flex flex-1 items-center space-x-2">
            <Input
              type="search"
              placeholder="Search..."
              className="h-8 w-[150px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </button>
          </div>
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Chat</span>
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </button>
          </nav>
        </div>
      </header>
      {isChatOpen && <ChatInterface />}
    </>
  )
}

