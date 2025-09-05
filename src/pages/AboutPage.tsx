import React from 'react';
import { about } from '../generated/content';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // for tables, strikethrough, etc.
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // pick a theme
import { Helmet } from 'react-helmet-async';

// About is a special pseudo-post generated from /content/about.md
const about_content = about.find(p => p.slug === 'about');


export default function AboutPage() {

    function flattenChildrenToString(children: any): string {
        if (typeof children === "string") {
            return children;
        }
        if (Array.isArray(children)) {
            return children.map(flattenChildrenToString).join("");
        }
        if (children && typeof children === "object" && "props" in children) {
            return flattenChildrenToString(children.props.children);
        }
        return "";
    }

    return (
        <>
        <Helmet>
            <title>{about_content?.slug}</title>
            <meta name="description" content={about_content?.excerpt} />
            {/* Open Graph tags */}
            <meta property="og:title" content={about_content?.title} />
            <meta property="og:description" content={about_content?.excerpt} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={about_content?.slug} />
            <meta property="og:image" content={"/avatar.jpeg"} />

            {/* Twitter card */}
            <meta name="twitter:card" content={about_content?.excerpt} />
            <meta name="twitter:title" content={about_content?.title} />
            <meta name="twitter:description" content={about_content?.excerpt} />
        </Helmet>
        <article className="prose">
            <h1>About</h1>
            {about_content ? <div>

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        ol: ({ children }) => (
                            <ol className="list-decimal ml-6">{children}</ol>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc ml-6">{children}</ul>
                        ),
                        code(props) {
                            const { children, className, node, ...rest } = props
                            const match = /language-(\w+)/.exec(className || '')
                            const codeString = flattenChildrenToString(children)
                            return match ? (
                                <SyntaxHighlighter
                                    PreTag="div"
                                    children={codeString}
                                    language={match[1]}
                                    style={oneDark}
                                    showLineNumbers={true}
                                    wrapLongLines={true}
                                />
                            ) : (
                                <code {...rest} className={className}>
                                    {children}
                                </code>
                            )
                        },
                    }}
                >
                    {about_content.raw}
                </ReactMarkdown>

            </div> : <p>Create <code>content/about.md</code> to edit this page.</p>}
        </article>
        </>
    );
}