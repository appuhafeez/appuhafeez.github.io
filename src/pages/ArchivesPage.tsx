import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { posts } from '@/generated/content';


function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}


export default function ArchivesPage() {
    const q = useQuery();
    const cat = q.get('cat');


    const byCategory = new Map<string, { year: string, post: typeof posts[number] }[]>();
    posts.forEach(p => {
        const arr = byCategory.get(p.category) || [];
        arr.push({ year: new Date(p.created).getFullYear().toString(), post: p });
        byCategory.set(p.category, arr);
    });


    const cats = Array.from(byCategory.keys()).sort();


    const list = cat ? byCategory.get(cat) || [] : [];


    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Archives</h1>
            <div className="flex flex-wrap gap-2 mb-4">
                {cats.map(c => (
                    <Link key={c} to={`?cat=${encodeURIComponent(c)}`} className={`px-3 py-1 rounded-full ${cat === c ? 'bg-brand-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{c}</Link>
                ))}
                {cat && <Link to="/archives" className="underline">Clear</Link>}
            </div>
            {!cat && <p className="text-slate-600 dark:text-slate-300">Pick a category to explore its posts by year.</p>}
            {cat && (
                <div className="space-y-2">
                    {list.sort((a, b) => a.year.localeCompare(b.year)).map(({ year, post }) => (
                        <div key={post.slug}>
                            <div className="text-sm text-slate-500">{year}</div>
                            <Link to={`/posts/${post.slug}`} className="underline">{post.title}</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}