import type { CSS } from "@/utils/stitches.config"

export type Theme = {
  name: string
  selector: string
  colors: {
    background: string
    foreground: string
    primary: {
      DEFAULT: string
      foreground: string
    }
    secondary: {
      DEFAULT: string
      foreground: string
    }
    muted: {
      DEFAULT: string
      foreground: string
    }
    accent: {
      DEFAULT: string
      foreground: string
    }
    popover: {
      DEFAULT: string
      foreground: string
    }
    card: {
      DEFAULT: string
      foreground: string
    }
  }
}

export const createTheme = (theme: Theme): CSS => ({
  [`html[class~="${theme.selector.replace("html[class~=", "").replace("]", "")}"]`]: {
    "--background": theme.colors.background,
    "--foreground": theme.colors.foreground,
    "--primary": theme.colors.primary.DEFAULT,
    "--primary-foreground": theme.colors.primary.foreground,
    "--secondary": theme.colors.secondary.DEFAULT,
    "--secondary-foreground": theme.colors.secondary.foreground,
    "--muted": theme.colors.muted.DEFAULT,
    "--muted-foreground": theme.colors.muted.foreground,
    "--accent": theme.colors.accent.DEFAULT,
    "--accent-foreground": theme.colors.accent.foreground,
    "--popover": theme.colors.popover.DEFAULT,
    "--popover-foreground": theme.colors.popover.foreground,
    "--card": theme.colors.card.DEFAULT,
    "--card-foreground": theme.colors.card.foreground,
  },
})

