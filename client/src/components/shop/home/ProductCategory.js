import React, { Fragment, useContext } from "react";
import ProductCategoryDropdown from "./ProductCategoryDropdown";
import { HomeContext } from "./index";

const ProductCategory = (props) => {
  const { data, dispatch } = useContext(HomeContext);

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
        {/* Categories pill */}
        <button
          onClick={() => dispatch({ type: "categoryListDropdown", payload: !data.categoryListDropdown })}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
            data.categoryListDropdown
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10"/>
          </svg>
          <span>Categories</span>
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${data.categoryListDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <div className="flex items-center space-x-2">
          {/* Filter pill */}
          <button
            onClick={() => dispatch({ type: "filterListDropdown", payload: !data.filterListDropdown })}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
              data.filterListDropdown
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
            </svg>
            <span>Filter</span>
          </button>

          {/* Search pill */}
          <button
            onClick={() => dispatch({ type: "searchDropdown", payload: !data.searchDropdown })}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
              data.searchDropdown
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span>Search</span>
          </button>
        </div>
      </div>
      <ProductCategoryDropdown />
    </Fragment>
  );
};

export default ProductCategory;
