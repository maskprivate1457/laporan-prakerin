// src/lib/tracking.ts

export interface VisitorSession {
  id: string;
  userType: "admin" | "visitor";
  startTime: number;
  lastActivity: number;
  pages: { path: string; timestamp: number }[];
}

// Gunakan namespace unik untuk website Anda agar tidak bercampur dengan orang lain
const API_NAMESPACE = "portal_pkl_2026_unique_system";
const LIMIT_RESET = 20000;

/**
 * Fungsi untuk menghasilkan Session ID acak tanpa perulangan
 */
function generateUniqueId(): string {
  return 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

/**
 * Menghitung Pengunjung Menggunakan CountAPI (No Login, No Limit)
 */
async function hitCounter(key: string) {
  try {
    const res = await fetch(`https://api.countapi.xyz/hit/${API_NAMESPACE}/${key}`);
    const data = await res.json();
    return data.value || 0;
  } catch (e) {
    // Fallback jika API sedang sibuk
    const local = Number(localStorage.getItem(`backup_${key}`)) || 0;
    localStorage.setItem(`backup_${key}`, String(local + 1));
    return local + 1;
  }
}

/**
 * Mengambil Angka Statistik Saat Ini
 */
async function getCounterValue(key: string) {
  try {
    const res = await fetch(`https://api.countapi.xyz/get/${API_NAMESPACE}/${key}`);
    const data = await res.json();
    return data.value || 0;
  } catch (e) {
    return Number(localStorage.getItem(`backup_${key}`)) || 0;
  }
}

export async function initializeTracking(): Promise<void> {
  const isSessionStarted = sessionStorage.getItem("session_active");
  
  if (!isSessionStarted) {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    
    // Jalankan hit counter secara asinkron
    hitCounter("total_hits");
    if (isAdmin) {
      hitCounter("admin_hits");
    } else {
      hitCounter("visitor_hits");
    }

    // Set session agar tidak dihitung berulang saat refresh (hanya saat tab baru/login)
    sessionStorage.setItem("session_active", "true");
    sessionStorage.setItem("current_sid", generateUniqueId());
  }
}

export async function trackPageView(path: string): Promise<void> {
  // Hit counter khusus view halaman
  hitCounter("page_views");
}

export async function getSessionStats() {
  // Ambil data asli dari REST API
  const rawTotal = await getCounterValue("total_hits");
  const rawAdmin = await getCounterValue("admin_hits");
  const rawVisitor = await getCounterValue("visitor_hits");
  const rawViews = await getCounterValue("page_views");

  // INTEGRASI FUNGSI RESET 20.000 (MODULO)
  return {
    totalSessions: rawTotal % LIMIT_RESET,
    adminSessions: rawAdmin % LIMIT_RESET,
    visitorSessions: rawVisitor % LIMIT_RESET,
    totalPageViews: rawViews % LIMIT_RESET,
    // Data tambahan statis untuk UI
    activeNow: Math.floor(Math.random() * 5) + 1 // Simulasi user aktif
  };
  }
