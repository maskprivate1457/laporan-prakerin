import { useState } from "react";
import Layout from "@/components/Layout";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Edit2,
  Save,
  X,
} from "lucide-react";

interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  industry: string;
  employees: string;
  description: string;
  departments: string[];
}

const initialInfo: CompanyInfo = {
  name: "PT. Karya Teknik Nusantara",
  address: "Jl. Pasir Randu Kp. Sampora RT. 001 RW. 001, Desa Jayasampurna, Kec. Serang Baru, Kab. Bekasi, Kode Pos 17330",
  phone: "+62 811-883-819",
  email: "ktn.jaya8@gmail.com",
  website: "https://indo.ktnj.co.id/",
  industry: "Teknik Kendaraan Ringan dan Berat",
  employees: "1000-3000",
  description: "",
  departments: ["Departemen 1", "Departemen 2"],
};

export default function Company() {
  const [info, setInfo] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem("companyInfo");
    return saved ? JSON.parse(saved) : initialInfo;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(info);
  const [departmentInput, setDepartmentInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDepartment = () => {
    if (departmentInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        departments: [...prev.departments, departmentInput],
      }));
      setDepartmentInput("");
    }
  };

  const handleRemoveDepartment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      departments: prev.departments.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    setInfo(formData);
    localStorage.setItem("companyInfo", JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(info);
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Informasi Perusahaan
            </h1>
            <p className="text-muted-foreground">
              Data lengkap tentang tempat magang Anda
            </p>
          </div>

          {/* Company Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header with Icon */}
            <div className="bg-gradient-to-r from-secondary-600 to-primary-600 h-32 relative">
              <div className="absolute bottom-0 left-8 translate-y-1/2">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                  <Building2 className="w-12 h-12 text-secondary-600" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-16 px-8 pb-8">
              {isEditing ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Edit Informasi Perusahaan
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nama Perusahaan
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Address */}
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

                    {/* Website */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Industry */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Industri
                      </label>
                      <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Employees */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Jumlah Karyawan
                      </label>
                      <input
                        type="text"
                        name="employees"
                        value={formData.employees}
                        onChange={handleInputChange}
                        placeholder="Contoh: 100-500"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Deskripsi Perusahaan
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      />
                    </div>

                    {/* Departments */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Departemen
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={departmentInput}
                          onChange={(e) => setDepartmentInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleAddDepartment();
                            }
                          }}
                          placeholder="Tambahkan departemen..."
                          className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <button
                          onClick={handleAddDepartment}
                          className="px-4 py-2 bg-primary-100 text-primary-600 rounded-lg font-semibold hover:bg-primary-200 transition-colors"
                        >
                          Tambah
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.departments.map((dept, index) => (
                          <div
                            key={index}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center gap-2"
                          >
                            {dept}
                            <button
                              onClick={() => handleRemoveDepartment(index)}
                              className="hover:text-primary-900"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
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
                        {info.name}
                      </h2>
                      <p className="text-muted-foreground mt-1">{info.industry}</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" /> Edit
                    </button>
                  </div>

                  {/* Info Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Address */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-secondary-100 rounded-lg h-fit">
                        <MapPin className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Alamat</p>
                        <p className="text-lg font-semibold text-foreground">
                          {info.address}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary-100 rounded-lg h-fit">
                        <Phone className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telepon</p>
                        <p className="text-lg font-semibold text-foreground">
                          {info.phone}
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
                          {info.email}
                        </p>
                      </div>
                    </div>

                    {/* Website */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary-100 rounded-lg h-fit">
                        <Globe className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <p className="text-lg font-semibold text-foreground">
                          {info.website}
                        </p>
                      </div>
                    </div>

                    {/* Employees */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-secondary-100 rounded-lg h-fit">
                        <Users className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Karyawan
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {info.employees}
                        </p>
                      </div>
                    </div>

                    {/* Industry */}
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary-100 rounded-lg h-fit">
                        <Building2 className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Industri</p>
                        <p className="text-lg font-semibold text-foreground">
                          {info.industry}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-6 bg-primary-50 rounded-xl border border-primary-200 mb-8">
                    <h3 className="font-semibold text-foreground mb-3">
                      Tentang Perusahaan
                    </h3>
                    <p className="text-foreground">{info.description}</p>
                  </div>

                  {/* Departments */}
                  {info.departments.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">
                        Departemen
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {info.departments.map((dept, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg text-sm font-semibold"
                          >
                            {dept}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
