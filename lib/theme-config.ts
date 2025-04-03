import { createTheme } from "@/components/ui/themes"

export const darkTheme = createTheme({
  name: "dark-theme",
  selector: "html[class~='dark']",
  colors: {
    background: "hsl(240 10% 4%)",
    foreground: "hsl(0 0% 100%)",
    primary: {
      DEFAULT: "hsl(265 89% 78%)",
      foreground: "hsl(0 0% 0%)",
    },
    secondary: {
      DEFAULT: "hsl(217 91% 60%)",
      foreground: "hsl(0 0% 100%)",
    },
    muted: {
      DEFAULT: "hsl(240 10% 8%)",
      foreground: "hsl(240 5% 65%)",
    },
    accent: {
      DEFAULT: "hsl(265 89% 78%)",
      foreground: "hsl(0 0% 0%)",
    },
    popover: {
      DEFAULT: "hsl(240 10% 4%)",
      foreground: "hsl(0 0% 100%)",
    },
    card: {
      DEFAULT: "hsl(240 10% 4%)",
      foreground: "hsl(0 0% 100%)",
    },
  },
})

