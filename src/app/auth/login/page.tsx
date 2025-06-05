/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // ganti dari email ke username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    setIsLoading(false);
    router.push("/dashboard/admin");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800' 
        : 'bg-gradient-to-br from-green-50 via-white to-green-100'
    }`}>
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: "url('/assets/Bg.png')" // Replace with your background image path
        }}
      />
      
      {/* Optional: Dark overlay for better text readability when using background image */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/30' : 'bg-white/20'}`} />
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 z-20 ${
          isDarkMode 
            ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' 
            : 'bg-white text-gray-600 hover:bg-gray-100'
        } shadow-lg`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Welcome section */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            {/* School logo - Using your actual logo image */}
            <div className="mx-auto mb-8 w-40 h-40 flex items-center justify-center">
              <img 
              src={isDarkMode ? "/assets/logo-white.png" : "/assets/logo-black.png"}
              alt="SMK Kreatif Nusantara Logo"
              className="w-55 h-55 object-contain drop-shadow-lg"
              />
            </div>
            
            <h1 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Selamat Datang di Dashboard Admin
            </h1>
            <p className={`text-xl font-semibold ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}>
              SMK KREATIF NUSANTARA
            </p>
            <p className={`mt-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Academy of Technology
            </p>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-slate-800/90 border border-slate-700' 
              : 'bg-white/95 border border-gray-200'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold flex items-center justify-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Login 
                <div className={`w-6 h-6 rounded ${
                  isDarkMode ? 'bg-green-400' : 'bg-green-500'
                }`}></div>
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username field */}
              <div>
                <label
                  htmlFor="username"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
                >
                  Username
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    id="username"
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/20' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500/20'
                    } focus:outline-none focus:ring-2`}
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-12 pr-12 py-3 border rounded-lg transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/20' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500/20'
                    } focus:outline-none focus:ring-2`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    } transition-colors duration-200`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 transform hover:scale-[1.02] active:scale-[0.98]'
                } text-white shadow-lg hover:shadow-xl`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Footer */}
            <div className={`mt-6 text-center text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Secure access to admin dashboard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;