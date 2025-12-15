export const downloadProfilePDF = (profileData: any) => {
  const content = `
PROFIL MAHASISWA
================================================
Nama: ${profileData.name}
NIM: ${profileData.nim}
Email: ${profileData.email}
Universitas: ${profileData.university}
Program Studi: ${profileData.major}
Tahun: ${profileData.year}
Periode Magang: ${profileData.internshipPeriod}
Pembimbing: ${profileData.supervisor}
Perusahaan: ${profileData.companyName}
Posisi: ${profileData.position}

DESKRIPSI
================================================
${profileData.bio}

Generated on: ${new Date().toLocaleDateString("id-ID")}
`;

  downloadTextAsFile(content, "profil-mahasiswa.txt");
};

export const downloadJournalPDF = (entries: any[]) => {
  let content = `LAPORAN JURNAL HARIAN
================================================\n\n`;

  entries.forEach((entry) => {
    content += `Judul: ${entry.title}\n`;
    content += `Tanggal: ${entry.date}\n`;
    content += `Mood: ${entry.mood}\n`;
    content += `Deskripsi:\n${entry.content}\n`;
    if (entry.activities && entry.activities.length > 0) {
      content += `Aktivitas:\n${entry.activities.map((a: string) => `- ${a}`).join("\n")}\n`;
    }
    content += `\n---\n\n`;
  });

  content += `Generated on: ${new Date().toLocaleDateString("id-ID")}\n`;
  downloadTextAsFile(content, "jurnal-harian.txt");
};

export const downloadReportPDF = (reportData: any) => {
  const content = `LAPORAN BULANAN
================================================
Bulan: ${reportData.month}
Status: ${reportData.status}

RINGKASAN AKTIVITAS
================================================
${reportData.summary || "Tidak ada data"}

PENCAPAIAN
================================================
${reportData.achievements || "Tidak ada data"}

TANTANGAN
================================================
${reportData.challenges || "Tidak ada data"}

Generated on: ${new Date().toLocaleDateString("id-ID")}
`;

  downloadTextAsFile(content, `laporan-${reportData.month}.txt`);
};

export const downloadPortfolioPDF = (portfolioData: any) => {
  let content = `PORTOFOLIO
================================================\n`;

  if (portfolioData.projects && Array.isArray(portfolioData.projects)) {
    portfolioData.projects.forEach((project: any) => {
      content += `\nProyek: ${project.title}\n`;
      content += `Deskripsi: ${project.description}\n`;
      content += `Teknologi: ${project.tech?.join(", ") || "N/A"}\n`;
      content += `---\n`;
    });
  }

  content += `\nPENCAPAIAN\n`;
  content += `================================================\n`;
  content += `${portfolioData.achievements || "Tidak ada data"}\n`;
  content += `\nGenerated on: ${new Date().toLocaleDateString("id-ID")}\n`;

  downloadTextAsFile(content, "portofolio.txt");
};

export const downloadDocumentationPDF = (docs: any[]) => {
  let content = `DOKUMENTASI
================================================\n\n`;

  docs.forEach((doc) => {
    content += `Judul: ${doc.title}\n`;
    content += `Tanggal: ${doc.date}\n`;
    content += `Status: ${doc.status}\n`;
    content += `Isi:\n${doc.content || "Tidak ada deskripsi"}\n`;
    content += `---\n\n`;
  });

  content += `Generated on: ${new Date().toLocaleDateString("id-ID")}\n`;
  downloadTextAsFile(content, "dokumentasi.txt");
};

export const downloadCompanyInfoPDF = (companyData: any) => {
  const content = `INFORMASI PERUSAHAAN
================================================
Nama: ${companyData.name}
Lokasi: ${companyData.location}
Telepon: ${companyData.phone}
Email: ${companyData.email}
Website: ${companyData.website}

TENTANG PERUSAHAAN
================================================
${companyData.about || "Tidak ada informasi"}

PROGRAM MAGANG
================================================
${companyData.internshipProgram || "Tidak ada informasi"}

Generated on: ${new Date().toLocaleDateString("id-ID")}
`;

  downloadTextAsFile(content, "informasi-perusahaan.txt");
};

// Helper function to download text as file
const downloadTextAsFile = (content: string, filename: string) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
