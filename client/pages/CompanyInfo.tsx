import Layout from "@/components/Layout";
import { Briefcase, MapPin, Phone, Mail, Globe, Download, Map } from "lucide-react";
import { downloadCompanyInfoPDF } from "@/lib/pdfExport";
import { useState, useEffect } from "react";

const defaultCompany = {
  name: "PT. Karya Teknik Nusantara",
  location: "Jl. Pasir Randu, Kp. Sampora, Desa.Jayasampurna, Kec. Serang Baru, Kab. Bekasi, Kode Pos  17330",
  phone: "+62 811-883-819",
  email: "ktn.jaya8@gmail.com",
  website: "ktnj.co.id",
  about:
    "PT Karya Teknik Nusantara Jaya bergerak di bidang engineering, pengecoran logam dan machining, dengan produk utama di bidang pompa industri heavy-duty, di samping produk-produk pengecoran dan engineering lainnya.<br/><br/>Dengan lebih dari 30 tahun pengalaman di industri, kami mampu menyediakan solusi yang komprehensif untuk memenuhi kebutuhan unik dan menantang dari klien kami. Melalui kehadiran domestik yang kuat dan komitmen terhadap standar global, kami mampu menyediakan layanan yang responsif dan produk-produk custom. Jika Anda memiliki tantangan atau kebutuhan spesifik, tim kami berdedikasi untuk berkolaborasi dengan Anda untuk mengembangkan solusi yang efektif.",
  internshipProgram:
    "Program magang kami dirancang untuk memberikan pengalaman praktis kepada mahasiswa, menambah wawasan, belajar kerjasama, disiplin, tanggung jawab, serta sebagai persyaratan Ujian Kenaikan Kelas.",
  mapUrl: "https://maps.google.com",
};

export default function CompanyInfo() {
  const [company, setCompany] = useState(defaultCompany);
  const [isAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  useEffect(() => {
    const saved = localStorage.getItem("companyInfo");
    if (saved) {
      setCompany(JSON.parse(saved));
    }
  }, []);

  const handleDownload = () => {
    downloadCompanyInfoPDF(company);
  };

  const handleViewMap = () => {
    window.open(company.mapUrl, "_blank");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-slide-in-left">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Informasi Perusahaan
            </h1>
            <p className="text-foreground/70">
              Detail tempat magang dan informasi kontak perusahaan
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            {isAdmin && (
              <button
                onClick={handleViewMap}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
              >
                <Map className="w-5 h-5" />
                Lihat Peta
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-6 shadow-lg">
              <Briefcase className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {company.name}
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground/70 text-sm">Lokasi</p>
                  <p className="font-semibold text-foreground">
                    {company.location}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground/70 text-sm">Telepon</p>
                  <p className="font-semibold text-foreground">
                    {company.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground/70 text-sm">Email</p>
                  <p className="font-semibold text-foreground">
                    {company.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground/70 text-sm">Website</p>
                  <p className="font-semibold text-foreground">
                    {company.website}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Tentang Perusahaan
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {company.about}
            </p>
            <div className="space-y-2">
              <div>
                <p className="text-foreground/70 text-sm">Industri</p>
                <p className="font-semibold text-foreground">
                  Teknologi & Inovasi
                </p>
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Karyawan</p>
                <p className="font-semibold text-foreground">500+ Karyawan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Departemen & Tim
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Divisi IT & Infrastructure",
              "Divisi Software Development",
              "Divisi User Interface & Design",
              "Divisi Business Intelligence",
            ].map((dept, idx) => (
              <div
                key={idx}
                className="p-4 bg-background rounded-lg border border-border"
              >
                <p className="font-semibold text-foreground">{dept}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Program Magang
          </h3>
          <p className="text-foreground/80 leading-relaxed mb-4">
            {company.internshipProgram}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground/70 text-sm">Durasi Magang</p>
              <p className="font-semibold text-primary text-lg">6 Bulan</p>
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Sertifikat</p>
              <p className="font-semibold text-primary text-lg">Tersedia</p>
            </div>
            <div>
              <p className="text-foreground/70 text-sm">Mentoring</p>
              <p className="font-semibold text-primary text-lg">Intensif</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
