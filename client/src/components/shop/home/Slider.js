import React, { Fragment, useEffect, useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";

const apiURL = process.env.REACT_APP_API_URL;
const SLIDE_DURATION = 6000; // ms — also controls progress bar

const STATIC_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80",
    headline: "Shop Smart.\nLive Better.",
    sub: "Premium tech, fitness & lifestyle essentials — delivered fast across UAE",
    cta: "Start Shopping",
    cta2: "Explore Categories",
    accent: "#f59e0b",
    badge: "Trusted by 5,000+ customers",
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    headline: "Summer Sale\nUp to 20% Off",
    sub: "Limited-time deals across all categories. Free UAE delivery on orders over AED 200.",
    cta: "View Sale Items",
    cta2: "All Products",
    accent: "#ef4444",
    badge: "Limited time offer",
  },
  {
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=80",
    headline: "Tech Essentials\nfor Modern Life",
    sub: "Top-rated gadgets and electronics — shipped same day in Dubai & Abu Dhabi.",
    cta: "Shop Electronics",
    cta2: "New Arrivals",
    accent: "#3b82f6",
    badge: "Same-day delivery available",
  },
];

const Slider = () => {
  const { data, dispatch } = useContext(HomeContext);
  const history = useHistory();
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  // Progress bar: resets each time slide changes
  const [progress, setProgress] = useState(0);
  const slideRef = useRef(0);
  const animatingRef = useRef(false);
  // Tracks current slide-count inside the autoplay interval (avoids stale closure)
  const slideCountRef = useRef(STATIC_SLIDES.length);

  // ── Unified slide array ────────────────────────────────────────────────────
  // DB images are normalized into the same shape as STATIC_SLIDES so we have
  // one render path for both cases. When no DB images exist, static slides are
  // used and _isUpload stays false.
  const dbImages = data.sliderImages || [];
  const activeSlides =
    dbImages.length > 0
      ? dbImages.map((s, i) => ({
          ...STATIC_SLIDES[i % STATIC_SLIDES.length],
          image: `${apiURL}/uploads/customize/${s.slideImage}`,
          _isUpload: true,
        }))
      : STATIC_SLIDES.map((s) => ({ ...s, _isUpload: false }));

  // Keep count ref current on every render (no effect needed – runs synchronously)
  slideCountRef.current = activeSlides.length;

  const goTo = (idx) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setAnimating(true);
    setTimeout(() => {
      slideRef.current = idx;
      setSlide(idx);
      animatingRef.current = false;
      setAnimating(false);
    }, 400);
  };

  useEffect(() => {
    sliderImages(dispatch);
    const timer = setInterval(() => {
      // slideCountRef.current is always up-to-date even after DB images load
      const next = (slideRef.current + 1) % slideCountRef.current;
      goTo(next);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Progress bar animation — resets when slide changes
  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / SLIDE_DURATION) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [slide]);

  const activeSlide = activeSlides[slide % activeSlides.length];

  return (
    <Fragment>
      <div
        className="relative mt-16 overflow-hidden bg-gray-900"
        style={{ height: "calc(100vh - 4rem)", maxHeight: "680px", minHeight: "520px" }}
      >
        {/* ── Image layer ── */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: animating ? 0 : 1 }}
        >
          {activeSlide._isUpload ? (
            /*
             * Smart display for admin-uploaded images.
             * Root-cause fix: uploaded images can be any aspect ratio (portrait,
             * square, wide). Using object-cover alone on a tall container causes
             * destructive zoom on portrait images. Solution:
             *   1. Blurred, scaled copy fills the letterbox areas with colour.
             *   2. The real image sits on top with object-contain — no cropping.
             *   3. Dark overlay ensures text legibility regardless of image tone.
             */
            <>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${activeSlide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(28px)",
                  transform: "scale(1.15)",
                  opacity: 0.45,
                }}
              />
              <img
                src={activeSlide.image}
                alt={activeSlide.headline}
                className="relative z-10 w-full h-full object-contain"
              />
            </>
          ) : (
            /* Wide landscape Unsplash images — object-cover is optimal */
            <img
              src={activeSlide.image}
              alt={activeSlide.headline}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* ── Hero content ── */}
        <div
          className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 md:px-20 max-w-3xl transition-all duration-500"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "translateY(0)",
            paddingTop: "80px",
            paddingBottom: "60px",
          }}
        >
          <span
            className="text-xs uppercase tracking-widest mb-4 font-semibold"
            style={{ color: activeSlide.accent }}
          >
            {activeSlide.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5 whitespace-pre-line">
            {activeSlide.headline}
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
            {activeSlide.sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => history.push("/")}
              style={{ background: activeSlide.accent }}
              className="text-gray-900 font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 shadow-lg text-sm tracking-wide"
            >
              {activeSlide.cta}
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("shop");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all duration-200 text-sm tracking-wide"
            >
              {activeSlide.cta2}
            </button>
          </div>
        </div>

        {/* ── Prev ── */}
        <button
          onClick={() => goTo((slide - 1 + activeSlides.length) % activeSlides.length)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 border border-white/20 text-white rounded-full p-3 z-10 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* ── Next ── */}
        <button
          onClick={() => goTo((slide + 1) % activeSlides.length)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 border border-white/20 text-white rounded-full p-3 z-10 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ── Progress bar ── */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-10">
          <div
            className="h-full bg-yellow-400"
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          />
        </div>

        {/* ── Dots ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === slide
                  ? "w-6 h-2.5 bg-yellow-400"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
