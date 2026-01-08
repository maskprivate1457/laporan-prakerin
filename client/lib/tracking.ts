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

export function initializeTracking(): void {
  const existingSession = localStorage.getItem(CURRENT_SESSION_KEY);
  
  if (!existingSession) {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const newSession: VisitorSession = {
      id: generateSessionId(),
      userType: isAdmin ? "admin" : "visitor",
      startTime: Date.now(),
      lastActivity: Date.now(),
      pages: [
        {
          path: window.location.pathname,
          timestamp: Date.now(),
        },
      ],
      device: {
        userAgent: navigator.userAgent,
        language: navigator.language,
      },
    };
    
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(newSession));
  }
}

export function trackPageView(path: string): void {
  const sessionStr = localStorage.getItem(CURRENT_SESSION_KEY);
  
  if (sessionStr) {
    const session: VisitorSession = JSON.parse(sessionStr);
    session.lastActivity = Date.now();
    session.pages.push({
      path,
      timestamp: Date.now(),
    });
    
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
  }
}

export function endSession(): void {
  const sessionStr = localStorage.getItem(CURRENT_SESSION_KEY);
  
  if (sessionStr) {
    const session: VisitorSession = JSON.parse(sessionStr);
    const allSessions = getAllSessions();
    allSessions.push(session);
    
    localStorage.setItem(TRACKING_KEY, JSON.stringify(allSessions));
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }
}

export function getAllSessions(): VisitorSession[] {
  const data = localStorage.getItem(TRACKING_KEY);
  return data ? JSON.parse(data) : [];
}

export function getCurrentSession(): VisitorSession | null {
  const data = localStorage.getItem(CURRENT_SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function getSessionStats() {
  const allSessions = getAllSessions();
  
  const stats = {
    totalSessions: allSessions.length,
    adminSessions: allSessions.filter((s) => s.userType === "admin").length,
    visitorSessions: allSessions.filter((s) => s.userType === "visitor").length,
    totalPageViews: allSessions.reduce((sum, s) => sum + s.pages.length, 0),
    avgSessionDuration:
      allSessions.length > 0
        ? Math.round(
            allSessions.reduce(
              (sum, s) => sum + (s.lastActivity - s.startTime),
              0
            ) / allSessions.length
          )
        : 0,
    mostVisitedPages: getMostVisitedPages(allSessions),
  };
  
  return stats;
}

function getMostVisitedPages(sessions: VisitorSession[]) {
  const pageVisits: { [key: string]: number } = {};
  
  sessions.forEach((session) => {
    session.pages.forEach((page) => {
      pageVisits[page.path] = (pageVisits[page.path] || 0) + 1;
    });
  });
  
  return Object.entries(pageVisits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, visits]) => ({
      path,
      visits,
    }));
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
