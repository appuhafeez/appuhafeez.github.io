import React, { useMemo, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from './theme';
import { posts as generatedPosts } from './generated/content';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import TagsPage from './pages/TagsPage';
import ArchivesPage from './pages/ArchivesPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
import { Post } from './types';
import { profile_data } from './generated/SideData';
import TableOfContents from './pages/TableOfContents';
import AdSense from './pages/AdSense';
import useSaveHash from './hooks/useSaveHash'

function LeftPanel({ onClose }: { onClose?: () => void }) {
  return (
    <aside id="leftPanel" className="right-panel space-y-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur p-4 rounded-2xl shadow-soft">
      <div className="flex flex-col items-center text-center">
        <img src={profile_data["profile-pic"]} alt="Author" className="avatar mb-3" />
        <h2 className="text-xl font-bold mb-1">{profile_data.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">{profile_data["short-desc"]}</p>
      </div>
      <center>
      <nav className="mt-4 space-y-2">
        <Link onClick={onClose} className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700" to="/">Home</Link>
        <Link onClick={onClose} className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700" to="/latest">Latest Posts</Link>
        <Link onClick={onClose} className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700" to="/about">Profile / About</Link>
        <Link onClick={onClose} className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700" to="/tags">Tags</Link>
        <Link onClick={onClose} className="block px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700" to="/archives">Archives</Link>
      </nav>
      </center>
      <div className="mt-4 text-sm">
        <p className="font-semibold mb-1">Quick links</p>
        <ul className="list-disc ml-6">
          <li><a href="https://github.com/appuhafeez" target="_blank">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/shaik--hafeez/" target="_blank">LinkedIn</a></li>
          <li><a href="mailto:appuhafeez833@gmail.com">Email Me</a></li>
        </ul>
      </div>
      
    </aside>
  );
}

function RightPanel({ current }: { current?: Post | null }) {
  // Posts sharing at least one tag
  const related = useMemo(() => {
    if (!current) return [] as Post[];
    const tagset = new Set(current.tags);
    return generatedPosts.filter(p => p.slug !== current.slug && p.tags.some(t => tagset.has(t))).slice(0, 5);
  }, [current]);

  return (
    <aside className="right-panel space-y-4">
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur p-4 rounded-2xl shadow-soft">
        <h3 className="text-lg font-semibold mb-2">Related posts</h3>
        <ul className="space-y-2">
          {related.map(p => (
            <li key={p.slug}>
              <Link className="hover:underline" to={`/posts/${p.slug}`}>{p.title}</Link>
              <div className="text-xs text-slate-500">{p.tags.join(', ')}</div>
            </li>
          ))}
          {!current && (
            <li className="text-sm text-slate-500">Browse a post to see related content here.</li>
          )}
        </ul>
      </div>
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur p-4 rounded-2xl shadow-soft">
          <div>
            { !current &&(
              <div>Check page content's here when you open any post</div>
            )}
            { current && (<TableOfContents content={current.raw} />)}
          </div>
      </div>
      <div className="bg-gradient-to-br from-brand-500 to-amber-400 p-4 rounded-2xl shadow-soft text-white">
        <div className="bg-white/15 rounded-xl p-3">
          <AdSense slot='987654321' />
        </div>
      </div>
    </aside>
  );
}

function TopBar({ toggleLeft }: { toggleLeft: () => void }) {
  const { theme, toggle } = useTheme();
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <button className="lg:hidden px-3 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60" onClick={toggleLeft}>
          ☰
        </button>
        <Link to="/" className="font-extrabold text-xl">Blog by Hafeez Shaik</Link>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/" className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700">Search</Link>
        <button
          onClick={toggle}
          className="px-3 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 shadow-soft flex items-center gap-2"
          title="Toggle theme"
        >
          {theme === 'light' ? '🌞 Day' : '🌙 Night'}
        </button>
      </div>
    </header>
  );
}

export default function App() {
  useSaveHash()
  const location = useLocation();
  const isPost = location.pathname.startsWith('/posts/');
  const [leftOpen, setLeftOpen] = useState(false);
  const current_post = isPost ? generatedPosts.find(p => `/posts/${p.slug}` === location.pathname) ?? null : null;

  return (
    <ThemeProvider>
      <div className="max-w-10xl mx-auto p-4">
        <TopBar toggleLeft={() => setLeftOpen(v => !v)} />
        {/* Mobile drawer */}
        {leftOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="bg-black/40 flex-1" onClick={() => setLeftOpen(false)} />
            <div className="bg-white dark:bg-slate-800 w-64 h-full p-4 shadow-xl">
              <LeftPanel onClose={() => setLeftOpen(false)} />
            </div>
          </div>
        )}
        <div className="container-3col">
          {/* Left Panel (desktop only) */}
          <div className="lg:block hidden">
            <LeftPanel />
          </div>

          {/* Center */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/latest" element={<Home latest />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/archives" element={<ArchivesPage />} />
              <Route path="/posts/:slug" element={<PostPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Right Panel (moves to bottom on mobile) */}
          <div className="lg:block hidden">
            <RightPanel current={current_post ?? undefined} />
          </div>
        </div>

        {/* Bottom Right Panel on mobile */}
        <div className="lg:hidden mt-4">
          <RightPanel current={current_post ?? undefined} />
        </div>
      </div>
    </ThemeProvider>
  );
}