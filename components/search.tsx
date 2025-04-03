"use client"

import { useState, useEffect, useRef } from "react"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import { useTranslation } from "@/utils/use-translation"
import { SearchResults } from "@/components/search-results"

interface SearchResult {
  id: string
  type: "user" | "workspace"
  name: string
  avatar?: string
  description?: string
}

export function Search() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    if (searchTerm.length > 1) {
      // Simular una llamada a la API para obtener resultados
      // En una implementación real, esto sería una llamada a tu backend
      const fakeApiCall = setTimeout(() => {
        const fakeResults: SearchResult[] = [
          { id: "1", type: "user", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
          { id: "2", type: "user", name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
          { id: "3", type: "workspace", name: "Project Alpha", description: "A workspace for Project Alpha" },
          { id: "4", type: "workspace", name: "Team Beta", description: "Team Beta's collaborative space" },
        ].filter(
          (result) =>
            result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (result.description && result.description.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        setResults(fakeResults)
      }, 300)

      return () => clearTimeout(fakeApiCall)
    } else {
      setResults([])
    }
  }, [searchTerm])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">{t("search_placeholder")}</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={t("search_users_and_workspaces")}
          value={searchTerm}
          onValueChange={handleSearchChange}
          ref={searchInputRef}
        />
        <CommandList>
          <CommandEmpty>{t("no_results")}</CommandEmpty>
          <SearchResults results={results} />
        </CommandList>
      </CommandDialog>
    </>
  )
}

