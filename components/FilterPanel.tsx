import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type Filters = {
  q?: string
  category?: string
  tags?: string[]
  location?: string
  sort?: 'newest' | 'popular'
}

export const FilterPanel: React.FC = () => {
  const router = useRouter()
  const [local, setLocal] = useState<Filters>({})

  useEffect(() => {
    const { q, category, tags, location, sort } = router.query
    setLocal({
      q: typeof q === 'string' ? q : undefined,
      category: typeof category === 'string' ? category : undefined,
      tags: typeof tags === 'string' ? tags.split(',') : undefined,
      location: typeof location === 'string' ? location : undefined,
      sort: typeof sort === 'string' && (sort === 'newest' || sort === 'popular') ? sort : undefined,
    })
  }, [router.query])

  const apply = () => {
    const query: any = {}
    if (local.q) query.q = local.q
    if (local.category) query.category = local.category
    if (local.tags && local.tags.length) query.tags = local.tags.join(',')
    if (local.location) query.location = local.location
    if (local.sort) query.sort = local.sort
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true })
  }

  const reset = () => {
    setLocal({})
    router.push({ pathname: router.pathname }, undefined, { shallow: true })
  }

  return (
    <aside className="filter-panel" aria-label="Filter items">
      <div className="filter-row">
        <label>
          Search
          <input value={local.q || ''} onChange={(e) => setLocal({ ...local, q: e.target.value })} />
        </label>
        <label>
          Category
          <select value={local.category || ''} onChange={(e) => setLocal({ ...local, category: e.target.value || undefined })}>
            <option value="">Any</option>
            <option value="care">Care</option>
            <option value="training">Training</option>
            <option value="support">Support</option>
          </select>
        </label>
      </div>

      <div className="filter-row">
        <label>
          Tags (comma separated)
          <input value={(local.tags || []).join(',')} onChange={(e) => setLocal({ ...local, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
        </label>
        <label>
          Location
          <input value={local.location || ''} onChange={(e) => setLocal({ ...local, location: e.target.value })} />
        </label>
      </div>

      <div className="filter-actions">
        <select value={local.sort || ''} onChange={(e) => setLocal({ ...local, sort: e.target.value as any })}>
          <option value="">Sort</option>
          <option value="newest">Newest</option>
          <option value="popular">Most popular</option>
        </select>
        <div>
          <button onClick={apply} className="btn-primary">Apply</button>
          <button onClick={reset} className="btn-ghost">Reset</button>
        </div>
      </div>
    </aside>
  )
}