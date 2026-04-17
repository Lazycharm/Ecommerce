import React, { Fragment, useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { data, dispatch } = useContext(LayoutContext);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  const cartCount = data.cartProduct !== null ? data.cartProduct.length : 0;

  return (
    <Fragment>
      <nav
        className={`fixed top-0 w-full z-20 bg-white transition-all duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Left: Desktop nav links */}
          <div className="hidden lg:flex items-center space-x-1 text-sm text-gray-600 font-medium">
            {[
              { label: "Shop", path: "/" },
              { label: "Blog", path: "/blog" },
              { label: "Contact", path: "/contact-us" },
            ].map((link) => (
              <span
                key={link.path}
                onClick={() => history.push(link.path)}
                className={`px-4 py-2 rounded-lg cursor-pointer tracking-wide transition-colors duration-150 ${
                  location.pathname === link.path
                    ? "bg-gray-100 text-gray-900 font-semibold"
                    : "hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </span>
            ))}
          </div>

          {/* Mobile: hamburger + logo */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={navberToggleOpen}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span
              onClick={() => history.push("/")}
              className="font-bold uppercase text-gray-900 text-xl tracking-widest cursor-pointer"
            >
              Hayroo
            </span>
          </div>

          {/* Center: Logo (desktop) */}
          <div
            onClick={() => history.push("/")}
            className="hidden lg:block font-bold uppercase text-gray-900 text-2xl tracking-widest cursor-pointer select-none"
          >
            Hayroo
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-1">
            {/* Wishlist */}
            <button
              onClick={() => history.push("/wish-list")}
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                location.pathname === "/wish-list" ? "bg-gray-100" : ""
              }`}
              title="Wishlist"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* User */}
            {localStorage.getItem("jwt") ? (
              <div
                className="userDropdownBtn relative p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                title="Account"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="userDropdown absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl min-w-max overflow-hidden z-50">
                  {!isAdmin() ? (
                    <ul className="py-1 text-sm text-gray-700">
                      {[
                        { label: "My Orders", path: "/user/orders" },
                        { label: "My Account", path: "/user/profile" },
                        { label: "My Wishlist", path: "/wish-list" },
                        { label: "Settings", path: "/user/setting" },
                      ].map((item) => (
                        <li
                          key={item.path}
                          onClick={() => history.push(item.path)}
                          className="px-5 py-2.5 hover:bg-gray-50 cursor-pointer font-medium transition-colors whitespace-nowrap"
                        >
                          {item.label}
                        </li>
                      ))}
                      <li
                        onClick={logout}
                        className="px-5 py-2.5 hover:bg-red-50 text-red-600 cursor-pointer font-medium border-t border-gray-100 transition-colors"
                      >
                        Logout
                      </li>
                    </ul>
                  ) : (
                    <ul className="py-1 text-sm text-gray-700">
                      <li
                        onClick={() => history.push("/admin/dashboard")}
                        className="px-5 py-2.5 hover:bg-gray-50 cursor-pointer font-medium transition-colors whitespace-nowrap"
                      >
                        Admin Panel
                      </li>
                      <li
                        onClick={logout}
                        className="px-5 py-2.5 hover:bg-red-50 text-red-600 cursor-pointer font-medium border-t border-gray-100 transition-colors"
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={loginModalOpen}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Login"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>
            )}

            {/* Cart */}
            <button
              onClick={cartModalOpen}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Cart"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            data.navberHamburger ? "block" : "hidden"
          } lg:hidden border-t border-gray-100 bg-white`}
        >
          <div className="px-4 py-3 flex flex-col space-y-1 text-sm font-medium text-gray-700">
            {[
              { label: "Shop", path: "/" },
              { label: "Blog", path: "/blog" },
              { label: "Contact", path: "/contact-us" },
            ].map((link) => (
              <span
                key={link.path}
                onClick={() => {
                  history.push(link.path);
                  dispatch({ type: "hamburgerToggle", payload: false });
                }}
                className="px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                {link.label}
              </span>
            ))}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navber;
