import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  CreditCard,
  DollarSign,
  Shield,
  Star,
  User,
} from "lucide-react";

interface LoginData {
  email: string;
  password: string;
}

const LoginCard: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/user/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        window.location.href = "/home";
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Left illustration */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
        <div className="relative">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl p-6 w-80 h-48 relative shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="text-white text-sm mb-4">
              <CreditCard className="w-8 h-8 mb-2" />
            </div>
            <div className="text-white text-xs mb-6">
              XXXX - XXXX - XXXX - XXXX
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white bg-opacity-40 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Floating icons */}
          <div className="absolute -top-4 -left-4 bg-green-500 rounded-full p-3 shadow-lg animate-bounce">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-2 -right-8 bg-blue-500 rounded-full p-3 shadow-lg animate-pulse">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-yellow-500 rounded-full p-3 shadow-lg animate-bounce delay-300">
            <Star className="w-6 h-6 text-white" />
          </div>

          {/* Characters */}
          <div className="absolute -left-16 top-8">
            <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-yellow-800" />
            </div>
          </div>
          <div className="absolute -right-16 bottom-8">
            <div className="bg-teal-400 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-teal-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Right form card */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-0 backdrop-blur-sm bg-opacity-95">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm uppercase tracking-wide">
              LOGIN TO CONTINUE
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  placeholder="•••"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-green-600 hover:text-green-700 text-sm font-semibold"
              >
                Forgot Password?
              </a>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  LOGGING IN...
                </div>
              ) : (
                "LOGIN"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
