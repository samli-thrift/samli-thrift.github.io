
export const SITE_URL = "https://samlistores.com.ng";
export const SITE_NAME = "SamLi Thrift";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

// One entry per page. Keys are route paths (no trailing slash).
// Product pages are NOT listed here: ProductDetails.jsx sets its own SEO.
export const PAGE_SEO = {
  "/": {
    title: "SamLi Thrift | Affordable Quality Thrift Clothing in Nigeria",
    description:
      "Shop quality, carefully graded thrift clothing at affordable prices. Order on WhatsApp with delivery to all 36 states in Nigeria.",
  },
  "/shop": {
    title: "Shop Thrift Clothing | SamLi Thrift",
    description:
      "Browse graded thrift clothing, slots and bales for men, women and children. Honest condition notes, fair prices and nationwide delivery.",
  },
  "/about": {
    title: "About Us | SamLi Thrift",
    description:
      "Learn how SamLi Thrift sources, grades and sells quality thrift clothing, and why customers across Nigeria trust us.",
  },
  "/contact": {
    title: "Contact Us | SamLi Thrift",
    description:
      "Get in touch with SamLi Thrift on WhatsApp to ask about a piece, bargain, or arrange delivery to your state.",
  },
  "/cart": {
    title: "Your Cart | SamLi Thrift",
    description: "Review the pieces in your cart and send your order on WhatsApp.",
    noindex: true, // private/empty pages shouldn't appear in Google
  },
};