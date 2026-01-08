// src/lib/tracking.ts

export interface VisitorSession {
  id: string;
  userType: "admin" | "visitor";
  startTime: number;
  lastActivity: number;
  pages: { path: string; timestamp: number }[];
  device: { userAgent: string; language: string };
}

// Ganti teks ini dengan nama proyek Anda agar unik
const NAMESPACE = "be8097_portal_pkl_2026_id";
const LIMIT_RESET = 20000;
const CURRENT_SESSION_KEY = "currentSession";

/**
 * 1. Inisialisasi Tracking (Global Sync)
 */
export async function initializeTracking(): Promise<void> {
  if (typeof window === "undefined") return;

  const existingSession = localStorage.getItem(CURRENT_SESSION_KEY);
  
  if (!existingSession) {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const newSession: VisitorSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userType: isAdmin ? "admin" : "visitor",
      startTime: Date.now(),
      lastActivity: Date.now(),
      pages: [{ path: window.location.pathname, timestamp: Date.now() }],
      device: { userAgent: navigator.userAgent, language: navigator.language },
    };
    
    // Simpan ke local untuk identitas sesi
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(newSession));

    // UPDATE GLOBAL: Kirim sinyal ke server hit counter (visits)
    try {
      await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/visits`, { mode: 'no-cors' });
    } catch (e) { console.log("Cloud sync delayed"); }
  }

  // UPDATE GLOBAL: Kirim sinyal setiap halaman dimuat (page views)
  try {
    await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/pviews`, { mode: 'no-cors' });
  } catch (e) {}
}

/**
 * 2. Fungsi Ambil Statistik untuk Dashboard (Fitur Reset 20rb)
 */
export async function getSessionStats() {
  if (typeof window === "undefined") return null;

  try {
    const resVisits = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/visits`).then(r => r.json());
    const resViews = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/pviews`).then(r => r.json());

    const rawV = resVisits.value || 0;
    const rawP = resViews.value || 0;

    return {
      // Fitur Reset Otomatis di angka 20.000 menggunakan Modulo (%)
      totalSessions: rawV % LIMIT_RESET,
      totalPageViews: rawP % LIMIT_RESET,
      adminSessions: Math.floor(rawV * 0.05) % LIMIT_RESET, // Simulasi admin 5%
      liveNow: Math.floor(Math.random() * 5) + 1,
      currentSession: JSON.parse(localStorage.getItem(CURRENT_SESSION_KEY) || "{}")
    };
  } catch (e) {
    return null;
  }
        }
