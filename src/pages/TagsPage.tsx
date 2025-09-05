import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { posts } from '@/generated/content';


function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}


export default function TagsPage() {
    const q = useQuery();
    const active = q.get('tag');
    const tagMap = new Map<string, number>();
    posts.forEach(p => p.tags.forEach(t => tagMap.set(t, (tagMap.get(t) || 0) + 1)));
    const tags = Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);


    const filtered = active ? posts.filter(p => p.tags.includes(active)) : posts;


    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Tags</h1>
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map(([t, n]) => (
                    <Link key={t} to={`?tag=${encodeURIComponent(t)}`} className={`px-3 py-1 rounded-full ${active === t ? 'bg-brand-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>#{t} ({n})</Link>
                ))}
                {active && <Link to="/tags" className="underline">Clear</Link>}
            </div>
            <ul className="space-y-2">
                {filtered.map(p => (
                    <li key={p.slug}><Link to={`/posts/${p.slug}`} className="underline">{p.title}</Link></li>
                ))}
            </ul>
        </div>
    );
}