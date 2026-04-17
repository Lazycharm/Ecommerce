/**
 * One-time seed route — GET /api/seed?key=YOUR_SEED_KEY
 * Call this once from a browser after deploying to Render.
 * Remove or disable after seeding is complete.
 */
const express = require("express");
const router = express.Router();
const categoryModel = require("../models/categories");
const productModel = require("../models/products");

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
    pDescription: "A timeless Oxford shirt crafted from 100% combed cotton with a modern slim fit. Features a button-down collar, single breast pocket, and subtle herringbone texture. Perfect for business casual or weekend wear.",
    pPrice: 59, pQuantity: 120, pSold: 84,
    pCategory: catMap["Men's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80","https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Tailored Wool-Blend Trousers",
    pDescription: "Smart trousers in a wool-blend fabric with a flat-front cut and slight taper. Functional side pockets, a zip fly, and a hook-and-bar waistband. Dry-clean recommended.",
    pPrice: 99, pQuantity: 80, pSold: 61,
    pCategory: catMap["Men's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80","https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "Premium Leather Chelsea Boots",
    pDescription: "Full-grain leather Chelsea boots with an elastic side panel, leather sole, and stacked heel. Hand-stitched welt construction for exceptional durability. Available in tan and black.",
    pPrice: 189, pQuantity: 45, pSold: 33,
    pCategory: catMap["Men's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80","https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Merino Wool Crew-Neck Sweater",
    pDescription: "Lightweight merino wool sweater with a classic crew neck. Ribbed cuffs and hem, fine-knit construction, and naturally odour-resistant properties. A versatile layering staple.",
    pPrice: 119, pQuantity: 90, pSold: 72,
    pCategory: catMap["Men's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80","https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"],
    pOffer: "15", pStatus: "Active",
  },
  {
    pName: "Slim-Fit Dark-Wash Jeans",
    pDescription: "Premium stretch denim jeans with a slim straight cut. Subtle dark wash, clean seams, and just 2% elastane for all-day comfort. Five-pocket styling with a zip fly.",
    pPrice: 89, pQuantity: 200, pSold: 145,
    pCategory: catMap["Men's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80","https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Waxed Cotton Field Jacket",
    pDescription: "Classic British-style waxed cotton jacket with a corduroy collar, bellows chest pockets, and a zip-out fleece liner. Water-repellent, windproof, and ready for any weather.",
    pPrice: 249, pQuantity: 30, pSold: 19,
    pCategory: catMap["Men's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80","https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"],
    pOffer: "20", pStatus: "Active",
  },
  {
    pName: "Slim White Dress Shirt",
    pDescription: "Crisp white dress shirt in 2-ply poplin cotton. Spread collar, single-button cuffs, and a slim cut that works tucked or untucked. Machine washable.",
    pPrice: 69, pQuantity: 150, pSold: 108,
    pCategory: catMap["Men's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80","https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Leather Bifold Wallet",
    pDescription: "Slim full-grain leather bifold wallet with 6 card slots, a full-length cash compartment, and an ID window. RFID-blocking lining. Available in cognac, black, and navy.",
    pPrice: 49, pQuantity: 300, pSold: 214,
    pCategory: catMap["Men's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80","https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },

  // ── Women's Fashion ────────────────────────────────────────────
  {
    pName: "Floral Wrap Midi Dress",
    pDescription: "Effortlessly feminine wrap dress in a soft crepe fabric with a vibrant floral print. Features a V-neckline, self-tie waistband, flutter sleeves, and a midi-length hem. Perfect for garden parties or brunch.",
    pPrice: 89, pQuantity: 75, pSold: 60,
    pCategory: catMap["Women's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80","https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "High-Waist Tailored Trousers",
    pDescription: "Elegant high-waist trousers with wide-leg cut in a ponte roma fabric. Belt loops, zip and button fly, and slash pockets. Polished enough for the office, relaxed enough for weekends.",
    pPrice: 109, pQuantity: 60, pSold: 47,
    pCategory: catMap["Women's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1594938298603-c8148c4b4e40?w=600&q=80","https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Cashmere Roll-Neck Jumper",
    pDescription: "Luxuriously soft 100% Grade-A cashmere jumper with a cosy roll neck. Regular fit with ribbed hem and cuffs. Available in camel, ivory, blush, and charcoal.",
    pPrice: 199, pQuantity: 40, pSold: 28,
    pCategory: catMap["Women's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80","https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600&q=80"],
    pOffer: "15", pStatus: "Active",
  },
  {
    pName: "Classic Trench Coat",
    pDescription: "Timeless double-breasted trench coat in a water-repellent cotton-gabardine. Storm flap, D-ring belt, and back yoke for a classic silhouette. Fully lined with a detachable wool tartan liner.",
    pPrice: 299, pQuantity: 25, pSold: 17,
    pCategory: catMap["Women's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80","https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Oversized Linen Blazer",
    pDescription: "Relaxed-fit linen blazer with peak lapels, a single-button fastening, and two flap pockets. Unlined for a cool, breathable feel in warm weather. Effortlessly elevates any outfit.",
    pPrice: 139, pQuantity: 55, pSold: 43,
    pCategory: catMap["Women's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1548549557-dbe9a0e49dd2?w=600&q=80","https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "Block-Heel Ankle Strap Sandals",
    pDescription: "Sophisticated ankle-strap sandals with a 7cm block heel. Full-grain leather upper, cushioned insole, and a rubber outsole for all-day comfort. A versatile day-to-evening style.",
    pPrice: 129, pQuantity: 70, pSold: 55,
    pCategory: catMap["Women's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80","https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Satin Slip Skirt",
    pDescription: "Elegant bias-cut satin slip skirt with a high waistband, side seam pockets, and a midi length that skims the knee. Pairs equally well with a blazer for work or a cropped tee for weekends.",
    pPrice: 79, pQuantity: 80, pSold: 62,
    pCategory: catMap["Women's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1583496661160-fb5218ees25a?w=600&q=80","https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "Structured Leather Tote Bag",
    pDescription: "Classic structured tote in full-grain vegetable-tanned leather. Magnetic snap closure, internal zip pocket, and two open pockets. 14\" laptop fits perfectly. Ages beautifully with use.",
    pPrice: 249, pQuantity: 35, pSold: 24,
    pCategory: catMap["Women's Fashion"],
    pImages: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80","https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },

  // ── Electronics ───────────────────────────────────────────────
  {
    pName: "Premium Noise-Cancelling Headphones",
    pDescription: "Over-ear wireless headphones with industry-leading active noise cancellation, 30-hour battery life, and multi-device Bluetooth pairing. Premium 40mm drivers deliver rich, detailed audio with deep bass.",
    pPrice: 349, pQuantity: 60, pSold: 48,
    pCategory: catMap["Electronics"],
    pImages: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80","https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "Smart 4K OLED TV — 55\"",
    pDescription: "55-inch 4K OLED smart TV with Dolby Vision IQ, Dolby Atmos, and a 120Hz refresh rate. Built-in Google TV with voice assistant, Apple AirPlay 2, and ultra-thin bezels.",
    pPrice: 1299, pQuantity: 15, pSold: 9,
    pCategory: catMap["Electronics"],
    pImages: ["https://images.unsplash.com/photo-1593359677879-a4bb92f4834d?w=600&q=80","https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80"],
    pOffer: "15", pStatus: "Active",
  },
  {
    pName: "Wireless Mechanical Keyboard",
    pDescription: "Compact 75% wireless mechanical keyboard with hot-swappable switches, per-key RGB backlighting, and a 4000mAh battery (3-month autonomy). Mac and Windows compatible. Available in linear, tactile, and clicky.",
    pPrice: 149, pQuantity: 80, pSold: 64,
    pCategory: catMap["Electronics"],
    pImages: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80","https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Ultra-Wide Curved Monitor — 34\"",
    pDescription: "34-inch 1440p ultra-wide curved monitor with a 144Hz refresh rate, 1ms response time, and USB-C power delivery. Ideal for gaming, creative work, and productivity.",
    pPrice: 699, pQuantity: 20, pSold: 14,
    pCategory: catMap["Electronics"],
    pImages: ["https://images.unsplash.com/photo-1547119957-637f8679db1e?w=600&q=80","https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "True Wireless Earbuds — Pro",
    pDescription: "Flagship true wireless earbuds with adaptive ANC, spatial audio, and 9-hour battery life (36 hours with case). IPX4 water resistance, instant ear detection, and customisable EQ via companion app.",
    pPrice: 249, pQuantity: 100, pSold: 82,
    pCategory: catMap["Electronics"],
    pImages: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80","https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80"],
    pOffer: "5", pStatus: "Active",
  },
  {
    pName: "Portable Bluetooth Speaker",
    pDescription: "360-degree waterproof Bluetooth speaker with 20W output, 24-hour battery life, and a built-in power bank. Drop-proof, dust-proof (IP67), and pairs with a second speaker for stereo mode.",
    pPrice: 129, pQuantity: 120, pSold: 96,
    pCategory: catMap["Electronics"],
    pImages: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "Smart Home Hub — Mini",
    pDescription: "Compact smart home hub compatible with Zigbee, Z-Wave, and Wi-Fi devices. Integrates with Alexa, Google Assistant, and HomeKit. Automate lighting, locks, sensors, and more from a single app.",
    pPrice: 99, pQuantity: 90, pSold: 71,
    pCategory: catMap["Electronics"],
    pImages: ["https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "4K Action Camera",
    pDescription: "Compact 4K/60fps action camera with HyperSmooth 5.0 video stabilisation, 10m waterproofing, and a front-facing display. Voice control, time-lapse, and live streaming capabilities built in.",
    pPrice: 399, pQuantity: 40, pSold: 29,
    pCategory: catMap["Electronics"],
    pImages: ["https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=600&q=80","https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80"],
    pOffer: "15", pStatus: "Active",
  },

  // ── Home & Living ──────────────────────────────────────────────
  {
    pName: "Minimalist Desk Lamp — LED",
    pDescription: "Architect-inspired LED desk lamp with a flexible arm, five brightness levels, and a USB-C charging port on the base. 50,000-hour LED lifespan. Available in matte black and brushed brass.",
    pPrice: 79, pQuantity: 110, pSold: 87,
    pCategory: catMap["Home & Living"],
    pImages: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80","https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Ceramic Pour-Over Coffee Set",
    pDescription: "Handthrown ceramic pour-over dripper and matching mug set. Crafted from high-fire stoneware with a reactive glaze. Includes a bamboo stand and reusable stainless mesh filter.",
    pPrice: 69, pQuantity: 75, pSold: 58,
    pCategory: catMap["Home & Living"],
    pImages: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80","https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "Scented Soy Candle Collection",
    pDescription: "Luxury hand-poured soy wax candles in a gift box set of four. Fragrances: Nordic Pine, Cashmere & Musk, Lemon Verbena, and Smoked Amber. 50-hour burn time per candle.",
    pPrice: 49, pQuantity: 150, pSold: 109,
    pCategory: catMap["Home & Living"],
    pImages: ["https://images.unsplash.com/photo-1608181831718-c9fba4c4a2b1?w=600&q=80","https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Modular Velvet Accent Chair",
    pDescription: "Mid-century modern accent chair upholstered in performance velvet with solid walnut legs and high-density foam cushioning. Available in emerald, blush, and charcoal.",
    pPrice: 449, pQuantity: 20, pSold: 12,
    pCategory: catMap["Home & Living"],
    pImages: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80","https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80"],
    pOffer: "15", pStatus: "Active",
  },
  {
    pName: "Bamboo Bedding Set — Queen",
    pDescription: "Silky-soft bamboo viscose sheet set: fitted sheet, flat sheet, and two pillowcases. Naturally breathable, hypoallergenic, and temperature-regulating. Queen size.",
    pPrice: 139, pQuantity: 60, pSold: 44,
    pCategory: catMap["Home & Living"],
    pImages: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Travertine Marble Side Table",
    pDescription: "Minimalist side table with a genuine travertine marble top and slender powder-coated steel base. 18\" diameter, 22\" height. Adds natural stone to any living space.",
    pPrice: 259, pQuantity: 25, pSold: 16,
    pCategory: catMap["Home & Living"],
    pImages: ["https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80","https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Large Monstera Ceramic Plant Pot",
    pDescription: "Handmade ceramic plant pot with drainage hole and matching saucer. Matte terracotta glaze with a brushed rim detail. Suitable for large houseplants. 12\" diameter.",
    pPrice: 39, pQuantity: 200, pSold: 156,
    pCategory: catMap["Home & Living"],
    pImages: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80","https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },

  // ── Beauty & Personal Care ─────────────────────────────────────
  {
    pName: "Vitamin C Brightening Serum",
    pDescription: "Clinically-tested 20% L-Ascorbic Acid vitamin C serum with ferulic acid and vitamin E. Brightens skin tone, reduces fine lines, and protects against environmental damage. 30ml.",
    pPrice: 69, pQuantity: 140, pSold: 112,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80","https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Hyaluronic Acid Moisturiser",
    pDescription: "Deeply hydrating moisturiser with three molecular weights of hyaluronic acid, niacinamide, and ceramides. Strengthens the skin barrier, plumps fine lines, and leaves skin glowing. 50ml.",
    pPrice: 54, pQuantity: 180, pSold: 142,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80","https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "Keratin Hair Repair Mask",
    pDescription: "Intense repair hair mask enriched with hydrolysed keratin, argan oil, and biotin. Rebuilds broken hair bonds, eliminates frizz, and adds brilliant shine. Salon-grade results at home. 300ml.",
    pPrice: 44, pQuantity: 130, pSold: 99,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80","https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Luxe Perfume — Oud & Amber",
    pDescription: "An intoxicating oriental fragrance built on a heart of Bulgarian rose and smoky oud, underpinned by warm amber and sandalwood. Long-lasting eau de parfum, 50ml.",
    pPrice: 129, pQuantity: 70, pSold: 52,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: ["https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80","https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80"],
    pOffer: "5", pStatus: "Active",
  },
  {
    pName: "SPF 50 Daily Sunscreen Fluid",
    pDescription: "Ultra-lightweight SPF 50 PA++++ sunscreen that doubles as a makeup primer. Invisible finish, no white cast, reef-safe. Broad spectrum UVA/UVB protection with antioxidant green tea extract.",
    pPrice: 39, pQuantity: 250, pSold: 198,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: ["https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80","https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "Retinol Night Renewal Cream",
    pDescription: "Advanced retinol night cream with 0.3% encapsulated retinol, peptides, and bakuchiol. Accelerates cell turnover, diminishes wrinkles, and evens skin tone. Gentle for first-time retinol users.",
    pPrice: 79, pQuantity: 120, pSold: 94,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80","https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Rosehip Oil Face Oil 30ml",
    pDescription: "Cold-pressed 100% pure organic rosehip oil rich in omega fatty acids and beta-carotene. Visibly reduces scars and sun damage. Lightweight and fast-absorbing. Soil Association certified.",
    pPrice: 34, pQuantity: 160, pSold: 123,
    pCategory: catMap["Beauty & Personal Care"],
    pImages: ["https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=80","https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },

  // ── Sports & Outdoors ──────────────────────────────────────────
  {
    pName: "Trail Running Shoes — V3",
    pDescription: "Lightweight trail running shoe with Vibram® Megagrip outsole for technical terrain. Protective rock plate, cushioned midsole, and breathable mesh upper. Suitable from 5K to ultramarathons.",
    pPrice: 149, pQuantity: 85, pSold: 67,
    pCategory: catMap["Sports & Outdoors"],
    pImages: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80","https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Compression Running Tights",
    pDescription: "High-performance compression tights with targeted muscle support zones, four-way stretch fabric, and deep waistband pockets. Quick-dry, UPF 50+, and reflective detailing for low-light runs.",
    pPrice: 79, pQuantity: 110, pSold: 88,
    pCategory: catMap["Sports & Outdoors"],
    pImages: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80","https://images.unsplash.com/photo-1535743686920-55e4145369b9?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "Adjustable Kettlebell 8–32 kg",
    pDescription: "Space-saving adjustable kettlebell with six weight settings from 8 to 32 kg. Cast iron core with a smooth powder-coat finish and a wide grip handle designed for swings, cleans, and presses.",
    pPrice: 189, pQuantity: 40, pSold: 29,
    pCategory: catMap["Sports & Outdoors"],
    pImages: ["https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80","https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Folding Camping Hammock",
    pDescription: "Ultra-light nylon parachute camping hammock. Holds up to 400 lbs, sets up in under 3 minutes with tree straps included. Packs down to the size of a water bottle. 400g. Double-layer with rain fly compatible.",
    pPrice: 69, pQuantity: 90, pSold: 71,
    pCategory: catMap["Sports & Outdoors"],
    pImages: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80","https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80"],
    pOffer: "15", pStatus: "Active",
  },
  {
    pName: "Insulated Hydration Backpack",
    pDescription: "3L hydration backpack with an insulated reservoir sleeve, helmet carry, and dedicated storage for tools and snacks. Ventilated back panel, magnetic bite valve, and reflective trim. Ideal for cycling and hiking.",
    pPrice: 99, pQuantity: 65, pSold: 50,
    pCategory: catMap["Sports & Outdoors"],
    pImages: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80","https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&q=80"],
    pOffer: null, pStatus: "Active",
  },
  {
    pName: "Professional Yoga Mat — 6mm",
    pDescription: "Premium 6mm TPE yoga mat with natural rubber grip surface, alignment guide lines, and a carrying strap. Eco-friendly, latex-free, and non-slip on both sides. 183 × 61 cm.",
    pPrice: 59, pQuantity: 180, pSold: 142,
    pCategory: catMap["Sports & Outdoors"],
    pImages: ["https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&q=80","https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&q=80"],
    pOffer: "10", pStatus: "Active",
  },
  {
    pName: "Waterproof Hardshell Jacket",
    pDescription: "3-layer Gore-Tex® hardshell jacket with fully taped seams, an adjustable helmet-compatible hood, and pit-zip venting. Packable to a chest pocket. Ideal for alpine and all-weather hiking.",
    pPrice: 329, pQuantity: 30, pSold: 21,
    pCategory: catMap["Sports & Outdoors"],
    pImages: ["https://images.unsplash.com/photo-1467220795047-e55c4c71fea4?w=600&q=80","https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80"],
    pOffer: "15", pStatus: "Active",
  },
];

// GET /api/seed?key=hayroo_seed_2024
router.get("/seed", async (req, res) => {
  const SEED_KEY = process.env.SEED_KEY || "hayroo_seed_2024";
  if (req.query.key !== SEED_KEY) {
    return res.status(403).json({ error: "Forbidden — invalid seed key" });
  }
  try {
    await categoryModel.deleteMany({});
    await productModel.deleteMany({});

    const insertedCategories = await categoryModel.insertMany(categories);
    const catMap = {};
    insertedCategories.forEach((cat) => { catMap[cat.cName] = cat._id; });

    const products = buildProducts(catMap);
    const insertedProducts = await productModel.insertMany(products);

    res.json({
      success: true,
      categories: insertedCategories.length,
      products: insertedProducts.length,
      message: `✅ Seeded ${insertedCategories.length} categories and ${insertedProducts.length} products`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
