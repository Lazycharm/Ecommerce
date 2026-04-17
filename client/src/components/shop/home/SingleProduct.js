import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi";
import { HomeContext } from "./index";
import { isWishReq, unWishReq, isWish } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

// Resolves both CDN/external URLs and local upload filenames
const imgSrc = (path) =>
  path && path.startsWith("http") ? path : `${apiURL}/uploads/products/${path}`;

const SingleProduct = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const { products } = data;
  const history = useHistory();

  /* WhisList State */
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

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
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
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
          return (
            <Fragment key={index}>
              <div className="relative col-span-1 m-2 group">
                {/* Product Image */}
                <div
                  className="overflow-hidden bg-gray-100 cursor-pointer"
                  style={{ paddingBottom: "120%", position: "relative" }}
                  onClick={() => history.push(`/products/${item._id}`)}
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    src={imgSrc(item.pImages[0])}
                    alt={item.pName}
                  />
                  {/* Sale Badge */}
                  {item.pOffer && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      -{item.pOffer}%
                    </span>
                  )}
                  {item.pSold > 50 && !item.pOffer && (
                    <span className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-3 space-y-1">
                  <div
                    className="text-gray-800 font-medium text-sm leading-tight truncate cursor-pointer hover:text-yellow-700 transition-colors"
                    onClick={() => history.push(`/products/${item._id}`)}
                  >
                    {item.pName}
                  </div>

                  {/* Rating */}
                  {item.pRatingsReviews && item.pRatingsReviews.length > 0 && (
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-3 h-3 fill-current text-yellow-500"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500">({item.pRatingsReviews.length})</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    {discountedPrice ? (
                      <>
                        <span className="text-gray-900 font-semibold">${discountedPrice}</span>
                        <span className="text-gray-400 line-through text-sm">${item.pPrice}</span>
                      </>
                    ) : (
                      <span className="text-gray-900 font-semibold">${item.pPrice}</span>
                    )}
                  </div>
                </div>

                {/* Wishlist Button */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={(e) => isWishReq(e, item._id, setWlist)}
                    className={`${isWish(item._id, wList) ? "hidden" : ""} bg-white bg-opacity-80 rounded-full p-1.5 shadow hover:bg-opacity-100 transition`}
                  >
                    <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => unWishReq(e, item._id, setWlist)}
                    className={`${!isWish(item._id, wList) ? "hidden" : ""} bg-white bg-opacity-80 rounded-full p-1.5 shadow hover:bg-opacity-100 transition`}
                  >
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center py-24 text-gray-400">
          <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-1">Try adjusting your filters or check back soon</p>
        </div>
      )}
    </Fragment>
  );
};

export default SingleProduct;
