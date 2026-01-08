export interface VisitorSession {
  id: string;
  userType: "admin" | "visitor";
  startTime: number;
  lastActivity: number;
  pages: { path: string; timestamp: number }[];
}

// ID BOX UNIK (Anda bisa mengganti string ini dengan apa saja untuk mereset database)
const BOX_ID = "box_pkl_tracker_2026_v1"; 
const API_URL = `https://keyvalue.xyz/api/v1/key/${BOX_ID}`;

const CURRENT_SESSION_KEY = "currentSession";
const LIMIT_RESET = 20000;

/**
 * Fungsi Utama: Mengambil dan Mengupdate Data di Cloud (Tanpa Login)
 */
async function cloudSync(action: 'read' | 'update', newData?: any) {
  try {
    if (action === 'read') {
      const res = await fetch(API_URL);
      const text = await res.text();
      return text ? JSON.parse(text) : [];
    } else {
      await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (e) {
    console.warn("API Sync Delay/Error");
    return [];
  }
}

export async function initializeTracking(): Promise<void> {
  const existing = localStorage.getItem(CURRENT_SESSION_KEY);
  if (!existing) {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const newSession: VisitorSession = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      userType: isAdmin ? "admin" : "visitor",
      startTime: Date.now(),
      lastActivity: Date.now(),
      pages: [{ path: window.location.pathname, timestamp: Date.now() }]
    };

    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(newSession));
    
    // Tarik data lama, tambah sesi baru, simpan balik
    const allSessions = await cloudSync('read');
    allSessions.push(newSession);
    await cloudSync('update', allSessions);
  }
}

export async function trackPageView(path: string): Promise<void> {
  const sessionStr = localStorage.getItem(CURRENT_SESSION_KEY);
  if (sessionStr) {
    const session: VisitorSession = JSON.parse(sessionStr);
    session.lastActivity = Date.now();
    session.pages.push({ path, timestamp: Date.now() });
    
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));

    // Update sesi yang spesifik di cloud
    const allSessions = await cloudSync('read');
    const index = allSessions.findIndex((s: any) => s.id === session.id);
    if (index !== -1) {
      allSessions[index] = session;
      await cloudSync('update', allSessions);
    }
  }
}

export async function getSessionStats() {
  const allSessions = await cloudSync('read');
  
  const raw = {
    totalSessions: allSessions.length,
    adminSessions: allSessions.filter((s: any) => s.userType === "admin").length,
    visitorSessions: allSessions.filter((s: any) => s.userType === "visitor").length,
    totalPageViews: allSessions.reduce((sum: number, s: any) => sum + (s.pages?.length || 0), 0),
    avgDuration: allSessions.length > 0 
      ? Math.round(allSessions.reduce((sum: number, s: any) => sum + (s.lastActivity - s.startTime), 0) / allSessions.length) 
      : 0,
    mostVisited: getMostVisited(allSessions)
  };

  // LOGIKA LIMIT 20.000 (Sesuai Tupoksi)
  return {
    totalSessions: raw.totalSessions % LIMIT_RESET,
    adminSessions: raw.adminSessions % LIMIT_RESET,
    visitorSessions: raw.visitorSessions % LIMIT_RESET,
    totalPageViews: raw.totalPageViews % LIMIT_RESET,
    avgDuration: raw.avgDuration,
    mostVisited: raw.mostVisited,
    rawTotal: raw.totalSessions // Simpan data asli jika butuh
  };
}

function getMostVisited(sessions: any[]) {
  const counts: { [key: string]: number } = {};
  sessions.forEach(s => s.pages?.forEach((p: any) => counts[p.path] = (counts[p.path] || 0) + 1));
  return Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,5).map(([path, visits]) => ({path, visits}));
}

export async function getAllSessions() {
  return await cloudSync('read');
    }
