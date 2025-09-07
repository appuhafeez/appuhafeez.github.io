import { about } from '../generated/content';

import "highlight.js/styles/github.css";
import { Helmet } from 'react-helmet-async';
import MdDisplayer from './MdDisplayer';

// About is a special pseudo-post generated from /content/about.md
const about_content = about.find(p => p.slug === 'about');


export default function AboutPage() {

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

                <MdDisplayer content={about_content.raw}/>

            </div> : <p>Create <code>content/about.md</code> to edit this page.</p>}
        </article>
        </>
    );
}