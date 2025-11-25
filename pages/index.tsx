import React from 'react'
import { Header } from '../components/Header'
import { FilterPanel } from '../components/FilterPanel'
import { useRouter } from 'next/router'

const mockItems = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Community Post ${i + 1}`,
  category: i % 3 === 0 ? 'care' : i % 3 === 1 ? 'training' : 'support',
  tags: i % 2 === 0 ? ['health', 'advice'] : ['social'],
}))

export default function Home() {
  const router = useRouter()
  // naive filter demo based on URL query
  const { q, category } = router.query
  const items = mockItems.filter((it) => {
    if (q && !it.title.toLowerCase().includes(String(q).toLowerCase())) return false
    if (category && it.category !== category) return false
    return true
  })

  return (
    <div>
      <Header />
      <main className="container main-grid">
        <FilterPanel />
        <section className="content">
          <h1>Welcome to CompanionWell</h1>
          <p>Find community posts, resources, and events centered on companion wellbeing.</p>

          <div className="list">
            {items.map((it) => (
              <article key={it.id} className="card">
                <h3>{it.title}</h3>
                <p>Category: {it.category}</p>
                <div className="tags">
                  {it.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}