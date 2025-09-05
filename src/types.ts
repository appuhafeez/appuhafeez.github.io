export type PostMeta = {
    slug: string;
    title: string;
    tags: string[];
    category: string;
    created: string; // ISO
    updated?: string; // ISO
    image?: string; // cover image URL
    raw: string; // original markdown path
};


export type Post = PostMeta & {
    html?: string; // compiled HTML
};