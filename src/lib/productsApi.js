import { supabase } from "./supabase";

const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

const toProduct = (r) => ({
  id: String(r.id),
  name: r.name,
  size: r.size,
  condition: r.condition || "Good",
  price: Number(r.price) || 0,
  status: r.status,
  category: toArray(r.category),
  style: toArray(r.style),
  environment: r.environment,
  description: r.description,
  image: r.image,
  images: toArray(r.images),
  soldOut: r.sold_out ?? false,
  // new columns, available if you want to use them later
  type: r.type,
  piecesCount: r.pieces_count,
  weightKg: r.weight_kg != null ? Number(r.weight_kg) : null,
  grade: r.grade,
  variants: r.variants ?? [],
});

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(toProduct);
}
