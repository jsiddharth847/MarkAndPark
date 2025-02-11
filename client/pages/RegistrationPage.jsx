// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",------------------
//     phone: "",
//     aadharNumber: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name) errors.name = "Name is required.";
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
//       errors.email = "Valid email is required.";
//     if (!formData.phone || !/^\d{10}$/.test(formData.phone))
//       errors.phone = "Valid phone number is required.";
//     if (!formData.aadharNumber || formData.aadharNumber.length !== 12)
//       errors.aadharNumber = "Valid Aadhar number is required.";
//     if (!formData.password || formData.password.length < 6)
//       errors.password = "Password must be at least 6 characters.";
//     return errors;
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       Swal.fire({
//         title: "Validation Error",
//         text: Object.values(errors).join("\n"),
//         icon: "error",
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post("http://localhost:8000/api/auth/otp", {
//         email: formData.email,
//       });

//       const { value: otp } = await Swal.fire({
//         title: "Enter OTP",
//         input: "text",
//         inputLabel: "Check your email for the OTP",
//         inputPlaceholder: "Enter OTP here",
//         showCancelButton: true,
//         inputValidator: (value) => {
//           if (!value) return "OTP is required!";
//         },
//       });

//       if (otp) {
//         handleOtpSubmit(otp);
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error Sending OTP",
//         text: error.response?.data?.message || "Something went wrong.",
//         icon: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpSubmit = async (otp) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/auth/register",
//         { ...formData, otp }
//       );

//       Swal.fire({
//         title: "Registration Successful!",
//         text: "You will be redirected to the login page.",
//         icon: "success",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       setTimeout(() => {
//         window.location.href = "/login"; // Redirect to login page
//       }, 2000);
//     } catch (error) {
//       Swal.fire({
//         title: "Registration Failed",
//         text: error.response?.data?.message || "Something went wrong.",
//         icon: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
//       {loading && (
//         <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
//           {/* Bike Loader */}
//           <svg className="bike" viewBox="0 0 48 30" width="48px" height="30px">
//             <g
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="1"
//             >
//               <g transform="translate(9.5,19)">
//                 <circle
//                   className="bike__tire"
//                   r="9"
//                   strokeDasharray="56.549 56.549"
//                 />
//                 <g
//                   className="bike__spokes-spin"
//                   strokeDasharray="31.416 31.416"
//                   strokeDashoffset="-23.562"
//                 >
//                   <circle className="bike__spokes" r="5" />
//                   <circle
//                     className="bike__spokes"
//                     r="5"
//                     transform="rotate(180,0,0)"
//                   />
//                 </g>
//               </g>
//               <g transform="translate(24,19)">
//                 <g
//                   className="bike__pedals-spin"
//                   strokeDasharray="25.133 25.133"
//                   strokeDashoffset="-21.991"
//                   transform="rotate(67.5,0,0)"
//                 >
//                   <circle className="bike__pedals" r="4" />
//                   <circle
//                     className="bike__pedals"
//                     r="4"
//                     transform="rotate(180,0,0)"
//                   />
//                 </g>
//               </g>
//               <g transform="translate(38.5,19)">
//                 <circle
//                   className="bike__tire"
//                   r="9"
//                   strokeDasharray="56.549 56.549"
//                 />
//                 <g
//                   className="bike__spokes-spin"
//                   strokeDasharray="31.416 31.416"
//                   strokeDashoffset="-23.562"
//                 >
//                   <circle className="bike__spokes" r="5" />
//                   <circle
//                     className="bike__spokes"
//                     r="5"
//                     transform="rotate(180,0,0)"
//                   />
//                 </g>
//               </g>
//               <polyline
//                 className="bike__seat"
//                 points="14 3,18 3"
//                 strokeDasharray="5 5"
//               />
//               <polyline
//                 className="bike__body"
//                 points="16 3,24 19,9.5 19,18 8,34 7,24 19"
//                 strokeDasharray="79 79"
//               />
//               <path
//                 className="bike__handlebars"
//                 d="m30,2h6s1,0,1,1-1,1-1,1"
//                 strokeDasharray="10 10"
//               />
//               <polyline
//                 className="bike__front"
//                 points="32.5 2,38.5 19"
//                 strokeDasharray="19 19"
//               />
//             </g>
//           </svg>
//         </div>
//       )}
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
//         <form onSubmit={handleFormSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder="Enter your full name"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder="Enter your phone number"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Aadhar Number</label>
//             <input
//               type="text"
//               name="aadharNumber"
//               value={formData.aadharNumber}
//               onChange={handleInputChange}
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder="Enter your Aadhar number"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder="Enter your password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//           >
//             {loading ? "Processing..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ThreeCircles } from "react-loader-spinner";
import { Car, Mail, Phone, Key, User, CreditCard } from "lucide-react";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadharNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Form validation logic remains the same
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required.";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      errors.phone = "Valid phone number is required.";
    if (!formData.aadharNumber || formData.aadharNumber.length !== 12)
      errors.aadharNumber = "Valid Aadhar number is required.";
    if (!formData.password || formData.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    return errors;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Existing form submission and OTP logic
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Swal.fire({
        title: "Validation Error",
        text: Object.values(errors).join("\n"),
        icon: "error",
        background: "#1a1a1a",
        color: "#FFD700",
        confirmButtonColor: "#FFD700",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/auth/otp", {
        email: formData.email,
      });

      const otp = await handleOtpTimer();

      if (otp) {
        handleOtpSubmit(otp);
      }
    } catch (error) {
      Swal.fire({
        title: "Error Sending OTP",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        background: "#1a1a1a",
        color: "#FFD700",
        confirmButtonColor: "#FFD700",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpTimer = () => {
    return new Promise((resolve) => {
      let timerInterval;
      Swal.fire({
        title: "Enter OTP",
        html: `
          <div class="text-yellow-400">
            Check your email for the OTP.<br>
            <b>Time Remaining: <span id='timer'>05:00</span></b>
          </div>
        `,
        input: "text",
        inputPlaceholder: "Enter OTP here",
        showCancelButton: true,
        confirmButtonColor: "#FFD700",
        cancelButtonColor: "#333333",
        background: "#1a1a1a",
        color: "#FFD700",
        inputValidator: (value) => {
          if (!value) return "OTP is required!";
        },
        didOpen: () => {
          const timerElement = document.getElementById("timer");
          let timeLeft = 120;
          timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0");
            const seconds = (timeLeft % 60).toString().padStart(2, "0");
            timerElement.textContent = `${minutes}:${seconds}`;
            if (timeLeft <= 0) {
              clearInterval(timerInterval);
              Swal.close();
              resolve(null);
            }
          }, 1000);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        resolve(result.value || null);
      });
    });
  };

  const handleOtpSubmit = async (otp) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        ...formData,
        otp,
      });

      Swal.fire({
        title: "Registration Successful!",
        text: "Redirecting to login page...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#1a1a1a",
        color: "#FFD700",
      });

      setTimeout(() => {
        window.location.href = "http://localhost:5173/auth/login";
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        background: "#1a1a1a",
        color: "#FFD700",
        confirmButtonColor: "#FFD700",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-900 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 -left-32 top-1/4 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute w-64 h-64 -right-32 top-1/2 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Logo and company name */}
      <div className="mb-8 text-center relative mt-20">
        <div className="mb-4">
          <Car className="w-16 h-16 text-yellow-400 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-yellow-400 tracking-wider">
          MARK & PARK
        </h1>
        <p className="text-yellow-200 mt-2">Parking Solutions</p>
      </div>

      {/* Main registration form */}
      <div className="bg-gray-900 shadow-2xl rounded-lg p-8 w-full max-w-md border border-yellow-400 relative backdrop-blur-lg bg-opacity-80">
        <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">
          Create Account
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-yellow-400 mb-2 font-semibold">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-yellow-400 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-yellow-400 mb-2 font-semibold">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-yellow-400 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-yellow-400 mb-2 font-semibold">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-yellow-400 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-yellow-400 mb-2 font-semibold">
              Aadhar Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-yellow-400 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                placeholder="Enter your Aadhar number"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-yellow-400 mb-2 font-semibold">
              Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-yellow-400 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 font-bold text-lg mt-8 relative overflow-hidden group"
          >
            {loading ? (
              <ThreeCircles
                visible={true}
                height="30"
                width="30"
                color="#000000"
                ariaLabel="three-circles-loading"
                wrapperStyle={{ display: "flex", justifyContent: "center" }}
              />
            ) : (
              <>
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 h-full w-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out bg-yellow-300"></div>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-yellow-200">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-yellow-400 hover:text-yellow-300 font-semibold"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
