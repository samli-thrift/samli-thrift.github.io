import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { PAGE_SEO, SITE_URL, SITE_NAME, DEFAULT_IMAGE } from "../data/seo";

// Renders no visible UI. Put it once in a component that is always mounted
// (Navbar), and it sets the SEO tags for whichever page is open.
export default function PageSeo() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";

  // Product pages manage their own SEO; unknown routes keep the index.html defaults
  if (path.startsWith("/product-details")) return null;
  const page = PAGE_SEO[path];
  if (!page) return null;

  // Canonical ignores query strings, so /shop?category=x counts as /shop
  const url = `${SITE_URL}${path}`;
  const image = page.image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={url} />
      {page.noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${SITE_NAME} - Quality Meets Affordability`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}