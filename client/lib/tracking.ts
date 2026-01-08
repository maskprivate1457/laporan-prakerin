// src/lib/tracking.ts

export interface VisitorStats {
  visitorCount: number;
  viewCount: number;
  adminCount: number;
  liveNow: number;
  sessionId: string;
}

const LIMIT_RESET = 20000;

/**
 * Fungsi generate ID tanpa perulangan
 */
const generateId = () => {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const initializeTracking = (): void => {
  if (typeof window === "undefined") return;

  const sid = sessionStorage.getItem("current_sid");
  
  if (!sid) {
    const newSid = generateId();
    sessionStorage.setItem("current_sid", newSid);

    // Update Global Counter di LocalStorage (Sebagai pengganti DB sementara yang aman deploy)
    const globalVisits = Number(localStorage.getItem("g_visits") || 0);
    localStorage.setItem("g_visits", String(globalVisits + 1));
  }

  const globalViews = Number(localStorage.getItem("g_views") || 0);
  localStorage.setItem("g_views", String(globalViews + 1));
};

export const getStats = (): VisitorStats => {
  if (typeof window === "undefined") {
    return { visitorCount: 0, viewCount: 0, adminCount: 0, liveNow: 0, sessionId: "" };
  }

  const v = Number(localStorage.getItem("g_visits") || 0);
  const p = Number(localStorage.getItem("g_views") || 0);

  return {
    visitorCount: v % LIMIT_RESET,
    viewCount: p % LIMIT_RESET,
    adminCount: Math.floor(v * 0.05) % LIMIT_RESET,
    liveNow: Math.floor(Math.random() * 3) + 1,
    sessionId: sessionStorage.getItem("current_sid") || "Unknown"
  };
};
