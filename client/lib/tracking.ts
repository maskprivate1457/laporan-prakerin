export interface VisitorSession {
  id: string;
  userType: "admin" | "visitor";
  startTime: number;
  lastActivity: number;
  pages: { path: string; timestamp: number }[];
  device: { userAgent: string; language: string };
}

// GANTI DENGAN DATA SUPABASE ANDA
const SUPABASE_URL = "https://owbbbqvpxxzpwxqotvan.supabase.co/rest/v1/tracking";
const SUPABASE_KEY = "sb_publishable_kMu8BismnkvBVv_6XJH0CA_KWAjxj7Q";
const LIMIT_RESET = 20000;

const headers = {
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

/**
 * ID Sesi Acak & Unik
 */
function generateSessionId(): string {
  return `sid_${Math.random().toString(36).substr(2, 9)}_${Date.now().toString(36)}`;
}

/**
 * Inisialisasi: Catat Pengunjung ke Database Supabase
 */
export async function initializeTracking(): Promise<void> {
  const existing = sessionStorage.getItem("current_sid");
  if (!existing) {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const sid = generateSessionId();
    
    const newSession: VisitorSession = {
      id: sid,
      userType: isAdmin ? "admin" : "visitor",
      startTime: Date.now(),
      lastActivity: Date.now(),
      pages: [{ path: window.location.pathname, timestamp: Date.now() }],
      device: { userAgent: navigator.userAgent, language: navigator.language }
    };

    try {
      await fetch(SUPABASE_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newSession)
      });
      sessionStorage.setItem("current_sid", sid);
    } catch (e) { console.error("Supabase Offline"); }
  }
}

/**
 * Mencatat Pergerakan Halaman
 */
export async function trackPageView(path: string): Promise<void> {
  const sid = sessionStorage.getItem("current_sid");
  if (sid) {
    try {
      // Ambil data lama dulu
      const res = await fetch(`${SUPABASE_URL}?id=eq.${sid}`, { headers });
      const data = await res.json();
      if (data[0]) {
        const session = data[0];
        session.pages.push({ path, timestamp: Date.now() });
        session.lastActivity = Date.now();

        // Update ke Supabase (PATCH)
        await fetch(`${SUPABASE_URL}?id=eq.${sid}`, {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify({ 
            pages: session.pages, 
            last_activity: session.lastActivity 
          })
        });
      }
    } catch (e) { console.log("Tracking sync error"); }
  }
}

/**
 * Logic 10 Fitur Analitik
 */
export async function getAdvancedStats() {
  try {
    const res = await fetch(SUPABASE_URL, { headers });
    const all: any[] = await res.json();
    const now = Date.now();

    const stats = {
      // Reset 20k
      total: all.length % LIMIT_RESET,
      admins: all.filter(s => s.user_type === 'admin').length % LIMIT_RESET,
      visitors: all.filter(s => s.user_type === 'visitor').length % LIMIT_RESET,
      
      // Analitik
      live: all.filter(s => (now - s.last_activity) < 300000).length,
      mobile: Math.round((all.filter(s => /Mobi/i.test(s.device.userAgent)).length / (all.length || 1)) * 100),
      views: (all.reduce((sum, s) => sum + (s.pages?.length || 0), 0)) % LIMIT_RESET,
      avgDepth: (all.reduce((sum, s) => sum + (s.pages?.length || 0), 0) / (all.length || 1)).toFixed(1),
      recent: all.slice().reverse().slice(0, 10)
    };
    return stats;
  } catch (e) { return null; }
}
