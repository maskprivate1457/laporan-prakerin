export interface VisitorSession {
  id: string;
  user_type: "admin" | "visitor";
  start_time: number;
  last_activity: number;
  pages: { path: string; timestamp: number }[];
  device: { userAgent: string; language: string };
}

// MASUKKAN DATA SUPABASE ANDA DI SINI
const SUPABASE_URL = "https://owbbbqvpxxzpwxqotvan.supabase.co/rest/v1/tracking";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YmJicXZweHh6cHd4cW90dmFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4Njk3NTAsImV4cCI6MjA4MzQ0NTc1MH0.F0gUo1bA4vNlUEOZ8sRELXuKzdtlARdVuc5M_bh-4OQ";
const LIMIT_RESET = 20000;

const headers = {
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

function generateSessionId(): string {
  return `sid_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
}

export async function initializeTracking(): Promise<void> {
  // Gunakan localStorage agar sesi tetap bertahan meski tab ditutup (opsional)
  // Tapi untuk testing, kita gunakan sessionStorage agar refresh session lebih mudah
  let sid = sessionStorage.getItem("current_sid");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  
  if (!sid) {
    sid = generateSessionId();
    
    const newSession: VisitorSession = {
      id: sid,
      user_type: isAdmin ? "admin" : "visitor",
      start_time: Date.now(),
      last_activity: Date.now(),
      pages: [{ path: window.location.pathname, timestamp: Date.now() }],
      device: { userAgent: navigator.userAgent, language: navigator.language }
    };
    
    try {
      const res = await fetch(SUPABASE_URL, {
        method: "POST",
        headers: { ...headers, "Prefer": "resolution=merge-duplicates" },
        body: JSON.stringify(newSession)
      });

      if (res.ok) {
        sessionStorage.setItem("current_sid", sid);
        console.log("Tracking Initialized:", sid);
      }
    } catch (e) {
      console.error("Gagal terhubung ke Supabase");
    }
  }
}

export async function trackPageView(path: string): Promise<void> {
  const sid = sessionStorage.getItem("current_sid");
  if (!sid) {
    // Jika sid hilang di tengah jalan, inisialisasi ulang
    await initializeTracking();
    return;
  }

  try {
    // Ambil data terbaru untuk menambah daftar halaman
    const res = await fetch(`${SUPABASE_URL}?id=eq.${sid}`, { headers });
    const data = await res.json();
    
    if (data && data[0]) {
      const updatedPages = [...data[0].pages, { path, timestamp: Date.now() }];
      
      await fetch(`${SUPABASE_URL}?id=eq.${sid}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({ 
          pages: updatedPages, 
          last_activity: Date.now() 
        })
      });
    }
  } catch (e) { 
    console.error("Gagal update page view"); 
  }
}

export async function getAdvancedStats() {
  try {
    const res = await fetch(`${SUPABASE_URL}?select=*`, { headers });
    const all: any[] = await res.json();
    if (!Array.isArray(all)) return null;

    const now = Date.now();
    const totalViews = all.reduce((sum, s) => sum + (s.pages?.length || 0), 0);

    return {
      total: all.length % LIMIT_RESET,
      admins: all.filter(s => s.user_type === 'admin').length % LIMIT_RESET,
      visitors: all.filter(s => s.user_type === 'visitor').length % LIMIT_RESET,
      live: all.filter(s => (now - s.last_activity) < 300000).length,
      mobile: Math.round((all.filter(s => /Mobi/i.test(s.device?.userAgent)).length / (all.length || 1)) * 100),
      views: totalViews % LIMIT_RESET,
      avgDepth: (totalViews / (all.length || 1)).toFixed(1),
      recent: all.slice().reverse().slice(0, 10)
    };
  } catch (e) { 
    return null; 
  }
}
