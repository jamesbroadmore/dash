import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeKey = 'all' | 'male' | 'female' | 'trans'

type ThemeContextType = {
  theme: ThemeKey
  setTheme: (t: ThemeKey) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'companion_theme_v1'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeKey>('all')

  useEffect(() => {
    // read from storage
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeKey | null
      if (stored) setThemeState(stored)
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    // apply dataset to html element for CSS variables to use
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch (e) {
      // ignore
    }
  }, [theme])

  const setTheme = (t: ThemeKey) => setThemeState(t)

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}