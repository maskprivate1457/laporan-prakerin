import { useState } from "react";
import Layout from "@/components/Layout";
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Edit2, Save, X } from "lucide-react";

interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  nim: string;
  major: string;
  school: string;
  startDate: string;
  endDate: string;
  supervisor: string;
}

const initialProfile: StudentProfile = {
  name: "Demias Syihab Aldino",
  email: "aldinodemias07@gmail.com",
  phone: "+62895320372281",
  address: "Jl. Contoh, Kota",
  nis: "2024001",
  major: "Teknik Kendraan Ringan",
  school: "Sekolah Teknik Mesin",
  startDate: "2025-09-01",
  endDate: "2025-11-30",
  supervisor: "Haerudin S.Pd & Asep Haryono S.Pd",
};

export default function Profile() {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem("studentProfile");
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfile(formData);
    localStorage.setItem("studentProfile", JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Profil Mahasiswa
            </h1>
            <p className="text-muted-foreground">
              Kelola informasi pribadi dan data akademik Anda
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header with Avatar */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 h-32 relative">
              <div className="absolute bottom-0 left-8 translate-y-1/2">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                  <User className="w-12 h-12 text-primary-600" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-16 px-8 pb-8">
              {isEditing ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Edit Profil
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nama */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* NIM */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nomor Induk Mahasiswa (NIM)
                      </label>
                      <input
                        type="text"
                        name="nim"
                        value={formData.nim}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Program Studi */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Program Studi
                      </label>
                      <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Institusi */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Institusi
                      </label>
                      <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Alamat */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Alamat
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Tanggal Mulai */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Tanggal Mulai Magang
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Tanggal Selesai */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Tanggal Selesai Magang
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Pembimbing */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nama Pembimbing
                      </label>
                      <input
                        type="text"
                        name="supervisor"
                        value={formData.supervisor}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      <Save className="w-5 h-5" /> Simpan Perubahan
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                    >
                      <X className="w-5 h-5" /> Batal
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">
                        {profile.name}
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        {profile.major}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" /> Edit
                    </button>
                  </div>

                  {/* Profile Info Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Info Item */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary-100 rounded-lg h-fit">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Nomor Induk
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {profile.nim}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-secondary-100 rounded-lg h-fit">
                        <Mail className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-lg font-semibold text-foreground">
                          {profile.email}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary-100 rounded-lg h-fit">
                        <Phone className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Telepon
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {profile.phone}
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-secondary-100 rounded-lg h-fit">
                        <MapPin className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Alamat</p>
                        <p className="text-lg font-semibold text-foreground">
                          {profile.address}
                        </p>
                      </div>
                    </div>

                    {/* Institution */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary-100 rounded-lg h-fit">
                        <BookOpen className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Institusi
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {profile.school}
                        </p>
                      </div>
                    </div>

                    {/* Supervisor */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-secondary-100 rounded-lg h-fit">
                        <User className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Pembimbing
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {profile.supervisor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Internship Period */}
                  <div className="mt-8 p-6 bg-primary-50 rounded-xl border border-primary-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-primary-600" />
                      <h3 className="font-semibold text-foreground">
                        Periode Magang
                      </h3>
                    </div>
                    <p className="text-foreground">
                      <span className="font-semibold">
                        {new Date(profile.startDate).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                      {" - "}
                      <span className="font-semibold">
                        {new Date(profile.endDate).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Durasi: Kurang lebih{" "}
                      {Math.ceil(
                        (new Date(profile.endDate).getTime() -
                          new Date(profile.startDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      hari
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
