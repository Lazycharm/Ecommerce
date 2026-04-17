import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";

const apiURL = process.env.REACT_APP_API_URL;

const STATIC_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80",
    headline: "Discover Premium\nEveryday Essentials",
    sub: "Fashion, Tech, Home — curated for modern living",
    cta: "Shop Now",
    cta2: "Explore Categories",
    accent: "#f59e0b",
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    headline: "Summer Sale\nUp to 20% Off",
    sub: "Limited-time deals across all categories. Free shipping on orders over $75.",
    cta: "View Sale Items",
    cta2: "All Products",
    accent: "#ef4444",
  },
  {
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=80",
    headline: "Tech Essentials\nfor Modern Life",
    sub: "Top-rated gadgets and electronics to power your world.",
    cta: "Shop Electronics",
    cta2: "New Arrivals",
    accent: "#3b82f6",
  },
];

const Slider = () => {
  const { data, dispatch } = useContext(HomeContext);
  const history = useHistory();
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    sliderImages(dispatch);
    const timer = setInterval(() => {
      goTo((prev) => (prev + 1) % STATIC_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (idxOrFn) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setSlide(typeof idxOrFn === "function" ? idxOrFn(slide) : idxOrFn);
      setAnimating(false);
    }, 300);
  };

  const hasDbSlides = data.sliderImages && data.sliderImages.length > 0;

  if (hasDbSlides) {
    return (
      <Fragment>
        <div className="relative mt-16 bg-gray-900 overflow-hidden" style={{ minHeight: "500px" }}>
          <img
            className="w-full object-cover"
            style={{ maxHeight: "600px", minHeight: "500px" }}
            src={`${apiURL}/uploads/customize/${data.sliderImages[slide % data.sliderImages.length].slideImage}`}
            alt="hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent flex flex-col items-start justify-center px-10 md:px-20">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 leading-tight max-w-xl">
              Discover Premium Everyday Essentials
            </h1>
            <p className="text-gray-200 text-lg mb-8 max-w-md">Fashion, Tech, Home — curated for modern living</p>
            <button onClick={() => history.push("/")} className="bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-all duration-200 shadow-lg">
              Shop Now
            </button>
          </div>
        </div>
        <OrderSuccessMessage />
      </Fragment>
    );
  }

  const activeSlide = STATIC_SLIDES[slide];

  return (
    <Fragment>
      <div className="relative mt-16 overflow-hidden bg-gray-900" style={{ minHeight: "520px" }}>
        {/* Background image — CSS fade transition */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: animating ? 0 : 1 }}
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.headline}
            className="w-full h-full object-cover"
            style={{ minHeight: "520px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Hero content */}
        <div
          className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 py-28 md:py-36 max-w-3xl transition-all duration-500"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)" }}
        >
          <span className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: activeSlide.accent }}>
            Trusted by 5,000+ customers
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5 whitespace-pre-line">
            {activeSlide.headline}
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-lg">{activeSlide.sub}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => history.push("/")}
              style={{ background: activeSlide.accent }}
              className="text-gray-900 font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 shadow-lg text-sm tracking-wide"
            >
              {activeSlide.cta}
            </button>
            <button
              onClick={() => { const el = document.getElementById("shop"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              className="border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all duration-200 text-sm tracking-wide"
            >
              {activeSlide.cta2}
            </button>
          </div>
        </div>

        {/* Prev */}
        <button
          onClick={() => goTo((slide - 1 + STATIC_SLIDES.length) % STATIC_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 border border-white/20 text-white rounded-full p-3 z-10 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        {/* Next */}
        <button
          onClick={() => goTo((slide + 1) % STATIC_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 border border-white/20 text-white rounded-full p-3 z-10 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {STATIC_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${i === slide ? "w-6 h-2 bg-yellow-400" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
