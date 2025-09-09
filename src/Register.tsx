import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Shield,
  DollarSign,
  Star,
  User,
  CreditCard,
} from "lucide-react";

const RegisterCard: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 1️⃣ Register
      const registerResponse = await fetch(
        "http://localhost:3000/user/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(registerData.message || "Registration failed");
      }

      console.log("✅ Registered:", registerData);

      // 2️⃣ Auto login
      const loginResponse = await fetch(
        "http://localhost:3000/user/api/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Auto login failed");
      }

      // 3️⃣ Store tokens locally
      localStorage.setItem("accessToken", loginData.accessToken);
      localStorage.setItem("refreshToken", loginData.refreshToken);

      console.log("🔐 Logged in & tokens saved");

      // 4️⃣ Redirect
      window.location.href = "/home";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Left Illustration */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
        <div className="relative">
          {/* Credit card illustration */}
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

          {/* Floating elements */}
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
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded mt-2 relative">
              $
              <div className="absolute -top-1 left-3 w-2 h-2 bg-green-500 transform rotate-45"></div>
            </div>
          </div>

          <div className="absolute -right-16 bottom-8">
            <div className="bg-teal-400 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-teal-800" />
            </div>
            <div className="bg-yellow-400 text-yellow-800 text-xs px-2 py-1 rounded mt-2 relative flex items-center">
              <Star className="w-3 h-3 mr-1" />
              <Star className="w-3 h-3 mr-1" />
              <Star className="w-3 h-3" />
              <div className="absolute -top-1 right-3 w-2 h-2 bg-yellow-400 transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-0 backdrop-blur-sm bg-opacity-95">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-600 mb-2">Register</h1>
            <p className="text-gray-500 text-sm uppercase tracking-wide">
              JOIN TO US
            </p>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@gmail.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="•••"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {loading ? "Registering..." : "REGISTER"}
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => (window.location.href = "/login")}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                LOGIN HERE
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
