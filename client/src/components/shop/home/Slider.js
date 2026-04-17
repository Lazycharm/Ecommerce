import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

// Static hero slides shown when no slider images are uploaded via admin
const STATIC_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80",
    headline: "New Season. New Look.",
    sub: "Discover premium fashion, electronics & more — curated for modern living.",
    cta: "Shop New Arrivals",
    href: "/",
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80",
    headline: "Summer Sale — Up to 20% Off",
    sub: "Limited-time deals across all categories. Free shipping on orders over $75.",
    cta: "View Sale Items",
    href: "/",
  },
  {
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&q=80",
    headline: "Tech Essentials",
    sub: "Top-rated gadgets and electronics to power your world.",
    cta: "Shop Electronics",
    href: "/",
  },
];

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const history = useHistory();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    sliderImages(dispatch);
    // Auto-advance static slides
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % STATIC_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasDbSlides = data.sliderImages && data.sliderImages.length > 0;

  if (hasDbSlides) {
    // Admin-uploaded slides (original behaviour)
    return (
      <Fragment>
        <div className="relative mt-16 bg-gray-100">
          <img
            className="w-full object-cover"
            style={{ maxHeight: "600px" }}
            src={`${apiURL}/uploads/customize/${data.sliderImages[slide % data.sliderImages.length].slideImage}`}
            alt="hero"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Welcome to Hayroo</h1>
            <p className="text-lg md:text-xl mb-6 max-w-xl opacity-90">Premium products for every lifestyle — fashion, tech, home & more.</p>
            <a href="#shop" className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors">
              Shop Now
            </a>
          </div>
          <button onClick={() => prevSlide(data.sliderImages.length, slide, setSlide)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2 shadow z-10">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={() => nextSlide(data.sliderImages.length, slide, setSlide)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2 shadow z-10">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <OrderSuccessMessage />
      </Fragment>
    );
  }

  // Static hero carousel (shown when no admin images uploaded)
  const activeSlide = STATIC_SLIDES[slide];
  return (
    <Fragment>
      <div className="relative mt-16 overflow-hidden" style={{ minHeight: "420px" }}>
        {STATIC_SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.headline}
              className="w-full h-full object-cover"
              style={{ minHeight: "420px" }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        ))}

        {/* Hero Copy */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-6 py-24 md:py-36">
          <span className="text-xs uppercase tracking-widest mb-3 opacity-75">Hayroo Store</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight max-w-3xl">
            {activeSlide.headline}
          </h1>
          <p className="text-base md:text-xl mb-8 max-w-xl opacity-90">
            {activeSlide.sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => history.push("/")}
              className="bg-white text-gray-900 font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors"
            >
              {activeSlide.cta}
            </button>
            <button
              onClick={() => history.push("/wish-list")}
              className="border border-white text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-gray-900 transition-colors"
            >
              View Wishlist
            </button>
          </div>
        </div>

        {/* Prev / Next */}
        <button
          onClick={() => setSlide((slide - 1 + STATIC_SLIDES.length) % STATIC_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2 shadow z-10"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button
          onClick={() => setSlide((slide + 1) % STATIC_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2 shadow z-10"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {STATIC_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === slide ? "bg-white w-4" : "bg-white bg-opacity-50"}`}
            />
          ))}
        </div>
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
