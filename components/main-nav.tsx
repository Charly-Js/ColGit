import Link from "next/link"
import { useTranslation } from "@/utils/use-translation"

export function MainNav() {
  const { t } = useTranslation()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        {t("home")}
      </Link>
      <Link href="/calendar" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        {t("calendar")}
      </Link>
      <Link
        href="/repository"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t("repository")}
      </Link>
      <Link
        href="/codespace"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t("codespace")}
      </Link>
      <Link href="/upload" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        {t("upload")}
      </Link>
      <Link
        href="/communities"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t("communities")}
      </Link>
      <Link
        href="/my-repository"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t("my_repository")}
      </Link>
      <Link href="/activity" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        {t("my_activity")}
      </Link>
    </nav>
  )
}

