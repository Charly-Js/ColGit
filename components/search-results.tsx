import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/utils/use-translation"

interface SearchResult {
  id: string
  type: "user" | "workspace"
  name: string
  avatar?: string
  description?: string
}

interface SearchResultsProps {
  results: SearchResult[]
}

export function SearchResults({ results }: SearchResultsProps) {
  const { t } = useTranslation()

  const userResults = results.filter((result) => result.type === "user")
  const workspaceResults = results.filter((result) => result.type === "workspace")

  return (
    <>
      {userResults.length > 0 && (
        <CommandGroup heading={t("users")}>
          {userResults.map((result) => (
            <CommandItem key={result.id} value={result.name}>
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={result.avatar} alt={result.name} />
                  <AvatarFallback>{result.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{result.name}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      )}
      {workspaceResults.length > 0 && (
        <CommandGroup heading={t("workspaces")}>
          {workspaceResults.map((result) => (
            <CommandItem key={result.id} value={result.name}>
              <div>
                <div>{result.name}</div>
                {result.description && <p className="text-sm text-muted-foreground">{result.description}</p>}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      )}
    </>
  )
}

