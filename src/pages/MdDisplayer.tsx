import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // for tables, strikethrough, etc.
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useTheme } from './../theme';
import { okaidia, prism } from "react-syntax-highlighter/dist/esm/styles/prism"; // pick a theme
import { useMediaQuery } from 'react-responsive';

export default function MdDisplayer({content=''}) {

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const { theme, toggle } = useTheme();

    function slugify(str: string) {
        return str
            .toLowerCase()
            .replace(/[^\w]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }


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
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                h1: ({ children }) => (
                    <h1 id={slugify(flattenChildrenToString(children))}>{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 id={slugify(flattenChildrenToString(children))}>{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 id={slugify(flattenChildrenToString(children))}>{children}</h3>
                ),
                h4: ({ children }) => (
                    <h4 id={slugify(flattenChildrenToString(children))}>{children}</h4>
                ),
                h5: ({ children }) => (
                    <h5 id={slugify(flattenChildrenToString(children))}>{children}</h5>
                ),
                h6: ({ children }) => (
                    <h6 id={slugify(flattenChildrenToString(children))}>{children}</h6>
                ),
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
                        <div style={{ maxWidth: isMobile ? "100vw" : "55vw", overflowX: "auto" }}>
                            <SyntaxHighlighter
                                language={match[1]}
                                style={theme === 'light' ? prism : okaidia}
                                showLineNumbers={true}
                                wrapLongLines={false}
                                wrapLines={false}
                                PreTag="div" // 👈 replace <pre> with <div>
                                customStyle={{
                                    margin: 0,
                                    padding: "1rem",
                                    overflowX: "auto",
                                    boxSizing: "border-box",
                                    whiteSpace: "pre", // don’t wrap
                                }}
                            >{codeString}</SyntaxHighlighter>
                        </div>
                    ) : (
                        <code {...rest} className={className}>
                            {children}
                        </code>
                    )
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
}