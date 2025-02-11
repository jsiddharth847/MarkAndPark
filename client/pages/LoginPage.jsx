import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Car, Mail, Lock } from "lucide-react";
import { ThreeCircles } from "react-loader-spinner";

const LoginPage = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("authToken", response.data.token);
      setIsLogin(true);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error || "Server Error. Please try again later."
      );
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
      <div className="mb-8 text-center relative">
        <div className="mb-4">
          <Car className="w-16 h-16 text-yellow-400 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-yellow-400 tracking-wider">
          MARK & PARK
        </h1>
        <p className="text-yellow-200 mt-2"> Parking Solutions</p>
      </div>

      {/* Main login form */}
      <div className="bg-gray-900 shadow-2xl rounded-lg p-8 w-full max-w-md border border-yellow-400 relative backdrop-blur-lg bg-opacity-80">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-center text-yellow-400">
            Welcome Back
          </h2>
          <p className="text-yellow-200/80 text-center">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                required
                className="w-full bg-gray-800 border border-yellow-400 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                required
                className="w-full bg-gray-800 border border-yellow-400 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 font-bold text-lg mt-8 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
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
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 h-full w-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out bg-yellow-300"></div>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-yellow-200">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/auth/register")}
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-200"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-yellow-200/80 hover:text-yellow-400 text-sm transition-colors duration-200"
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
