# SamLi Thrift: Image Assets Checklist

Sizes are for 2x sharpness on retina screens. Rename the files to match your imports.

## Before you start
- [ ] Export as WebP (or JPG), each under ~150 KB
- [ ] Name files in lowercase with hyphens, no spaces
- [ ] Use the same ratio and background style for all product photos
- [ ] Use real photos of your own stock, not stock-library images

## Brand
- [ ] `logo.svg` (vector): navbar and footer
- [ ] `logo-light.svg` (vector): only if the footer is dark
- [ ] `favicon.png` (512×512): also export 32×32 and 180×180 (apple-touch-icon)
- [ ] `og-image.jpg` (1200×630): preview when the link is shared on WhatsApp and Facebook

## Home page
- [ ] `hero-home.jpg` (1200×900, 4:3): rack of clothes or a flat lay of your best pieces
- [ ] `cat-tops.jpg` (600×600): category tile
- [ ] `cat-jeans.jpg` (600×600): category tile
- [ ] `cat-shoes.jpg` (600×600): category tile
- [ ] `cat-bags.jpg` (600×600): category tile
- [ ] Any other category tiles you have (600×600 each, square crops)
- [ ] `owner-lilian.jpg` (800×1000, 4:5): Meet the owner section
- [ ] `review-1.jpg` … `review-n.jpg` (120×120): customer avatars, only with permission (or use initials)
- [ ] `cta-bg.jpg` (1600×800): only if the CTA section uses a background image

## About page
- [ ] `about-hero.jpg` (1200×900): a different shot from the home hero, e.g. sorting or packing stock
- [ ] `about-story.jpg` (600×600): shown in a 300px circle, keep the subject centred with room around it

## Shop page
- [ ] `hero-shop.jpg` (1200×900): shop page hero
- [ ] `placeholder.jpg` (800×1000): fallback when a product image fails to load

## Product photos
One set per item in `assets/products/`. Keep every photo at 800×1000 (4:5).

- [ ] `<id>-1.jpg`: main photo (used in the shop grid, product card and cart thumbnail)
- [ ] `<id>-2.jpg`: optional, tag or label close-up
- [ ] `<id>-3.jpg`: optional, flaw or wear close-up (backs up your honest grading)

## Final checks
- [ ] Every image path in the code matches a real file name
- [ ] Hero images look good on mobile (cropped to max 300px tall)
- [ ] Product images all share the same ratio so the grid stays even
- [ ] Add meaningful `alt` text to each image in the code
- [ ] Test the site on a slow connection to confirm load times

## Not needed
Icons for process steps, empty states and the cart use Font Awesome, so they need no image files.
