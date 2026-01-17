import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  Image as ImageIcon,
  Briefcase,
  BarChart3,
  ArrowRight,
  Github,
  Linkedin,
  Facebook,
  Mail,
  Twitter,
  Download,
  Terminal,
  Code2,
  Cpu
} from "lucide-react";
import Layout from "@/components/Layout";

export default function Home() {
  const features = [
    { icon: Users, title: "Profil Mahasiswa", path: "/profile", color: "text-blue-400" },
    { icon: Briefcase, title: "Informasi Perusahaan", path: "/company", color: "text-emerald-400" },
    { icon: BookOpen, title: "Jurnal Harian", path: "/journal", color: "text-purple-400" },
    { icon: ImageIcon, title: "Galeri Foto", path: "/gallery", color: "text-pink-400" },
    { icon: BarChart3, title: "Laporan Bulanan", path: "/report", color: "text-orange-400" },
    { icon: Code2, title: "Portofolio", path: "/portfolio", color: "text-yellow-400" },
  ];

  return (
    <Layout>
      {/* Hero Section - Cyberpunk/Developer Style */}
      <section className="relative py-16 md:py-28 mb-12 bg-[#020617] rounded-3xl overflow-hidden border border-slate-800 shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)]">
        {/* Background Pattern - Grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Profile Card (4 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-8 animate-slide-in-left">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative w-44 h-44 rounded-full border-2 border-slate-700 overflow-hidden bg-slate-900">
                  <img 
                    src="/placeholder-avatar.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              
              <div className="space-y-6 text-center lg:text-left">
                <div>
                  <h2 className="text-emerald-400 font-mono text-sm mb-2 flex items-center justify-center lg:justify-start gap-2">
                    <Terminal size={16} /> status --online
                  </h2>
                  <p className="text-slate-300 text-xl font-light leading-relaxed">
                    "Seorang <span className="text-white font-semibold">Fullstack Developer</span> yang terobsesi dengan performa kode dan arsitektur sistem yang bersih."
                  </p>
                </div>
                
                {/* Social Icons with Tooltips look */}
                <div className="flex justify-center lg:justify-start gap-5 text-slate-400">
                  {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                    <Icon key={i} className="w-5 h-5 cursor-pointer hover:text-emerald-400 transition-all hover:-translate-y-1" />
                  ))}
                </div>

                <button className="group relative px-8 py-3 bg-transparent text-emerald-400 border border-emerald-500/50 rounded-md overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <span className="relative z-10 flex items-center gap-2 font-mono text-sm">
                    <Download size={16} /> DOWNLOAD_CV.pdf
                  </span>
                  <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                </button>
              </div>
            </div>

            {/* Right Column: IDE Visual (7 Cols) */}
            <div className="lg:col-span-7 w-full animate-slide-in-right">
              <div className="bg-[#0f172a] rounded-lg border border-slate-700 shadow-2xl overflow-hidden font-mono text-[13px] leading-6">
                {/* Window Header */}
                <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <span className="text-slate-500 text-xs">AboutMe.ts — Edited</span>
                </div>
                
                {/* Code Body */}
                <div className="p-6 overflow-x-auto">
                  <table className="border-collapse">
                    <tbody>
                      {[
                        { l: "01", c: <><span className="text-pink-500">import</span> &#123; Developer, Passion &#125; <span className="text-pink-500">from</span> <span className="text-emerald-400">'@core/human'</span>;</> },
                        { l: "02", c: "" },
                        { l: "03", c: <><span className="text-blue-400">class</span> <span className="text-yellow-300">Bio</span> <span className="text-blue-400">extends</span> <span className="text-yellow-300">Developer</span> &#123;</> },
                        { l: "04", c: <>&nbsp;&nbsp;<span className="text-blue-400">readonly</span> <span className="text-slate-300">name</span> = <span className="text-emerald-400">'Abu Said'</span>;</> },
                        { l: "05", c: <>&nbsp;&nbsp;<span className="text-blue-400">public</span> <span className="text-slate-300">location</span> = <span className="text-emerald-400">'Dhaka, Bangladesh'</span>;</> },
                        { l: "06", c: <>&nbsp;&nbsp;<span className="text-blue-400">private</span> <span className="text-slate-300">stack</span> = [</> },
                        { l: "07", c: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">'React'</span>, <span className="text-emerald-400">'Node.js'</span>, <span className="text-emerald-400">'Postgres'</span>,</> },
                        { l: "08", c: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">'Docker'</span>, <span className="text-emerald-400">'AWS'</span></> },
                        { l: "09", c: <>&nbsp;&nbsp;];</> },
                        { l: "10", c: "" },
                        { l: "11", c: <>&nbsp;&nbsp;<span className="text-yellow-300">isAvailable</span>() &#123;</> },
                        { l: "12", c: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">return</span> <span className="text-orange-400">true</span>;</> },
                        { l: "13", c: <>&nbsp;&nbsp;&#125;</> },
                        { l: "14", c: <><span className="text-blue-400">&#125;</span></> },
                      ].map((row, idx) => (
                        <tr key={idx}>
                          <td className="pr-4 text-slate-600 text-right select-none w-8">{row.l}</td>
                          <td className="text-slate-300 whitespace-nowrap">{row.c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Bento Grid Features */}
      <section className="py-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-slate-800"></div>
          <h2 className="text-slate-400 font-mono text-sm uppercase tracking-[0.3em] flex items-center gap-2">
            <Cpu size={18} className="text-emerald-500" /> System_Modules
          </h2>
          <div className="h-px flex-1 bg-slate-800"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Link key={index} to={feature.path} className="group">
                <div className="relative h-full p-6 bg-[#0f172a] border border-slate-800 rounded-xl transition-all duration-300 group-hover:border-emerald-500/50 group-hover:bg-slate-900/50 overflow-hidden">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/5 -rotate-45 translate-x-4 -translate-y-4 group-hover:bg-emerald-500/20 transition-all"></div>
                  
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-slate-200 font-semibold mb-2 flex items-center gap-2">
                    {feature.title} 
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <div className="w-12 h-1 bg-slate-800 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
