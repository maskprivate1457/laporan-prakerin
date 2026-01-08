const NAMESPACE = "laporan-prakerin-demias-syihab"; 
const LIMIT_RESET = 20000;

export async function initializeTracking() {
  // Gunakan sessionStorage agar refresh halaman tidak menambah angka pengunjung (hanya tab baru)
  const isNewSession = !sessionStorage.getItem("has_counted");
  
  if (isNewSession) {
    try {
      // Menambah +1 untuk jumlah pengunjung unik
      await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/visits`);
      
      // Menandai bahwa sesi ini sudah dihitung
      sessionStorage.setItem("has_counted", "true");
      
      // Memberikan ID acak untuk sesi ini tanpa perulangan
      const randomId = "sess_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("current_sid", randomId);
    } catch (e) {
      console.warn("Gagal update visitor count");
    }
  }
  
  // Selalu tambah +1 untuk Page Views (setiap kali halaman dimuat)
  try {
    await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/pviews`);
  } catch (e) {}
}

export async function getStats() {
  try {
    // Mengambil data angka dari API publik
    const resVisits = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/visits`).then(r => r.json());
    const resViews = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/pviews`).then(r => r.json());

    const totalV = resVisits.value || 0;
    const totalP = resViews.value || 0;

    return {
      // Logika MODULO untuk Reset di angka 20.000
      visitorCount: totalV % LIMIT_RESET,
      viewCount: totalP % LIMIT_RESET,
      adminCount: Math.floor(totalV * 0.02) % LIMIT_RESET, // Simulasi login admin (2% dari trafik)
      liveNow: Math.floor(Math.random() * 4) + 1, // Simulasi user aktif (estetika)
      sessionId: sessionStorage.getItem("current_sid") || "Anonymous"
    };
  } catch (e) {
    return { visitorCount: 0, viewCount: 0, adminCount: 0, liveNow: 1, sessionId: "Offline" };
  }
}
