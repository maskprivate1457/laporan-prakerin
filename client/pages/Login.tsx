import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // GANTI URL DI BAWAH INI DENGAN URL FOTO/LOGO ANDA
  const URL_LOGO_OWNER = "https://img.freepik.com/free-vector/gradient-abstract-logo-template_23-2148204610.jpg";
  
  const ADMIN_EMAIL = "aldinodemias07@gmail.com";
  const ADMIN_PASSWORD = "@Mask_Private1457";
  const VISITOR_EMAIL = "visitor@pkl.com";
  const VISITOR_PASSWORD = "visitor123";
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", "Admin PKL");
        navigate("/");
      } else if (email === VISITOR_EMAIL && password === VISITOR_PASSWORD) {
        localStorage.setItem("isAdmin", "false");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", "Pengunjung");
        navigate("/");
      } else {
        setError("Email atau password salah. Silakan coba lagi.");
      }
      setIsLoading(false);
    }, 500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes rainbow-glow {
          0% { filter: drop-shadow(0 0 5px #ff0000) drop-shadow(0 0 10px #ff0000); }
          20% { filter: drop-shadow(0 0 5px #ff8000) drop-shadow(0 0 10px #ff8000); }
          40% { filter: drop-shadow(0 0 5px #ffff00) drop-shadow(0 0 10px #ffff00); }
          60% { filter: drop-shadow(0 0 5px #00ff00) drop-shadow(0 0 10px #00ff00); }
          80% { filter: drop-shadow(0 0 5px #0000ff) drop-shadow(0 0 10px #0000ff); }
          100% { filter: drop-shadow(0 0 5px #ff00ff) drop-shadow(0 0 10px #ff00ff); }
        }
        .animate-owner-logo {
          animation: float 4s ease-in-out infinite, rainbow-glow 3s linear infinite;
        }
      `}</style>

      <div className="w-full max-w-md">
        {/* Bagian Logo yang telah diubah */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
            {/* Background Glow Kelap Kelip */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-40 animate-pulse"></div>
            
            {/* Foto Logo Utama */}
            <img
              src={URL_LOGO_OWNER}
              alt="Logo Owner"
              className="relative w-20 h-20 object-cover rounded-full border-2 border-white/20 shadow-2xl animate-owner-logo"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
          <p className="text-slate-400">Laporan Prakerin Demias Syihab Aldino</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-6 shadow-lg shadow-blue-900/20"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? "Masuk..." : "Masuk"}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-600"></div>
            <span className="px-3 text-slate-400 text-sm">Demo Credentials</span>
            <div className="flex-1 border-t border-slate-600"></div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-slate-300 text-xs mb-1">Pengunjung:</p>
              <p className="text-slate-200 font-mono text-sm">visitor@pkl.com</p>
              <p className="text-slate-200 font-mono text-sm">visitor123</p>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          Gunakan akun demo untuk mengakses platform
        </p>
      </div>
    </div>
  );
             }        navigate("/");
      } else {
        setError("Email atau password salah. Silakan coba lagi.");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg mb-4">
            <span className="text-white font-bold text-2xl font-poppins">PKL</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Portal PKL</h1>
          <p className="text-slate-400">Dokumentasi Magang Profesional</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? "Masuk..." : "Masuk"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-600"></div>
            <span className="px-3 text-slate-400 text-sm">Demo Credentials</span>
            <div className="flex-1 border-t border-slate-600"></div>
          </div>

          {/* Demo Credentials */}
          <div className="space-y-3">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-slate-300 text-xs mb-1">Pengunjung:</p>
              <p className="text-slate-200 font-mono text-sm">
                visitor@pkl.com
              </p>
              <p className="text-slate-200 font-mono text-sm">visitor123</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Gunakan akun demo untuk mengakses platform
        </p>
      </div>
    </div>
  );
}
