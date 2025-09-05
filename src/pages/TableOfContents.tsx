import { useState, useEffect } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

type Heading = { id: string; text: string; level: number };

function slugify(str: string) {
  return str.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");
}

export function useTableOfContents(markdown: string) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const tree = unified().use(remarkParse).parse(markdown);

    const found: Heading[] = [];
    visit(tree, "heading", (node: any) => {
      const text = node.children
        .filter((c: any) => c.type === "text" || c.type === "inlineCode")
        .map((c: any) => c.value)
        .join(" ");
      found.push({
        id: slugify(text),
        text,
        level: node.depth,
      });
    });
    setHeadings(found);
  }, [markdown]);

  return headings;
}


type Props = { content: string };

const TableOfContents: React.FC<Props> = ({ content }) => {
  const headings = useTableOfContents(content);
  const [activeId, setActiveId] = useState<string>("");

  // Scroll spy logic
  useEffect(() => {
    const onScroll = () => {
      let current = "";
      headings.forEach((h) => {
        const el = document.getElementById(h.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = h.id;
          }
        }
      });
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  return (
    <nav className="text-sm space-y-1">
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`block ml-${(h.level - 1) * 4} ${
            activeId === h.id ? "text-blue-600 font-bold" : "text-gray-600"
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
};

export default TableOfContents;
