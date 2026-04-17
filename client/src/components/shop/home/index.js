import React, { Fragment, createContext, useReducer, useContext, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";

export const HomeContext = createContext();

// ─── Scroll-reveal FadeIn (IntersectionObserver) ───────────────────────────
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Section heading ────────────────────────────────────────────────────────
const SectionHeading = ({ badge, title, sub }) => (
  <FadeIn className="text-center mb-10">
    {badge && (
      <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
        {badge}
      </span>
    )}
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
    {sub && <p className="text-gray-500 mt-2 text-sm">{sub}</p>}
  </FadeIn>
);

// ─── Trust Strip ────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
    ), title: "Fast UAE Delivery", sub: "Same-day Dubai & Abu Dhabi" },
  { icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    ), title: "Secure Checkout", sub: "256-bit SSL protection" },
  { icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
    ), title: "24/7 Support", sub: "Always here for you" },
  { icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
    ), title: "Easy Returns", sub: "30-day hassle-free returns" },
];

const TrustStrip = () => (
  <div className="bg-white border-y border-gray-100">
    <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {TRUST_ITEMS.map((item, i) => (
          <FadeIn
            key={item.title}
            delay={i * 0.08}
            className="flex items-center space-x-3 py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="text-yellow-500 flex-shrink-0">{item.icon}</div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
              <div className="text-xs text-gray-500">{item.sub}</div>
            </div>
          </FadeIn>
        ))}
    </div>
  </div>
);

// ─── Featured Categories ─────────────────────────────────────────────────────
const CATEGORIES = [
  { name: "Men's Fashion", image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=80" },
  { name: "Women's Fashion", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80" },
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80" },
  { name: "Home & Living", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
  { name: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80" },
  { name: "Sports & Outdoors", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80" },
];

const FeaturedCategories = () => {
  const history = useHistory();
  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <SectionHeading title="Shop by Category" sub="Explore our carefully curated collections" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.name}
            className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-sm"
            style={{ paddingBottom: "80%", position: "relative" }}
            onClick={() => history.push("/")}
          >
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <p className="font-semibold text-sm leading-tight">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Trending Products Horizontal Scroll Slider ──────────────────────────────
const TrendingSlider = () => {
  const { data } = useContext(HomeContext);
  const { products } = data;
  const history = useHistory();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
    }
  };

  const imgSrc = (path) =>
    path && path.startsWith("http") ? path : `${process.env.REACT_APP_API_URL}/uploads/products/${path}`;

  const trending = products ? products.filter((p) => p.pSold > 40).slice(0, 12) : [];

  if (!trending.length) return null;

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <FadeIn>
            <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">Hot Right Now</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Products</h2>
          </FadeIn>
          <div className="flex space-x-2">
            <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={() => scroll(1)} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
        >
          {trending.map((item, i) => {
            const discounted = item.pOffer ? (item.pPrice - (item.pPrice * parseInt(item.pOffer)) / 100).toFixed(0) : null;
            return (
              <div
                key={item._id}
                className="flex-none w-52 snap-start group cursor-pointer"
                onClick={() => history.push(`/products/${item._id}`)}
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-100" style={{ paddingBottom: "120%" }}>
                  <img
                    loading="lazy"
                    src={imgSrc(item.pImages[0])}
                    alt={item.pName}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    <span role="img" aria-label="fire">🔥</span> Trending
                  </span>
                  {item.pOffer && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      -{item.pOffer}%
                    </span>
                  )}
                </div>
                <div className="mt-2 px-1">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.pName}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {discounted ? (
                      <>
                        <span className="font-bold text-gray-900 text-sm">${discounted}</span>
                        <span className="text-gray-400 line-through text-xs">${item.pPrice}</span>
                      </>
                    ) : (
                      <span className="font-bold text-gray-900 text-sm">${item.pPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Flash Sale Countdown ────────────────────────────────────────────────────
const useCountdown = (hours = 5) => {
  const end = useRef(Date.now() + hours * 3600 * 1000);
  const [timeLeft, setTimeLeft] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => {
      const diff = Math.max(0, Math.floor((end.current - Date.now()) / 1000));
      setTimeLeft(diff);
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");
  return { h, m, s };
};

const FlashSale = () => {
  const { data } = useContext(HomeContext);
  const { products } = data;
  const history = useHistory();
  const { h, m, s } = useCountdown(5);

  const imgSrc = (path) =>
    path && path.startsWith("http") ? path : `${process.env.REACT_APP_API_URL}/uploads/products/${path}`;

  const saleItems = products ? products.filter((p) => p.pOffer).slice(0, 4) : [];
  if (!saleItems.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <span className="inline-block bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              <span role="img" aria-label="lightning">⚡</span> Flash Sale
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Today's Best Deals</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 mr-1">Ends in:</span>
            {[h, m, s].map((unit, i) => (
              <Fragment key={i}>
                <div className="bg-gray-900 text-white font-mono font-bold text-xl rounded-lg w-12 h-12 flex items-center justify-center shadow">
                  {unit}
                </div>
                {i < 2 && <span className="text-gray-900 font-bold text-xl">:</span>}
              </Fragment>
            ))}
          </div>
        </div>
      </FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {saleItems.map((item, i) => {
          const discounted = (item.pPrice - (item.pPrice * parseInt(item.pOffer)) / 100).toFixed(0);
          return (
            <div
              key={item._id}
              className="group cursor-pointer bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
              onClick={() => history.push(`/products/${item._id}`)}
            >
              <div className="relative overflow-hidden" style={{ paddingBottom: "110%" }}>
                <img
                  loading="lazy"
                  src={imgSrc(item.pImages[0])}
                  alt={item.pName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{item.pOffer}%
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 truncate">{item.pName}</p>
                <div className="flex items-center space-x-2 mt-1.5">
                  <span className="font-bold text-red-600 text-base">${discounted}</span>
                  <span className="text-gray-400 line-through text-xs">${item.pPrice}</span>
                </div>
                <div className="mt-1.5 w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${Math.min(90, (item.pSold / item.pQuantity) * 100)}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">{item.pSold} sold</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ─── Best Sellers Grid ───────────────────────────────────────────────────────
const BestSellers = () => {
  const { data } = useContext(HomeContext);
  const { products } = data;
  const history = useHistory();

  const imgSrc = (path) =>
    path && path.startsWith("http") ? path : `${process.env.REACT_APP_API_URL}/uploads/products/${path}`;

  const best = products ? [...products].sort((a, b) => b.pSold - a.pSold).slice(0, 8) : [];
  if (!best.length) return null;

  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading badge="Most Popular" title="Best Sellers" sub="Our customers' absolute favourites" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {best.map((item, i) => {
            const discounted = item.pOffer ? (item.pPrice - (item.pPrice * parseInt(item.pOffer)) / 100).toFixed(0) : null;
            return (
              <FadeIn
                key={item._id}
                delay={i * 0.07}
              >
                <div
                  className="group cursor-pointer card-lift rounded-2xl"
                  onClick={() => history.push(`/products/${item._id}`)}
                >
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm" style={{ paddingBottom: "120%" }}>
                  <img
                    loading="lazy"
                    src={imgSrc(item.pImages[0])}
                    alt={item.pName}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.pOffer && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -{item.pOffer}%
                    </span>
                  )}
                  {i === 0 && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      #1
                    </span>
                  )}
                  {/* Quick view overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="bg-white text-gray-900 text-xs font-bold px-5 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      Quick View
                    </span>
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <p className="text-sm font-medium text-gray-800 leading-snug truncate">{item.pName}</p>
                  <div className="flex items-center mt-1">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {discounted ? (
                      <>
                        <span className="font-bold text-gray-900 text-sm">${discounted}</span>
                        <span className="text-gray-400 line-through text-xs">${item.pPrice}</span>
                      </>
                    ) : (
                      <span className="font-bold text-gray-900 text-sm">${item.pPrice}</span>
                    )}
                  </div>
                </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
const PromoBanner = () => (
  <FadeIn>
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div
        className="relative rounded-2xl overflow-hidden text-white text-center py-20 px-6 shadow-xl"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40" />
        <div className="relative z-10 max-w-lg mx-auto">
          <span className="inline-block bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Limited Time
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Summer Sale — Up to 20% Off</h2>
          <p className="text-base opacity-90 mb-7">Stock up on your favourites before they sell out. Discount applied automatically at checkout.</p>
          <a href="#shop" className="inline-block bg-yellow-400 text-gray-900 font-bold px-10 py-3.5 rounded-full hover:bg-yellow-300 transition-colors shadow-lg">
            Shop the Sale
          </a>
        </div>
      </div>
    </section>
  </FadeIn>
);

// ─── Testimonials ────────────────────────────────────────────────────────────
const REVIEWS = [
  { name: "Sarah M.", avatar: "SM", rating: 5, text: "Amazing quality and super fast shipping. Exactly what I was looking for — will definitely order again!" },
  { name: "James L.", avatar: "JL", rating: 5, text: "The electronics section is great. My new headphones arrived in perfect condition and sound incredible." },
  { name: "Priya K.", avatar: "PK", rating: 5, text: "Love the fashion range. Great prices and the quality is much better than I expected. Highly recommend." },
];

const Testimonials = () => (
  <section className="max-w-6xl mx-auto px-6 py-14">
    <SectionHeading badge="Reviews" title="Trusted by 5,000+ Customers" sub="Here's what our community is saying" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {REVIEWS.map((r, i) => (
        <FadeIn key={r.name} delay={i * 0.12}>
        <div
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full"
        >
          <div className="flex items-center space-x-1 mb-3">
            {[1,2,3,4,5].map(s => (
              <svg key={s} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
              {r.avatar}
            </div>
            <span className="font-semibold text-gray-800 text-sm">{r.name}</span>
          </div>
        </div>
        </FadeIn>
      ))}
    </div>
  </section>
);

// ─── Newsletter ───────────────────────────────────────────────────────────────
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <FadeIn>
      <section className="mx-6 md:mx-auto max-w-4xl mb-14">
        <div className="bg-gray-900 rounded-2xl px-8 py-12 text-center text-white shadow-xl">
          <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Exclusive Offer
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Get 10% Off Your First Order</h2>
          <p className="text-gray-400 text-sm mb-8">Join 5,000+ subscribers and be first to hear about new arrivals and exclusive deals.</p>
          {submitted ? (
            <p>
              <span role="img" aria-label="party">🎉</span> You're in! Check your inbox for your discount code.
            </p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-gray-900 font-bold px-7 py-3.5 rounded-full hover:bg-yellow-300 transition-colors text-sm whitespace-nowrap"
              >
                Claim 10% Off
              </button>
            </form>
          )}
        </div>
      </section>
    </FadeIn>
  );
};

// ─── HomeComponent ────────────────────────────────────────────────────────────
const HomeComponent = () => (
  <Fragment>
    <Slider />
    <TrustStrip />
    <FeaturedCategories />
    <TrendingSlider />
    <FlashSale />
    <BestSellers />
    <PromoBanner />

    {/* All Products section */}
    <section className="max-w-6xl mx-auto px-6 py-14" id="shop">
      <SectionHeading title="All Products" sub="Discover our full collection — fashion, electronics, home & more" />
      <ProductCategory />
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <SingleProduct />
      </div>
    </section>

    <Testimonials />
    <Newsletter />
  </Fragment>
);

const Home = () => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <HomeContext.Provider value={{ data, dispatch }}>
      <Layout children={<HomeComponent />} />
    </HomeContext.Provider>
  );
};

export default Home;
