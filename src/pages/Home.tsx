import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '@/generated/content';


export default function Home({ latest = false }: { latest?: boolean }) {
    const sorted = useMemo(() => {
        const list = [...posts];
        list.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        return latest ? list.slice(0, 10) : list;
    }, [latest]);


    const [query, setQuery] = useState('');
    const [results, setResults] = useState(sorted);


    useEffect(() => {
        if (!query) { setResults(sorted); return; }
        // Simple in-memory search across title, tags, excerpt
        const q = query.toLowerCase();
        setResults(sorted.filter(p =>
            p.title.toLowerCase().includes(q)
            || p.raw.toLowerCase().includes(q)
            || p.tags.join(' ').toLowerCase().includes(q)
        ));
    }, [query, sorted]);


    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search posts..."
                    className="w-full px-4 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 shadow-soft outline-none" />
            </div>
            <ul className="grid md:grid-cols-2 gap-4">
                {results.map(p => (
                    <li key={p.slug} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur p-4 rounded-2xl shadow-soft">
                        <Link to={`/posts/${p.slug}`} className="text-xl font-semibold hover:underline">{p.title}</Link>
                        <div className="text-sm text-slate-600 dark:text-slate-300">{new Date(p.created).toLocaleDateString()}</div>
                        <p className="text-sm mt-2">{p.excerpt}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {p.tags.map(t => (
                                <Link to={`/tags?tag=${encodeURIComponent(t)}`} key={t} className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full">#{t}</Link>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}