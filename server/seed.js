/**
 * Hayroo E-Commerce Seed Script
 * Run: node seed.js
 * Populates MongoDB with realistic categories and products using Unsplash CDN images.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const categoryModel = require("./models/categories");
const productModel = require("./models/products");

const DB = process.env.DATABASE;

const categories = [
  {
    cName: "Men's Fashion",
    cDescription: "Elevate your wardrobe with premium men's clothing, from sharp tailored suits to casual streetwear essentials.",
    cImage: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=80",
    cStatus: "Active",
  },
  {
    cName: "Women's Fashion",
    cDescription: "Discover the latest trends in women's fashion — from elegant dresses to chic everyday essentials.",
    cImage: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
    cStatus: "Active",
  },
  {
    cName: "Electronics",
    cDescription: "Top-rated tech and electronics — smartphones, laptops, audio gear, and accessories from leading brands.",
    cImage: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
    cStatus: "Active",
  },
  {
    cName: "Home & Living",
    cDescription: "Transform your space with our curated home décor, furniture, lighting, and lifestyle accessories.",
    cImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    cStatus: "Active",
  },
  {
    cName: "Beauty & Personal Care",
    cDescription: "Premium skincare, haircare, and beauty products to look and feel your best every day.",
    cImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
    cStatus: "Active",
  },
  {
    cName: "Sports & Outdoors",
    cDescription: "Gear up for every adventure with high-performance sports equipment, activewear, and outdoor essentials.",
    cImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
    cStatus: "Active",
  },
];

const buildProducts = (catMap) => [
  // ── Men's Fashion ──────────────────────────────────────────────
  {
    pName: "Classic Slim-Fit Oxford Shirt",
    pDescription: "A timeless Oxford shirt crafted from 100% combed cotton with a modern slim fit. Features a button-down collar, single breast pocket, and subtle herringbone texture. Perfect for business casual or weekend wear. Available in white, blue, and grey.",
    pPrice: 59,
    pQuantity: 120,
    pSold: 84,
    pCategory: catMap["Men's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4b9a?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },
  {
    pName: "Premium Slim Chino Trousers",
    pDescription: "Versatile slim-fit chinos made from stretch-cotton blend for all-day comfort. Features a mid-rise waist, two front slash pockets, and a clean hemline. Easily dressed up or down for any occasion.",
    pPrice: 79,
    pQuantity: 90,
    pSold: 62,
    pCategory: catMap["Men's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Merino Wool V-Neck Sweater",
    pDescription: "Luxuriously soft merino wool sweater with a classic V-neck silhouette. Naturally temperature-regulating, this knitwear is perfect for layering in transitional weather. Ribbed cuffs and hem for a refined finish.",
    pPrice: 129,
    pQuantity: 60,
    pSold: 41,
    pCategory: catMap["Men's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    ],
    pOffer: "15",
    pStatus: "Active",
  },
  {
    pName: "Leather Chelsea Boots",
    pDescription: "Handcrafted full-grain leather Chelsea boots with an elastic side panel and pull tab. Stacked leather heel, cushioned insole, and Goodyear-welted construction for superior durability. A wardrobe staple for every modern man.",
    pPrice: 189,
    pQuantity: 45,
    pSold: 33,
    pCategory: catMap["Men's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Japanese Selvedge Denim Jeans",
    pDescription: "Premium selvedge denim jeans crafted from authentic Japanese 12oz denim fabric. Slim taper fit with subtle distressing for a lived-in look. YKK zipper, riveted pockets, and a signature red line on the cuff.",
    pPrice: 149,
    pQuantity: 70,
    pSold: 55,
    pCategory: catMap["Men's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    ],
    pOffer: "20",
    pStatus: "Active",
  },
  {
    pName: "Linen Resort Casual Shirt",
    pDescription: "Breathable 100% linen shirt perfect for warm climates and beach getaways. Features a classic camp collar, short sleeves, and a relaxed fit. Subtle natural texture that improves with every wash.",
    pPrice: 69,
    pQuantity: 85,
    pSold: 48,
    pCategory: catMap["Men's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Structured Wool Overcoat",
    pDescription: "Impeccably tailored overcoat in a wool-cashmere blend. Single-breasted construction with notched lapels, flap pockets, and a clean back vent. The quintessential cold-weather staple that never goes out of style.",
    pPrice: 299,
    pQuantity: 30,
    pSold: 19,
    pCategory: catMap["Men's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80",
      "https://images.unsplash.com/photo-1520975867492-a6e4da76b54d?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Minimalist Leather Sneakers",
    pDescription: "Clean, minimal leather sneakers built for everyday wear. Full-grain leather upper with a cushioned latex insole and vulcanized rubber outsole. Versatile enough for the office or weekend errands.",
    pPrice: 119,
    pQuantity: 100,
    pSold: 76,
    pCategory: catMap["Men's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },

  // ── Women's Fashion ────────────────────────────────────────────
  {
    pName: "Silk Wrap Midi Dress",
    pDescription: "An elegant wrap-style midi dress crafted from pure mulberry silk. Features adjustable waist tie, V-neckline, and flutter sleeves. Drapes beautifully and transitions seamlessly from day to evening events.",
    pPrice: 179,
    pQuantity: 50,
    pSold: 37,
    pCategory: catMap["Women's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    ],
    pOffer: "15",
    pStatus: "Active",
  },
  {
    pName: "High-Rise Tailored Blazer",
    pDescription: "Power dressing redefined. This structured blazer features a single-button closure, padded shoulders, and a slightly cropped length. Wear it over a dress or paired with high-rise trousers for a polished look.",
    pPrice: 159,
    pQuantity: 40,
    pSold: 28,
    pCategory: catMap["Women's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4b9a?w=600&q=80",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Cashmere Ribbed Turtleneck",
    pDescription: "Indulge in pure cashmere luxury. This slim-fit turtleneck features fine ribbed texture, long sleeves, and a sleek silhouette. Incredibly soft against skin and naturally temperature-regulating.",
    pPrice: 199,
    pQuantity: 35,
    pSold: 22,
    pCategory: catMap["Women's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },
  {
    pName: "Wide-Leg Satin Trousers",
    pDescription: "Effortlessly chic wide-leg trousers in a lustrous satin fabric. High-waisted with a flat front, invisible side zip, and full-length hem. Equally at home at a cocktail party or styled casually with a tee.",
    pPrice: 109,
    pQuantity: 55,
    pSold: 39,
    pCategory: catMap["Women's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
      "https://images.unsplash.com/photo-1562572159-4efd90c9e3a1?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Block-Heel Ankle Strap Sandals",
    pDescription: "Refined block-heel sandals featuring an adjustable ankle strap and cushioned footbed. Crafted from genuine leather in classic nude and black tones. A true wardrobe workhorse that pairs with everything.",
    pPrice: 139,
    pQuantity: 60,
    pSold: 44,
    pCategory: catMap["Women's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    ],
    pOffer: "20",
    pStatus: "Active",
  },
  {
    pName: "Floral Maxi Skirt",
    pDescription: "A flowing maxi skirt in a vibrant floral print on a chiffon base. Features a comfortable elastic waistband and full-length cut. Perfect for garden parties, beach days, or a casual city outing.",
    pPrice: 89,
    pQuantity: 75,
    pSold: 51,
    pCategory: catMap["Women's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
      "https://images.unsplash.com/photo-1530073541657-3d3c72a752a4?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Structured Mini Leather Handbag",
    pDescription: "A compact yet spacious structured handbag in full-grain leather. Features a top zipper closure, interior card slots, removable crossbody strap, and gold-tone hardware. Handmade in Italy.",
    pPrice: 249,
    pQuantity: 25,
    pSold: 17,
    pCategory: catMap["Women's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Linen Co-Ord Set",
    pDescription: "Breathable linen co-ord two-piece set with a relaxed-fit button-up top and matching wide-leg trousers. Perfect for warm-weather styling — wear together or as separates. Available in off-white, sage, and terracotta.",
    pPrice: 119,
    pQuantity: 65,
    pSold: 43,
    pCategory: catMap["Women's Fashion"],
    pImages: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },

  // ── Electronics ───────────────────────────────────────────────
  {
    pName: "Wireless Noise-Cancelling Headphones",
    pDescription: "Industry-leading active noise cancellation with 30-hour battery life. Features dual microphones for crystal-clear calls, touch controls on the ear cup, and foldable design for easy travel. Compatible with all Bluetooth 5.0 devices.",
    pPrice: 299,
    pQuantity: 80,
    pSold: 64,
    pCategory: catMap["Electronics"],
    pImages: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },
  {
    pName: "Smart 4K OLED Monitor 27\"",
    pDescription: "Professional-grade 27-inch OLED monitor with 4K UHD resolution, 1ms response time, and 144Hz refresh rate. Features USB-C connectivity, HDR600 support, and an ultra-thin bezel design. Ideal for designers, gamers, and content creators.",
    pPrice: 649,
    pQuantity: 30,
    pSold: 22,
    pCategory: catMap["Electronics"],
    pImages: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Mechanical Gaming Keyboard",
    pDescription: "Full-size mechanical keyboard with Cherry MX Red switches for a smooth, linear keystroke. Features per-key RGB backlighting, detachable USB-C cable, aluminum top plate, and a compact tenkeyless layout.",
    pPrice: 149,
    pQuantity: 100,
    pSold: 78,
    pCategory: catMap["Electronics"],
    pImages: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80",
    ],
    pOffer: "15",
    pStatus: "Active",
  },
  {
    pName: "True Wireless Earbuds Pro",
    pDescription: "Premium true wireless earbuds with adaptive active noise cancellation and transparency mode. 8-hour battery life per charge, 32 hours total with case. IPX5 water resistance, wireless charging, and customizable EQ via companion app.",
    pPrice: 199,
    pQuantity: 150,
    pSold: 112,
    pCategory: catMap["Electronics"],
    pImages: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },
  {
    pName: "Portable Bluetooth Speaker",
    pDescription: "360-degree surround sound in a rugged, waterproof (IP67) design. 24-hour battery life, built-in microphone for speakerphone calls, and pair two speakers for stereo. Drop-proof up to 1.5m. The ultimate outdoor companion.",
    pPrice: 129,
    pQuantity: 90,
    pSold: 71,
    pCategory: catMap["Electronics"],
    pImages: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Smart Watch Series 5",
    pDescription: "Advanced health monitoring with ECG, blood oxygen, and continuous heart rate tracking. Always-on retina display, GPS, swim-proof design, and 18-hour battery life. Works with iOS and Android.",
    pPrice: 349,
    pQuantity: 60,
    pSold: 48,
    pCategory: catMap["Electronics"],
    pImages: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    ],
    pOffer: "20",
    pStatus: "Active",
  },
  {
    pName: "USB-C 65W Fast Charger Hub",
    pDescription: "7-in-1 USB-C hub with 65W power delivery, 4K HDMI output, 2x USB-A 3.0, SD/microSD card readers, and a 3.5mm audio jack. Compact aluminum housing with thermal management. Compatible with all USB-C laptops and tablets.",
    pPrice: 59,
    pQuantity: 200,
    pSold: 145,
    pCategory: catMap["Electronics"],
    pImages: [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Mirrorless Camera Bundle Kit",
    pDescription: "24.2MP APS-C sensor mirrorless camera with 4K 30fps video, 5-axis in-body stabilization, and a weather-sealed body. Bundle includes 16-50mm kit lens, 32GB UHS-II card, extra battery, and padded camera bag.",
    pPrice: 899,
    pQuantity: 20,
    pSold: 14,
    pCategory: catMap["Electronics"],
    pImages: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },

  // ── Home & Living ──────────────────────────────────────────────
  {
    pName: "Handwoven Cotton Throw Blanket",
    pDescription: "Artisan-crafted throw blanket woven from 100% organic cotton with a classic herringbone pattern. Lightweight yet warm, with fringed ends and a generous 50x70 inch size. Machine washable. Available in ivory, slate, and rust.",
    pPrice: 79,
    pQuantity: 110,
    pSold: 87,
    pCategory: catMap["Home & Living"],
    pImages: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Ceramic Pour-Over Coffee Set",
    pDescription: "Handthrown ceramic pour-over dripper and matching mug set. Crafted from high-fire stoneware with a reactive glaze finish — every piece is unique. Includes a bamboo stand and reusable stainless mesh filter.",
    pPrice: 69,
    pQuantity: 75,
    pSold: 58,
    pCategory: catMap["Home & Living"],
    pImages: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },
  {
    pName: "Scented Soy Candle Collection",
    pDescription: "Luxury hand-poured soy wax candles in a gift box set of four. Fragrance options: Nordic Pine, Cashmere & Musk, Lemon Verbena, and Smoked Amber. 50-hour burn time per candle, lead-free cotton wick.",
    pPrice: 49,
    pQuantity: 150,
    pSold: 109,
    pCategory: catMap["Home & Living"],
    pImages: [
      "https://images.unsplash.com/photo-1608181831718-c9fba4c4a2b1?w=600&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Modular Velvet Accent Chair",
    pDescription: "Mid-century modern accent chair upholstered in premium performance velvet. Solid walnut wood legs, high-density foam cushioning, and a pocket-spring base for lasting comfort. Available in emerald, blush, and charcoal.",
    pPrice: 449,
    pQuantity: 20,
    pSold: 12,
    pCategory: catMap["Home & Living"],
    pImages: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
    ],
    pOffer: "15",
    pStatus: "Active",
  },
  {
    pName: "Bamboo Bedding Set — Queen",
    pDescription: "Silky-soft bamboo viscose sheet set with a 400 thread-count equivalent feel. Includes one fitted sheet, one flat sheet, and two pillowcases. Naturally breathable, hypoallergenic, and temperature-regulating. Queen size.",
    pPrice: 139,
    pQuantity: 60,
    pSold: 44,
    pCategory: catMap["Home & Living"],
    pImages: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Travertine Marble Side Table",
    pDescription: "Minimalist side table with a genuine travertine marble top and slender powder-coated steel base. 18\" diameter top, 22\" height. Adds a natural stone element to any living or bedroom space.",
    pPrice: 259,
    pQuantity: 25,
    pSold: 16,
    pCategory: catMap["Home & Living"],
    pImages: [
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Large Monstera Ceramic Plant Pot",
    pDescription: "Handmade ceramic plant pot with drainage hole and matching saucer. Matte terracotta glaze with a brushed rim detail. Suitable for monstera, fiddle-leaf fig, and other statement houseplants. 12\" diameter.",
    pPrice: 39,
    pQuantity: 200,
    pSold: 156,
    pCategory: catMap["Home & Living"],
    pImages: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },

  // ── Beauty & Personal Care ─────────────────────────────────────
  {
    pName: "Vitamin C Brightening Serum",
    pDescription: "Clinically-tested 20% L-Ascorbic Acid vitamin C serum with ferulic acid and vitamin E. Brightens skin tone, reduces fine lines, and protects against environmental damage. Suitable for all skin types. 30ml amber glass bottle.",
    pPrice: 69,
    pQuantity: 200,
    pSold: 167,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },
  {
    pName: "Hyaluronic Acid Moisturiser",
    pDescription: "Lightweight gel-cream moisturiser with triple-weight hyaluronic acid for 72-hour hydration. Fragrance-free, non-comedogenic formula with niacinamide and ceramides. Dermatologist-tested for sensitive skin.",
    pPrice: 49,
    pQuantity: 180,
    pSold: 142,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Luxury Perfume — Oud & Amber",
    pDescription: "An intoxicating oriental fragrance with top notes of bergamot and saffron, a heart of oud and rose, and a warm base of amber and sandalwood. Long-lasting 12-hour projection. 100ml EDP in a weighty glass flacon.",
    pPrice: 149,
    pQuantity: 70,
    pSold: 53,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
    ],
    pOffer: "15",
    pStatus: "Active",
  },
  {
    pName: "Professional Hair Dryer 2400W",
    pDescription: "Salon-grade ionic hair dryer with 2400W AC motor for 70% faster drying. Features 3 heat settings, 2 speed settings, cool shot button, and concentrator nozzle. Reduces frizz with negative ion technology.",
    pPrice: 89,
    pQuantity: 95,
    pSold: 74,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: [
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80",
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "SPF 50 Daily Sunscreen Fluid",
    pDescription: "Ultra-lightweight SPF 50 PA++++ sunscreen fluid that doubles as a makeup primer. Invisible finish, no white cast, and reef-safe formula. Broad spectrum UVA/UVB protection with antioxidant green tea extract.",
    pPrice: 39,
    pQuantity: 250,
    pSold: 198,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },
  {
    pName: "Retinol Night Renewal Cream",
    pDescription: "Advanced retinol night cream with 0.3% encapsulated retinol, peptides, and bakuchiol. Accelerates cell turnover, diminishes wrinkles, and evens skin tone while you sleep. Gentle enough for first-time retinol users.",
    pPrice: 79,
    pQuantity: 120,
    pSold: 94,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Rosehip Oil Face Oil 30ml",
    pDescription: "Cold-pressed, 100% pure organic rosehip oil rich in omega fatty acids and beta-carotene. Visibly reduces scars, stretch marks, and sun damage. Lightweight and fast-absorbing formula. Certified organic by the Soil Association.",
    pPrice: 34,
    pQuantity: 160,
    pSold: 123,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },

  // ── Sports & Outdoors ──────────────────────────────────────────
  {
    pName: "Trail Running Shoes — V3",
    pDescription: "Lightweight trail running shoe with a Vibram® Megagrip outsole for superior traction on technical terrain. Protective rock plate, cushioned midsole, and a breathable mesh upper. Suitable for distances from 5K to ultramarathons.",
    pPrice: 149,
    pQuantity: 85,
    pSold: 67,
    pCategory: catMap["Sports & Outdoors"],
    pImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Performance Yoga Mat — 6mm",
    pDescription: "Professional-grade non-slip yoga mat with 6mm cushioning and alignment markers. Made from natural tree rubber with a microfibre top layer for grip that improves with moisture. Comes with a carrying strap.",
    pPrice: 79,
    pQuantity: 130,
    pSold: 102,
    pCategory: catMap["Sports & Outdoors"],
    pImages: [
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
      "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?w=600&q=80",
    ],
    pOffer: "10",
    pStatus: "Active",
  },
  {
    pName: "Adjustable Dumbbell Set — 5-25kg",
    pDescription: "Space-saving adjustable dumbbell set that replaces 9 individual dumbbells. Turn the dial to select from 5 to 25kg in 2.5kg increments. Durable ABS housing, ergonomic handle, and secure locking mechanism.",
    pPrice: 299,
    pQuantity: 40,
    pSold: 31,
    pCategory: catMap["Sports & Outdoors"],
    pImages: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    ],
    pOffer: "15",
    pStatus: "Active",
  },
  {
    pName: "Waterproof Hiking Backpack — 40L",
    pDescription: "Expedition-ready 40-litre hiking backpack with waterproof ripstop nylon, adjustable torso length, hipbelt pockets, hydration reservoir sleeve, and multiple gear attachment points. Ventilated back panel for alpine comfort.",
    pPrice: 179,
    pQuantity: 55,
    pSold: 43,
    pCategory: catMap["Sports & Outdoors"],
    pImages: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Cycling Jersey — Pro Fit",
    pDescription: "Aero-fit cycling jersey constructed from moisture-wicking Italian lycra with UV50+ protection. Full-length YKK zip, three rear pockets, silicone gripper hem, and reflective detailing for low-light visibility.",
    pPrice: 99,
    pQuantity: 70,
    pSold: 55,
    pCategory: catMap["Sports & Outdoors"],
    pImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
  {
    pName: "Foam Roller — Deep Tissue",
    pDescription: "High-density EVA foam roller with a textured surface for myofascial release and muscle recovery. 36-inch full-body length supports back, legs, and IT bands. Firm outer shell with a hollow inner core for stability.",
    pPrice: 39,
    pQuantity: 200,
    pSold: 162,
    pCategory: catMap["Sports & Outdoors"],
    pImages: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
      "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?w=600&q=80",
    ],
    pOffer: "20",
    pStatus: "Active",
  },
  {
    pName: "Insulated Stainless Water Bottle — 750ml",
    pDescription: "Double-wall vacuum insulated water bottle that keeps drinks cold for 24 hours and hot for 12 hours. 18/8 food-grade stainless steel, BPA-free, leak-proof lid with carrying loop. Fits standard car cup holders.",
    pPrice: 34,
    pQuantity: 300,
    pSold: 241,
    pCategory: catMap["Sports & Outdoors"],
    pImages: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80",
    ],
    pOffer: null,
    pStatus: "Active",
  },
];

async function seed() {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("✅ MongoDB Connected");

    // Clear existing data
    await categoryModel.deleteMany({});
    await productModel.deleteMany({});
    console.log("🗑  Cleared existing categories and products");

    // Insert categories
    const insertedCategories = await categoryModel.insertMany(categories);
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Build a name → _id map
    const catMap = {};
    insertedCategories.forEach((cat) => {
      catMap[cat.cName] = cat._id;
    });

    // Insert products
    const products = buildProducts(catMap);
    const insertedProducts = await productModel.insertMany(products);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    console.log("\n🎉 Seed complete! Your store is ready.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
