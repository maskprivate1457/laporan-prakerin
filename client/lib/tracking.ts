export interface VisitorSession {
  id: string;
  userType: "admin" | "visitor";
  startTime: number;
  lastActivity: number;
  pages: {
    path: string;
    timestamp: number;
  }[];
  device: {
    userAgent: string;
    language: string;
  };
}

const TRACKING_KEY = "visitorTracking";
const CURRENT_SESSION_KEY = "currentSession";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 Menit dalam milidetik

// --- UTILS ---
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// --- CORE FUNCTIONS ---

/**
 * Menginisialisasi tracking. Memeriksa apakah sesi lama masih valid
 * atau perlu membuat sesi baru.
 */
export function initializeTracking(): void {
  const sessionStr = localStorage.getItem(CURRENT_SESSION_KEY);
  const now = Date.now();

  if (sessionStr) {
    const session: VisitorSession = JSON.parse(sessionStr);
    // Cek jika sesi sudah kadaluarsa (misal ditinggal tidur)
    if (now - session.lastActivity > SESSION_TIMEOUT) {
      endSession(); // Simpan yang lama ke history
      createNewSession(); // Mulai yang baru
    }
  } else {
    createNewSession();
  }
}

function createNewSession(): void {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const newSession: VisitorSession = {
    id: generateSessionId(),
    userType: isAdmin ? "admin" : "visitor",
    startTime: Date.now(),
    lastActivity: Date.now(),
    pages: [{ path: window.location.pathname, timestamp: Date.now() }],
    device: {
      userAgent: navigator.userAgent,
      language: navigator.language,
    },
  };
  localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(newSession));
}

/**
 * Mencatat perpindahan halaman
 */
export function trackPageView(path: string): void {
  const sessionStr = localStorage.getItem(CURRENT_SESSION_KEY);
  if (!sessionStr) {
    initializeTracking();
    return;
  }

  const session: VisitorSession = JSON.parse(sessionStr);
  session.lastActivity = Date.now();
  
  // Hindari duplikasi jika user refresh halaman yang sama berkali-kali secara instan
  const lastPage = session.pages[session.pages.length - 1];
  if (lastPage?.path !== path) {
    session.pages.push({ path, timestamp: Date.now() });
  }

  localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
}

/**
 * Memindahkan sesi aktif ke history (storage permanen)
 */
export function endSession(): void {
  const sessionStr = localStorage.getItem(CURRENT_SESSION_KEY);
  if (sessionStr) {
    const session: VisitorSession = JSON.parse(sessionStr);
    const allSessions = getAllSessions();
    
    // Cegah duplikasi ID saat menyimpan ke history
    if (!allSessions.find(s => s.id === session.id)) {
      allSessions.push(session);
      localStorage.setItem(TRACKING_KEY, JSON.stringify(allSessions));
    }
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }
}

export function getAllSessions(): VisitorSession[] {
  const data = localStorage.getItem(TRACKING_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Menghitung Statistik
 */
export function getSessionStats() {
  const allSessions = getAllSessions();
  if (allSessions.length === 0) return null;

  const totalDuration = allSessions.reduce((sum, s) => sum + (s.lastActivity - s.startTime), 0);

  return {
    totalSessions: allSessions.length,
    adminSessions: allSessions.filter((s) => s.userType === "admin").length,
    visitorSessions: allSessions.filter((s) => s.userType === "visitor").length,
    totalPageViews: allSessions.reduce((sum, s) => sum + s.pages.length, 0),
    avgSessionDurationMin: Math.round(totalDuration / allSessions.length / 60000), // dalam menit
    mostVisitedPages: getMostVisitedPages(allSessions),
  };
}

function getMostVisitedPages(sessions: VisitorSession[]) {
  const pageVisits: Record<string, number> = {};
  sessions.forEach((s) => {
    s.pages.forEach((p) => {
      pageVisits[p.path] = (pageVisits[p.path] || 0) + 1;
    });
  });

  return Object.entries(pageVisits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, visits]) => ({ path, visits }));
}
