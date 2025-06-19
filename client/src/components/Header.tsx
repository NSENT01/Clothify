import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Clothify.logo.png";
import axios from "axios";

{/* dynamic header based on route displayed */}
const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  {/* when user in protected wardrobe route, if logout button click delete and blacklist cookie and jwt through logout view */}
  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      await axios.post("/api/auth/logout/", { refresh }, { withCredentials: true });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  {/* different colors/ui and buttons based on route */}
  const BGHeader = () => {
    switch (location.pathname) {
      case "/":
        return {
          showLogout: false,
          text: "border-amber-50 text-amber-50",
          textbase: "text-amber-50",
          inv: "text-stone-800",
          underline: "before:bg-amber-50",
          transition: "bg-amber-50",
          hov: "bg-amber-50",
          bg: "bg-transparent",
        };
      case "/wardrobe":
        return {
          showLogout: true,
          text: "border-stone-800 text-stone-800",
          textbase: "text-stone-800",
          inv: "text-amber-50",
          underline: "before:bg-stone-800",
          transition: "bg-stone-800",
          hov: "bg-stone-800",
          bg: "bg-stone-100",
        };
      case "/login":
      case "/get-started":
      default:
        return {
          showLogout: false,
          text: "border-stone-800 text-stone-800",
          textbase: "text-stone-800",
          inv: "text-amber-50",
          underline: "before:bg-stone-800",
          transition: "bg-stone-800",
          hov: "bg-stone-800",
          bg: "bg-stone-100",
        };
    }
  };

  const { text, textbase, inv, underline, transition, hov, bg, showLogout } = BGHeader();

  {/* Only show shadow on logo if not on main body page */}
  const logoShadow = location.pathname === "/" ? "" : "shadow";

  return (
    <header className={`w-full ${bg}`}>
      <div className="w-full px-4 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div>
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Clothify logo" width="40" height="40" className={`rounded-xl ${logoShadow}`} />
            <span className="text-3xl font-sans font-normal text-stone-800">Clothify</span>
          </Link>
        </div>

        {/* Right: Navigation */}
        <nav className="hidden md:flex space-x-6 items-center justify-end flex-1">
          {showLogout ? (
            <button
              onClick={handleLogout}
              className={`relative group overflow-hidden flex items-center justify-center rounded-lg h-10 w-34 border-2 ${text} font-medium font-sans cursor-pointer`}
            >
              <span className={`absolute inset-0 ${hov} transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`} />
              <span className={`relative z-10 transition-colors duration-300 ${location.pathname === "/" ? "group-hover:text-stone-800" : "group-hover:text-amber-50"}`}>Log Out</span>
            </button>
          ) : (
            <>
              {/* Features dropdown */}
              <div className="relative group flex flex-col items-center">
                <p
                  className={`relative h-10 flex items-center ${textbase} cursor-pointer text-md before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full ${underline} before:scale-x-0 before:origin-left before:transition-transform before:duration-300 group-hover:before:scale-x-100`}
                >
                  Features
                </p>
                <div className="bg-transparent px-4 py-2 w-36 font-sans text-center items-center hidden group-hover:flex flex-col gap-2 absolute top-full z-50"></div>
                <div
                  className={`mt-2 px-4 py-2 w-36 font-sans text-center items-center hidden group-hover:flex flex-col gap-2 absolute top-full z-50 ${transition} ${inv}`}
                >
                  <Link to="/features/styling">Styling</Link>
                  <Link to="/features/closet">Closet</Link>
                  <Link to="/features/community">Community</Link>
                </div>
              </div>

              {/* Login */}
              <Link
                to="/login"
                className={`relative h-10 flex items-center ${textbase} text-md cursor-pointer group before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full ${underline} before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100`}
              >
                Login
              </Link>

              {/* Get Started Button */}
              <Link
                to="/get-started"
                className={`relative group overflow-hidden flex items-center justify-center rounded-lg h-10 w-34 border-2 ${text} font-medium font-sans cursor-pointer`}
              >
                <span className={`absolute inset-0 ${hov} transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0`} />
                <span className={`relative z-10 transition-colors duration-300 ${location.pathname === "/" ? "group-hover:text-stone-800" : "group-hover:text-amber-50"}`}>GET STARTED</span>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-end gap-4 px-6 pb-6 bg-transparent">
          <Link to="/features/styling" className="text-stone-800" onClick={() => setMenuOpen(false)}>Styling</Link>
          <Link to="/features/closet" className="text-stone-800" onClick={() => setMenuOpen(false)}>Closet</Link>
          <Link to="/features/community" className="text-stone-800" onClick={() => setMenuOpen(false)}>Community</Link>
          <Link to="/login" className="text-stone-800" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/get-started" className="border border-stone-800 text-stone-800 px-4 py-2" onClick={() => setMenuOpen(false)}>
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
