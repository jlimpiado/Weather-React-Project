import React from "react"

interface ThemeInterface {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>
}

interface ThemeProviderInterface {
  children: JSX.Element
}

export const ThemeContext = React.createContext<ThemeInterface | null>(null)

export default function ThemeProvider({ children }: ThemeProviderInterface): JSX.Element {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark")

  const setAppTheme = (appTheme: "dark" | "light") => {
    const root = window.document.documentElement
    const isDark = appTheme === "dark"

    root.classList.remove(isDark ? "light" : "dark")
    root.classList.add(appTheme)
  }

  React.useEffect(() => {
    setAppTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
