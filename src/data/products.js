import kids from "../assets/images/kids.jpg";

// Swap `image` for real photos as you get them
// category:    men | women | children | babies | girl | underwear | swimwear | night-wear
// style:       hot | sexy | punk | trending
// environment: everywhere | work | school | casual
export const products = [
  { id: "p101", image: kids, name: "Baggy Boyfriend Jeans", price: 50000, size: "M", condition: "Like new", status: "New in", category: "women", style: "trending", environment: "casual" },
  { id: "p102", image: kids, name: "Vintage Denim Jacket", price: 65000, size: "L", condition: "Good", status: "Last piece", category: "men", style: "trending", environment: "casual" },
  { id: "p103", image: kids, name: "Oversized Graphic Tee", price: 18000, size: "XL", condition: "Good", category: "men", style: "punk", environment: "casual" },
  { id: "p104", image: kids, name: "Pleated Midi Skirt", price: 28000, size: "S", condition: "Like new", status: "New in", category: "women", style: "trending", environment: "work" },
  { id: "p105", image: kids, name: "Chunky Knit Cardigan", price: 35000, size: "M", condition: "Fair", category: "women", style: "trending", environment: "everywhere" },
  { id: "p106", image: kids, name: "Corduroy Wide-Leg Trousers", price: 42000, size: "L", condition: "Good", category: "men", style: "trending", environment: "work" },
  { id: "p107", image: kids, name: "Satin Slip Dress", price: 55000, size: "S", condition: "Like new", soldOut: true, category: "women", style: "sexy", environment: "casual" },
  { id: "p108", image: kids, name: "Retro Windbreaker", price: 30000, size: "XL", condition: "Fair", status: "Last piece", category: "men", style: "hot", environment: "casual" },

  // Extra items so every filter has something to show
  { id: "p109", image: kids, name: "School Pinafore Dress", price: 15000, size: "8-10y", condition: "Good", category: "children", style: "trending", environment: "school" },
  { id: "p110", image: kids, name: "Baby Romper Set", price: 12000, size: "6-12m", condition: "Like new", status: "New in", category: "babies", style: "trending", environment: "everywhere" },
  { id: "p111", image: kids, name: "Girls Denim Dungarees", price: 20000, size: "6-7y", condition: "Good", category: "girl", style: "hot", environment: "casual" },
  { id: "p112", image: kids, name: "Cotton Lounge Pyjama Set", price: 22000, size: "M", condition: "Like new", category: "night-wear", style: "trending", environment: "casual" },
  { id: "p113", image: kids, name: "Floral Two-Piece Swimsuit", price: 25000, size: "S", condition: "Good", category: "swimwear", style: "hot", environment: "casual" },
  { id: "p114", image: kids, name: "Studded Black Biker Jacket", price: 70000, size: "L", condition: "Fair", category: "men", style: "punk", environment: "casual" },
  { id: "p115", image: kids, name: "Tailored Office Blazer", price: 48000, size: "M", condition: "Like new", status: "New in", category: "women", style: "trending", environment: "work" },
];