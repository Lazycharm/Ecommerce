import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";

export const HomeContext = createContext();

// Trust/value proposition strip
const TrustStrip = () => (
  <div className="bg-gray-50 border-y border-gray-200">
    <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-600">
      {[
        { icon: "🚚", title: "Free Shipping", sub: "On orders over $75" },
        { icon: "↩️", title: "Easy Returns", sub: "30-day hassle-free returns" },
        { icon: "🔒", title: "Secure Checkout", sub: "256-bit SSL encryption" },
        { icon: "💬", title: "24/7 Support", sub: "Real humans, always on call" },
      ].map((item) => (
        <div key={item.title} className="flex flex-col items-center py-2">
          <span className="text-2xl mb-1">{item.icon}</span>
          <span className="font-semibold text-gray-800">{item.title}</span>
          <span className="text-xs text-gray-500">{item.sub}</span>
        </div>
      ))}
    </div>
  </div>
);

const HomeComponent = () => {
  return (
    <Fragment>
      <Slider />
      {/* Trust Strip */}
      <TrustStrip />
      {/* Category, Search & Filter Section */}
      <section className="m-4 md:mx-8 md:my-6" id="shop">
        <ProductCategory />
      </section>
      {/* Section header */}
      <div className="mx-4 md:mx-8 mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">All Products</h2>
        <p className="text-sm text-gray-500 mt-1">Discover our full collection — fashion, electronics, home & more</p>
      </div>
      {/* Product Grid */}
      <section className="m-4 md:mx-8 md:my-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SingleProduct />
      </section>
      {/* Promo Banner */}
      <section className="mx-4 md:mx-8 my-8">
        <div
          className="relative rounded-xl overflow-hidden text-white text-center py-16 px-6"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=70')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl" />
          <div className="relative z-10">
            <span className="inline-block bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4">
              Limited Time Offer
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Summer Sale — Up to 20% Off</h2>
            <p className="text-base md:text-lg opacity-90 mb-6 max-w-lg mx-auto">
              Stock up on your favourites before they sell out. Sale prices applied automatically at checkout.
            </p>
            <a href="#shop" className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors">
              Shop the Sale
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const Home = (props) => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
