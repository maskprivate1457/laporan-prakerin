import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Pastikan install: npm install framer-motion
import {
  Github,
  Linkedin,
  Facebook,
  Mail,
  Twitter,
  Download,
  Terminal,
  ChevronRight,
  Code2
} from "lucide-react";
import Layout from "@/components/Layout";

export default function Home() {
  // Variansi Animasi
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#0d1117] text-slate-300 font-sans selection:bg-emerald-500/30">
        
        {/* Header / Navbar Mockup */}
        <nav className="flex justify-between items-center py-6 px-4 md:px-12 border-b border-slate-800/50">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-emerald-400 font-mono text-xl font-bold flex items-center gap-2"
          >
            <span className="text-emerald-500">@</span>mask_private1457
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-slate-400">
            {['Projects', 'Skills', 'Contributions'].map((nav) => (
              <a key={nav} href="#" className="hover:text-emerald-400 transition-colors">{nav}</a>
            ))}
          </div>
        </nav>

        {/* Main Hero Content */}
        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* LEFT SIDE: Personal Info Card */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center text-center space-y-8"
            >
              {/* Profile Image with Glow */}
              <motion.div variants={item} className="relative">
                <div className="absolute -inset-1 bg-emerald-500 rounded-full blur opacity-20"></div>
                <div className="relative w-40 h-40 rounded-full border-4 border-slate-800 overflow-hidden">
                  <img 
                    src="/avatar.jpg" // Ganti dengan foto Anda
                    alt="Profile" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </motion.div>

              <motion.div variants={item} className="max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">Tentang Saya</h2>
                <p className="text-slate-400 leading-relaxed italic">
                  "Seorang Programmer Profesional & Ambisius. Saya sangat menyukai berbagai stack Software Engineering yang mencakup Frontend, Backend, dan DevOps."
                </p>
              </motion.div>

              {/* Social Icons - Exact same as image */}
              <motion.div variants={item} className="flex gap-6 text-emerald-400">
                <Github className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
                <Facebook className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
                <Mail className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
              </motion.div>

              <motion.button 
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full border border-slate-700 shadow-lg flex items-center gap-2 text-sm font-bold uppercase tracking-tighter"
              >
                Get Resume <Download size={16} />
              </motion.button>
            </motion.div>

            {/* RIGHT SIDE: Terminal / Code Block */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group"
            >
              {/* Terminal Frame */}
              <div className="w-full bg-[#161b22] rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono">
                <div className="bg-slate-800/40 px-4 py-3 flex gap-2 border-b border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>

                <div className="p-8 text-[14px] leading-relaxed">
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">1</span>
                    <p><span className="text-pink-500 font-bold">const</span> <span className="text-blue-400">coder</span> = &#123;</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">2</span>
                    <p className="pl-6"><span className="text-slate-300">name:</span> <span className="text-emerald-400">'ABU SAID'</span>,</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">3</span>
                    <p className="pl-6"><span className="text-slate-300">company:</span> <span className="text-emerald-400">'Tekon Private Limited'</span>,</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">4</span>
                    <p className="pl-6"><span className="text-slate-300">location:</span> <span className="text-emerald-400">'Dhaka, Bangladesh'</span>,</p>
                  </div>
                  <div className="flex gap-4 text-emerald-400/80">
                    <span className="text-slate-600 select-none">5</span>
                    <p className="pl-6 italic">// Typing skills...</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">6</span>
                    <p className="pl-6"><span className="text-slate-300">skills:</span> [</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">7</span>
                    <motion.p 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                      className="pl-12 text-emerald-400 whitespace-nowrap overflow-hidden border-r-2 border-emerald-500"
                    >
                      'React', 'NextJS', 'Tailwind', 'NodeJS', 'AWS'
                    </motion.p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">8</span>
                    <p className="pl-6">],</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">9</span>
                    <p className="pl-6"><span className="text-slate-300">hirable:</span> <span className="text-orange-400 font-bold">true</span></p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">10</span>
                    <p>&#125;;</p>
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </motion.div>
          </div>

          {/* Bottom Divider Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 pt-12 border-t border-slate-800 text-center"
          >
            <div className="inline-block px-6 py-2 bg-slate-900 border border-slate-700 rounded-full text-xs font-mono uppercase tracking-[0.4em] text-emerald-400 shadow-inner">
              GitHub Statistics
            </div>
          </motion.div>
        </main>
      </div>
    </Layout>
  );
}
