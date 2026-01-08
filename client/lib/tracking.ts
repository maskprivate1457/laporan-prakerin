/**
 * NAMESPACE: Kunci unik untuk memisahkan data Anda dengan pengguna lain di server publik.
 * Anda bisa mengganti teks ini dengan nama proyek Anda yang lebih spesifik.
 */
const NAMESPACE = "portal_pkl_be8097_2026_final"; 
const LIMIT_RESET = 20000;

/**
 * Menghasilkan ID Sesi acak tanpa perulangan menggunakan kombinasi 
 * Timestamp dan String Random.
 */
function generateRandomSessionId(): string {
  const randomPart = Math.random().toString(36).substring(2, 10);
  const timePart = Date.now().toString(36);
  return `sess_${timePart}_${randomPart}`;
}

/**
 * Inisialisasi Tracking:
 * Menghitung pengunjung baru (hanya jika sesi belum ada) 
 * dan menghitung total tayangan halaman.
 */
export async function initializeTracking(): Promise<void> {
  // Mengecek apakah browser sudah memiliki ID sesi
  const existingSid = sessionStorage.getItem("current_sid");
  
  if (!existingSid) {
    // Jika belum ada, buat ID baru dan simpan
    const newSid = generateRandomSessionId();
    sessionStorage.setItem("current_sid", newSid);
    
    try {
      // Tambah +1 ke counter 'visits' di server publik (hanya sekali per sesi)
      await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/visits`);
    } catch (error) {
      console.warn("Tracking Server: Visit counter skipped.");
    }
  }

  try {
    // Tambah +1 ke counter 'page_views' setiap kali fungsi ini dipanggil (setiap refresh/buka hal)
    await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/page_views`);
  } catch (error) {
    console.warn("Tracking Server: Page view counter skipped.");
  }
}

/**
 * Mengambil data statistik dari API untuk ditampilkan di dashboard admin.
 */
export async function getStats() {
  try {
    // Mengambil nilai angka saat ini dari server
    const resVisits = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/visits`).then(r => r.json());
    const resViews = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/page_views`).then(r => r.json());

    const rawVisits = resVisits.value || 0;
    const rawViews = resViews.value || 0;

    return {
      // Menerapkan fitur RESET di angka 20.000 menggunakan Modulo (%)
      visitorCount: rawVisits % LIMIT_RESET,
      viewCount: rawViews % LIMIT_RESET,
      // Simulasi Admin Log (misal 5% dari trafik dianggap login admin untuk tampilan dashboard)
      adminLogCount: Math.floor(rawVisits * 0.05) % LIMIT_RESET,
      // Memberikan angka acak kecil untuk indikator "Live" (1-5 orang)
      liveUsers: Math.floor(Math.random() * 5) + 1,
      // Mengambil ID sesi saat ini dari storage
      currentSessionId: sessionStorage.getItem("current_sid") || "Unknown"
    };
  } catch (error) {
    // Fallback jika API sedang tidak bisa dijangkau
    return {
      visitorCount: 0,
      viewCount: 0,
      adminLogCount: 0,
      liveUsers: 1,
      currentSessionId: "Offline"
    };
  }
}
