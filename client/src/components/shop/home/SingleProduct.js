import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi";
import { HomeContext } from "./index";
import { LayoutContext } from "../index";
import { isWishReq, unWishReq, isWish } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const imgSrc = (path) =>
  path && path.startsWith("http") ? path : `${apiURL}/uploads/products/${path}`;

const StarRating = ({ count = 5 }) => (
  <div className="flex items-center space-x-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className={`w-3 h-3 fill-current ${s <= count ? "text-yellow-400" : "text-gray-200"}`} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const SingleProduct = () => {
  const { data, dispatch } = useContext(HomeContext);
  const { products } = data;
  const history = useHistory();
  const { dispatch: layoutDispatch } = useContext(LayoutContext);
  const [addedMap, setAddedMap] = useState({});

  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  const quickAdd = (e, item) => {
    e.stopPropagation();
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    if (!cart.some((c) => c.id === item._id)) {
      cart.push({ id: item._id, quantitiy: 1, price: item.pPrice });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    const ids = cart.map((c) => c.id);
    layoutDispatch({ type: "inCart", payload: ids });
    setAddedMap((prev) => ({ ...prev, [item._id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [item._id]: false })), 1500);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getAllProduct();
      setTimeout(() => {
        if (responseData && responseData.Products) {
          dispatch({ type: "setProducts", payload: responseData.Products });
          dispatch({ type: "loading", payload: false });
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24">
        <div className="flex flex-col items-center space-y-3">
          <svg className="w-10 h-10 animate-spin text-yellow-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <span className="text-sm text-gray-400">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {products && products.length > 0 ? (
        products.map((item, index) => {
          const discountedPrice = item.pOffer
            ? (item.pPrice - (item.pPrice * parseInt(item.pOffer)) / 100).toFixed(0)
            : null;

          const getBadge = () => {
            if (item.pOffer) return { label: `-${item.pOffer}%`, cls: "badge-sale" };
            if (item.pSold > 80) return { label: "Best Seller", cls: "badge-hot" };
            if (item.pSold < 10) return { label: "New", cls: "badge-new" };
            return null;
          };
          const badge = getBadge();

          return (
            <div
              key={index}
              className="col-span-1 group card-lift rounded-2xl"
            >
              {/* Image container */}
              <div
                className="relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-sm group-hover:shadow-md transition-shadow duration-300"
                style={{ paddingBottom: "120%", position: "relative" }}
                onClick={() => history.push(`/products/${item._id}`)}
              >
                <img
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500"
                  style={{ transform: "scale(1)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  src={imgSrc(item.pImages[0])}
                  alt={item.pName}
                />

                {/* Badge */}
                {badge && (
                  <span className={`badge-product ${badge.cls} absolute top-2 left-2`}>
                    {badge.label}
                  </span>
                )}

                {/* Wishlist */}
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); isWishReq(e, item._id, setWlist); }}
                    className={`${isWish(item._id, wList) ? "hidden" : ""} bg-white/80 hover:bg-white rounded-full p-1.5 shadow backdrop-blur-sm transition`}
                  >
                    <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); unWishReq(e, item._id, setWlist); }}
                    className={`${!isWish(item._id, wList) ? "hidden" : ""} bg-white/80 hover:bg-white rounded-full p-1.5 shadow backdrop-blur-sm transition`}
                  >
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Quick View overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span
                    onClick={() => history.push(`/products/${item._id}`)}
                    className="bg-white text-gray-900 text-xs font-bold px-5 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer hover:bg-yellow-400"
                  >
                    Quick View
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-3 px-1 space-y-1">
                <p
                  className="text-gray-800 font-medium text-sm leading-tight truncate cursor-pointer hover:text-yellow-600 transition-colors"
                  onClick={() => history.push(`/products/${item._id}`)}
                >
                  {item.pName}
                </p>
                <StarRating count={item.pRatingsReviews && item.pRatingsReviews.length > 0 ? 5 : 4} />
                <div className="flex items-center space-x-2">
                  {discountedPrice ? (
                    <>
                      <span className="text-gray-900 font-bold text-sm">${discountedPrice}</span>
                      <span className="text-gray-400 line-through text-xs">${item.pPrice}</span>
                    </>
                  ) : (
                    <span className="text-gray-900 font-bold text-sm">${item.pPrice}</span>
                  )}
                </div>
                <button
                  onClick={(e) => quickAdd(e, item)}
                  className={`w-full mt-2 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
                    addedMap[item._id]
                      ? "bg-green-500 text-white"
                      : "bg-gray-900 text-white hover:bg-yellow-400 hover:text-gray-900"
                  }`}
                >
                  {addedMap[item._id] ? "✓ Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center py-24 text-gray-400">
          <svg className="w-14 h-14 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-lg font-medium text-gray-500">No products found</p>
          <p className="text-sm mt-1">Try adjusting your filters or check back soon</p>
        </div>
      )}
    </Fragment>
  );
};

export default SingleProduct;
