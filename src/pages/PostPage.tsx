import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import "highlight.js/styles/github.css";
import { posts } from '@/generated/content';
import { useTheme } from './../theme';
import { Helmet } from "react-helmet-async";
import { Post } from '@/types';
import Giscus from '@giscus/react';
import MdDisplayer from './MdDisplayer';

export default function PostPage() {
    const { theme, toggle } = useTheme();
    const { slug } = useParams();
    const post = useMemo(() => posts.find(p => p.slug === slug), [slug]);
    if (!post) return <div className="p-4">Post not found.</div>;

    const shareUrl = typeof window !== 'undefined' ? window.location.href.replace('/#/','/') : '';
    const shareText = encodeURIComponent(`${post.title}`);

    const shareLinks = [
        { label: 'X/Twitter', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}` },
        { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
        { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
        { label: 'WhatsApp', href: `https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(shareUrl)}` },
    ];

    // ✅ Scroll to heading when hash changes
    useEffect(() => {
        const scrollToHash = () => {
            const id = window.location.hash.replace("#", "");
            if (id) {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        };

        scrollToHash(); // run on mount
        window.addEventListener("hashchange", scrollToHash);
        return () => window.removeEventListener("hashchange", scrollToHash);
    }, []);


    return (
        <>
            <Helmet>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt} />

                {/* Open Graph tags */}
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={shareUrl} />
                <meta property="og:image" content={"/vite.svg"} />

                {/* Twitter card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
            </Helmet>
            <article className="prose">
                <h1>{post.title}</h1>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                    <span>Created: {new Date(post.created).toLocaleDateString()}</span>
                    {post.updated && <span> · Updated: {new Date(post.updated).toLocaleDateString()}</span>}
                    <span> · Category: <Link to={`/archives?cat=${encodeURIComponent(post.category)}`} className="underline">{post.category}</Link></span>
                </div>
                {/*<div dangerouslySetInnerHTML={{ __html: post.html }} />*/}

              <MdDisplayer content={post.raw}/>
                <Giscus 
                    id="comments"
                    repo="appuhafeez/appuhafeez.github.io"
                    repoId="MDEwOlJlcG9zaXRvcnkxMTY4MzY1MzY="
                    category="Announcements"
                    categoryId="DIC_kwDOBvbIuM4Cu-SH"
                    mapping="url"
                    strict="1"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme={theme === 'light' ? 'light_protanopia' : 'dark_protanopia'}
                    lang="en"
                    loading="lazy"
                />
                <hr className="my-6" />
                <div className="text-sm">Tags: {post.tags.map(t => (
                    <Link key={t} to={`/tags?tag=${encodeURIComponent(t)}`} className="mr-2 underline">#{t}</Link>
                ))}</div>


                <div className="mt-6 flex flex-wrap gap-2">
                    {navigator.share ? (
                        <button
                            onClick={() => navigator.share({ title: post.title, text: post.excerpt, url: shareUrl })}
                            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white shadow-soft"
                        >Share</button>
                    ) : null}
                    {shareLinks.map(s => (
                        <a key={s.label} href={s.href} target="_blank" className="px-3 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 shadow-soft">Share to {s.label}</a>
                    ))}
                </div>
            </article>
        </>
    );
}