// NEW FILE: shared by Home.jsx (Shop By tiles) and Shop.jsx (filter dropdowns)
// so both read the SAME real values from the database instead of two
// hand-typed lists that drift apart (old Home had "boys"/"girls"/"children",
// Shop had "kids"/"girl").

// Optional pretty names. Anything not listed falls back to prettify().
// Keys are the lowercase values stored in Supabase.
export const LABELS = {
  category: {
    men: "Men's",
    women: "Women's",
    kids: "Kid's",
    girl: "Girl's",
    babies: "Babies'",
    "night-wear": "Nightwear",
  },
  style: {},
  environment: {},
};

// "night-wear" -> "Night wear"
export const prettify = (s) =>
  s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");

export const labelFor = (key, value) => LABELS[key]?.[value] ?? prettify(value);

// FIX: case-insensitive match. The old `p.category.includes("men")` was an
// exact match, so "Men" in the DB would never match "?category=men".
export const hasValue = (arr, value) =>
  [].concat(arr ?? []).some(
    (x) => String(x).trim().toLowerCase() === String(value).toLowerCase()
  );

// Flatten + dedupe a field across products (works for arrays AND plain text
// columns like `environment`), lowercase the value, count items, and borrow the
// first product's image as the tile cover.
// Returns [{ value, label, count, image }] sorted by most items first.
export function buildFacets(products, key) {
  const map = new Map();
  products.forEach((p) => {
    [].concat(p[key] ?? []).forEach((raw) => {
      const value = String(raw).trim().toLowerCase();
      if (!value) return;
      const entry = map.get(value) ?? {
        value,
        label: labelFor(key, value),
        count: 0,
        image: null,
      };
      entry.count += 1;
      entry.image ??= p.image;
      map.set(value, entry);
    });
  });
  return [...map.values()].sort((a, b) => b.count - a.count);
}

// Same data shaped for <DropdownField options={...} />, with "All" first and
// the rest alphabetical.
export function buildOptions(products, key) {
  const rest = buildFacets(products, key)
    .map(({ value, label }) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return [{ value: "all", label: "All" }, ...rest];
}

// NEW: normalise a product type so "slot", "Slot", "slots" all compare equal,
// and "bale" matches "bales". Used by Shop (?type=...) and Navbar.
export const normType = (t) => String(t ?? "").trim().toLowerCase().replace(/s$/, "");