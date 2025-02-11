// import React, { useEffect, useState } from "react";
// import { Search, User } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import logo from "../assets/logo2.jpg";

// const Navbar = ({ onSearch, isLogin, setIsLogin }) => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState({ name: "", role: "" });
//   const [isMenuOpen, setIsMenuOpen] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setUserInfo({
//           name: decodedToken.name,
//           role: decodedToken.role,
//         });
//         setIsLogin(true);
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         setIsLogin(false); // Invalidate state if decoding fails
//       }
//     } else {
//       setIsLogin(false); // No token found
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     setIsLogin(false);
//     navigate("/auth/login");
//   };

//   return (
//     <nav className="bg-black shadow-lg border-b border-yellow-500 font-[Montserrat]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
//         <div className="flex items-center justify-between h-28">
//           {/* Logo Section */}
//           <div className="flex-shrink-0">
//             <Link to="/">
//               {/* Add a Link component to wrap the logo */}
//               <img
//                 src={logo}
//                 alt="Mark & Park"
//                 className="h-28 w-auto object-contain" // Increased the logo size
//               />
//             </Link>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 mx-6">
//             <div className="relative max-w-lg mx-auto">
//               <input
//                 type="text"
//                 placeholder="Search events..."
//                 onChange={(e) => onSearch(e.target.value)}
//                 className="w-full px-6 py-5 pl-12 rounded-lg bg-gray-900 text-white
//                        placeholder-gray-400 border-2 border-yellow-500/20
//                        focus:border-yellow-500 focus:outline-none transition-colors text-xl" // Increased font size
//               />
//               <Search className="absolute left-4 top-3 h-6 w-6 text-yellow-500" />{" "}
//               {/* Increased icon size */}
//             </div>
//           </div>

//           {/* Navigation Options */}
//           <div className="hidden md:flex items-center gap-8">
//             {!isLogin ? (
//               <div className="flex items-center gap-6">
//                 <Link
//                   to="/auth/login"
//                   className="text-yellow-500 hover:text-yellow-400 font-medium
//                         transition-colors px-8 py-6 rounded-lg hover:bg-yellow-500/10 text-xl" // Increased font size
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/auth/register"
//                   className="bg-yellow-500 text-black px-8 py-4 rounded-lg
//                         hover:bg-yellow-400 font-medium transition-colors
//                         shadow-lg shadow-yellow-500/20 text-xl" // Increased font size
//                 >
//                   Register
//                 </Link>
//               </div>
//             ) : (
//               <div className="flex items-center gap-6">
//                 <User className="w-6 h-6 text-yellow-500" />{" "}
//                 {/* Increased icon size */}
//                 <div className="text-white/80 text-xl">
//                   {" "}
//                   {/* Increased font size */}
//                   {userInfo.name}{" "}
//                   <span className="text-yellow-500">({userInfo.role})</span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="text-yellow-800 hover:text-yellow-800 font-large
//                        px-10 py-5 rounded-lg border border-yellow-800/20
//                        hover:border-yellow-800 transition-all text-xl" // Increased font size
//                 >
//                   Logout
//                 </button>
//                 <Link
//                   to="/mybookings"
//                   className="text-yellow-500 hover:text-yellow-400 font-medium
//                         transition-colors px-6 py-4 rounded-lg hover:bg-yellow-500/10 text-xl" // Increased font size
//                 >
//                   My Bookings
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
//-------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import { User, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/logo2.jpg";

const Navbar = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", role: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo({
          name: decodedToken.name,
          role: decodedToken.role,
        });
        setIsLogin(true);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLogin(false);
      }
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLogin(false);
    navigate("/auth/login");
  };

  return (
    <nav className="bg-black/90 backdrop-blur-lg border-b border-yellow-500/20 shadow-lg fixed w-full z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logo}
                alt="Mark & Park"
                className="h-[6rem] w-auto object-contain hover:opacity-80 transition-opacity duration-300"
              />
            </Link>
          </div>

          {/* Navigation Options */}
          <div className="hidden md:flex items-center space-x-6">
            {!isLogin ? (
              <>
                <Link
                  to="/auth/login"
                  className="text-yellow-500 hover:text-yellow-400 font-medium
                        transition-colors duration-300 px-6 py-2 rounded-lg hover:bg-yellow-500/10 text-lg"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black
                        px-6 py-2 rounded-lg hover:from-yellow-400 hover:to-yellow-300
                        font-medium transition-all duration-300 shadow-lg shadow-yellow-500/20 text-lg"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-6 h-6 text-yellow-500" />
                    <div className="text-white/80 text-lg">
                      {userInfo.name}{" "}
                      <span className="text-yellow-500">({userInfo.role})</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-400
                         font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-yellow-500/10"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                  <Link
                    to="/mybookings"
                    className="text-yellow-500 hover:text-yellow-400 font-medium
                          transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-yellow-500/10 text-lg"
                  >
                    My Bookings
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-yellow-500 hover:text-yellow-400 focus:outline-none transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {!isLogin ? (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/auth/login"
                  className="text-yellow-500 hover:text-yellow-400 font-medium
                        transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-yellow-500/10 text-lg"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black
                        px-4 py-2 rounded-lg hover:from-yellow-400 hover:to-yellow-300
                        font-medium transition-all duration-300 shadow-lg shadow-yellow-500/20 text-lg"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="w-6 h-6 text-yellow-500" />
                  <div className="text-white/80 text-lg">
                    {userInfo.name}{" "}
                    <span className="text-yellow-500">({userInfo.role})</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-400
                       font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-yellow-500/10"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
                <Link
                  to="/mybookings"
                  className="text-yellow-500 hover:text-yellow-400 font-medium
                        transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-yellow-500/10 text-lg"
                >
                  My Bookings
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
