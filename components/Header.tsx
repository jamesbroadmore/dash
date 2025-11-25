import React, { useState } from 'react'
import Link from 'next/link'
import { Button3D } from './Button3D'
import { useTheme, ThemeKey } from './ThemeProvider'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/community', label: 'Community' },
  { href: '/resources', label: 'Resources' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
]

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const setThemeKey = (k: ThemeKey) => () => setTheme(k)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <Link href="/"><a className="brand-link">CompanionWell</a></Link>
        </div>

        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Main navigation">
          <ul className="nav-list">
            {NAV.map((item) => (
              <li key={item.href} className="nav-item">
                <Link href={item.href}>
                  <a>
                    <Button3D label={item.label} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="theme-controls" role="region" aria-label="Theme controls">
            <span className="theme-label">Theme</span>
            <div className="theme-buttons">
              <button className={`pill ${theme === 'male' ? 'active' : ''}`} onClick={setThemeKey('male')}>Male</button>
              <button className={`pill ${theme === 'female' ? 'active' : ''}`} onClick={setThemeKey('female')}>Female</button>
              <button className={`pill ${theme === 'trans' ? 'active' : ''}`} onClick={setThemeKey('trans')}>Trans</button>
              <button className={`pill ${theme === 'all' ? 'active' : ''}`} onClick={setThemeKey('all')}>All</button>
            </div>
          </div>
        </nav>

        <button
          className="hamburger"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((s) => !s)}
        >
          <svg width="24" height="24" aria-hidden>
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  )
}