/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FileText, User } from 'lucide-react';
import { Icon } from "@iconify/react";
import { useLanguage } from "@/app/context/LanguageContext";

const MySwal = withReactContent(Swal);

import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import { ParamValue } from "next/dist/server/request/params";

const labels = {
  id: {
    studentDetails: "Detail Siswa",
    formTab: "Formulir Siswa",
    docTab: "Berkas Siswa",
    fullName: "Nama Lengkap",
    bloodType: "Golongan Darah",
    gender: "Jenis Kelamin",
    editStatus: "Edit Status",
    deleteDocs: "Hapus Berkas",
    confirmDelete: "Apakah Anda yakin ingin menghapus semua berkas siswa ini?",
    yesDelete: "Ya, hapus",
    cancel: "Batal",
    success: "Berhasil!",
    deleteSuccess: "Berkas berhasil dihapus.",
    deleteFail: "Gagal menghapus berkas.",
    error: "Error",
    major: "Jurusan",
    motherName: "Nama Ibu",
    parentPhone: "No. Telpon Orang Tua",
    fatherName: "Nama Ayah",
    address: "Alamat Rumah",
    schoolOrigin: "Asal Sekolah",
    motherJob: "Pekerjaan Ibu",
    nisn: "NISN",
    district: "Kecamatan",
    province: "Provinsi",
    city: "Asal Kota",
    fatherJob: "Pekerjaan Ayah",
    notUploaded: "Belum diupload",
    view: "Lihat",
    documentName: "Nama Dokumen",
    ijazah: "Ijazah",
    skl: "Surat Keterangan Lulus",
    rapor: "Rapor",
    akta: "Akta Kelahiran",
    foto: "Foto 3x4",
    kk: "Kartu Keluarga",
    changeStatus: "Ubah Status",
    selectStatus: "Pilih status baru",
    complete: "Lengkap",
    pending: "Menunggu",
    accepted: "Diterima",
    statusChanged: "Status berhasil diubah.",
    statusChangeFail: "Gagal mengubah status.",
    loading: "Memuat...",
  },
  en: {
    studentDetails: "Student Details",
    formTab: "Student Form",
    docTab: "Student Documents",
    fullName: "Full Name",
    bloodType: "Blood Type",
    gender: "Gender",
    editStatus: "Edit Status",
    deleteDocs: "Delete Documents",
    confirmDelete: "Are you sure you want to delete all student documents?",
    yesDelete: "Yes, delete",
    cancel: "Cancel",
    success: "Success!",
    deleteSuccess: "Documents deleted successfully.",
    deleteFail: "Failed to delete documents.",
    error: "Error",
    major: "Major",
    motherName: "Mother's Name",
    parentPhone: "Parent's Phone",
    fatherName: "Father's Name",
    address: "Home Address",
    schoolOrigin: "School Origin",
    motherJob: "Mother's Job",
    nisn: "NISN",
    district: "District",
    province: "Province",
    city: "City",
    fatherJob: "Father's Job",
    notUploaded: "Not uploaded yet",
    view: "View",
    documentName: "Document Name",
    ijazah: "Diploma",
    skl: "Graduation Letter",
    rapor: "Report Card",
    akta: "Birth Certificate",
    foto: "Photo 3x4",
    kk: "Family Card",
    changeStatus: "Change Status",
    selectStatus: "Select new status",
    complete: "Complete",
    pending: "Pending",
    accepted: "Accepted",
    statusChanged: "Status changed successfully.",
    statusChangeFail: "Failed to change status.",
    loading: "Loading...",
  },
};

type StudentData = {
  siswa: {
    id: string;
    nama?: string;
    golonganDarah?: string;
    jenisKelamin?: string;
    jurusan?: string;
    namaIbu?: string;
    noTelpOrtu?: string;
    namaAyah?: string;
    alamat?: string;
    asalSekolah?: string;
    pekerjaanIbu?: string;
    nisn?: string;
    kecamatan?: string;
    provinsi?: string;
    domisili?: string;
    pekerjaanAyah?: string;
  };
  berkas?: {
    ijazahUrl?: string;
    suratKeteranganLulusUrl?: string;
    raporUrl?: string;
    aktaKelahiranUrl?: string;
    foto3x4Url?: string;
    kartuKeluargaUrl?: string;
  };
};

type LanguageKey = keyof typeof labels;

const StudentDetailsPage = () => {
  const { language } = useLanguage() as { language: LanguageKey };
  const { id } = useParams();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [activeTab, setActiveTab] = useState("formulir");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/statistic");
      if (!res.ok) throw new Error(labels[language].error);

      const result = await res.json();
      const selectedStudent = result.dataSiswa.find(
        (item: { siswa: { id: ParamValue; }; }) => item.siswa.id === id
      );

      if (!selectedStudent) {
        throw new Error(labels[language].error);
      }

      setStudentData(selectedStudent);
    } catch (error) {
      console.error("Error fetching data:", error);
      MySwal.fire(labels[language].error, labels[language].error, "error");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, language]);

  const handleEditStatus = async () => {
    const result = await MySwal.fire({
      title: labels[language].changeStatus,
      input: "select",
      inputOptions: {
        complete: labels[language].complete,
        pending: labels[language].pending,
        accepted: labels[language].accepted,
      },
      inputPlaceholder: labels[language].selectStatus,
      showCancelButton: true,
      confirmButtonText: labels[language].changeStatus,
      cancelButtonText: labels[language].cancel,
    });

    if (result.isConfirmed && result.value) {
      try {
        const res = await fetch(`/api/siswa/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: result.value,
          }),
        });

        if (!res.ok) throw new Error(labels[language].statusChangeFail);

        await MySwal.fire(labels[language].success, labels[language].statusChanged, "success");
        fetchData();
      } catch (error) {
        console.error(error);
        MySwal.fire(labels[language].error, labels[language].statusChangeFail, "error");
      }
    }
  };

  if (!studentData) return <div className="p-4 md:p-8">{labels[language].loading}</div>;

  const student = studentData.siswa;
  const berkas = studentData.berkas || {};
  const documents = [
    { label: labels[language].ijazah, url: berkas.ijazahUrl },
    { label: labels[language].skl, url: berkas.suratKeteranganLulusUrl },
    { label: labels[language].rapor, url: berkas.raporUrl },
    { label: labels[language].akta, url: berkas.aktaKelahiranUrl },
    { label: labels[language].foto, url: berkas.foto3x4Url },
    { label: labels[language].kk, url: berkas.kartuKeluargaUrl },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#f3e8ff] to-[#e3f2fd] dark:from-[#1a223f] dark:via-[#232b4a] dark:to-[#1a223f]">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-30 w-64">
        <Sidebar />
      </div>

      {/* Mobile Sidebar - Show on mobile only */}
      <div className="md:hidden">
        <Sidebar />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 md:ml-64">
        <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-[#278550] dark:text-white tracking-tight">
          <span className="inline-block border-b-4 border-[#41AD89] pb-1">{labels[language].studentDetails}</span>
        </h1>

        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row gap-2 mb-4 md:mb-6">
          <button
            onClick={() => setActiveTab("formulir")}
            className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow transition ${
              activeTab === "formulir"
                ? "bg-gradient-to-r from-[#41AD89] to-[#278550] text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {labels[language].formTab}
          </button>
          <button
            onClick={() => setActiveTab("berkas")}
            className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow transition ${
              activeTab === "berkas"
                ? "bg-gradient-to-r from-[#41AD89] to-[#278550] text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {labels[language].docTab}
          </button>
        </div>

        {/* Student Header Card */}
        <div className="bg-white/90 dark:bg-white/10 rounded-2xl shadow-lg p-6 md:p-8 mb-6 flex flex-col md:flex-row items-center gap-6 border border-[#41AD89]/20">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#41AD89]/30 to-[#278550]/30 rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 border-white dark:border-[#232b4a]">
            {berkas.foto3x4Url ? (
              <img
                src={berkas.foto3x4Url}
                alt={labels[language].foto}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={48} className="text-gray-400" />
            )}
          </div>
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-[#278550]" />
              <span className="text-base md:text-lg text-[#278550] dark:text-white font-semibold">{labels[language].fullName}</span>
            </div>
            <input
              type="text"
              value={student?.nama || ""}
              readOnly
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-lg font-bold shadow-sm"
            />
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4">
              <div className="flex-1 md:max-w-[200px]">
                <span className="text-xs md:text-sm text-[#278550] dark:text-white block mb-1">{labels[language].bloodType}</span>
                <input
                  type="text"
                  value={student?.golonganDarah || "-"}
                  readOnly
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              <div className="flex-1 md:max-w-[220px]">
                <span className="text-xs md:text-sm text-[#278550] dark:text-white block mb-1">{labels[language].gender}</span>
                <input
                  type="text"
                  value={student?.jenisKelamin || "-"}
                  readOnly
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-end flex-1 gap-2 mt-2 md:mt-0">
                <button
                  onClick={handleEditStatus}
                  className="bg-gradient-to-r from-[#41AD89] to-[#278550] hover:from-[#278550] hover:to-[#41AD89] text-white px-4 md:px-10 py-2 rounded-lg w-full text-xs md:text-sm font-semibold shadow"
                >
                  {labels[language].editStatus}
                </button>
                <button
                  onClick={async () => {
                    const result = await MySwal.fire({
                      title: labels[language].deleteDocs,
                      text: labels[language].confirmDelete,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: labels[language].yesDelete,
                      cancelButtonText: labels[language].cancel,
                    });
                    if (result.isConfirmed) {
                      try {
                        const res = await fetch(`/api/siswa/${id}/berkas`, {
                          method: "DELETE",
                        });
                        if (!res.ok) throw new Error(labels[language].deleteFail);
                        await MySwal.fire(labels[language].success, labels[language].deleteSuccess, "success");
                        fetchData();
                      } catch (error) {
                        console.error(error);
                        MySwal.fire(labels[language].error, labels[language].deleteFail, "error");
                      }
                    }
                  }}
                  className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-500 text-white px-4 md:px-10 py-2 rounded-lg w-full text-xs md:text-sm font-semibold shadow"
                >
                  {labels[language].deleteDocs}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        {activeTab === "formulir" && (
          <div className="bg-white/90 dark:bg-white/10 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#278550]">
                <Icon icon="lucide:user" width={20} height={20} />
              </span>
              <span className="text-lg md:text-xl font-semibold text-[#278550] dark:text-white">{labels[language].formTab}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Jurusan */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-[#278550] dark:text-white block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:school-outline" className="text-[#278550]" width={16} height={16} />
                  {labels[language].major}
                </span>
                <input
                  type="text"
                  value={student?.jurusan || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* Nama Ibu */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-pink-600 dark:text-pink-300 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:human-female" className="text-pink-600" width={16} height={16} />
                  {labels[language].motherName}
                </span>
                <input
                  type="text"
                  value={student?.namaIbu || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* No. Telpon Orang Tua */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-blue-500 dark:text-blue-300 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:phone-outline" className="text-blue-500" width={16} height={16} />
                  {labels[language].parentPhone}
                </span>
                <input
                  type="text"
                  value={student?.noTelpOrtu || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* Nama Ayah */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-blue-700 dark:text-blue-300 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:human-male" className="text-blue-700" width={16} height={16} />
                  {labels[language].fatherName}
                </span>
                <input
                  type="text"
                  value={student?.namaAyah || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* Alamat Rumah */}
              <div className="md:col-span-2 lg:col-span-2 bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-yellow-600 dark:text-yellow-300 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:home-outline" className="text-yellow-600" width={16} height={16} />
                  {labels[language].address}
                </span>
                <input
                  type="text"
                  value={student?.alamat || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* Asal Sekolah */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-purple-600 dark:text-purple-300 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:school" className="text-purple-600" width={16} height={16} />
                  {labels[language].schoolOrigin}
                </span>
                <input
                  type="text"
                  value={student?.asalSekolah || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* Pekerjaan Ibu */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-pink-600 dark:text-pink-300 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:briefcase-outline" className="text-pink-600" width={16} height={16} />
                  {labels[language].motherJob}
                </span>
                <input
                  type="text"
                  value={student?.pekerjaanIbu || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* NISN */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-gray-700 dark:text-gray-200 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:card-account-details-outline" className="text-gray-700" width={16} height={16} />
                  {labels[language].nisn}
                </span>
                <input
                  type="text"
                  value={student?.nisn || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* Kecamatan */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-green-700 dark:text-green-300 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:map-marker-radius-outline" className="text-green-700" width={16} height={16} />
                  {labels[language].district}
                </span>
                <input
                  type="text"
                  value={student?.kecamatan || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* Provinsi */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-orange-600 dark:text-orange-300 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:earth" className="text-orange-600" width={16} height={16} />
                  {labels[language].province}
                </span>
                <input
                  type="text"
                  value={student?.provinsi || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* Asal Kota / Domisili */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-blue-400 dark:text-blue-300 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:city-variant-outline" className="text-blue-400" width={16} height={16} />
                  {labels[language].city}
                </span>
                <input
                  type="text"
                  value={student?.domisili || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
              {/* Pekerjaan Ayah */}
              <div className="bg-white dark:bg-[#232b4a] rounded-xl shadow p-4 border border-[#41AD89]/10">
                <span className="text-xs md:text-sm text-blue-600 dark:text-blue-300 block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:briefcase-outline" className="text-blue-600" width={16} height={16} />
                  {labels[language].fatherJob}
                </span>
                <input
                  type="text"
                  value={student?.pekerjaanAyah || "-"}
                  readOnly
                  className="w-full p-2 md:p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#232b4a] text-black dark:text-white text-xs md:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Berkas Tab Content */}
        {activeTab === "berkas" && (
          <div className="bg-white/90 dark:bg-white/10 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#278550]">
                <FileText size={20} />
              </span>
              <span className="text-lg md:text-xl font-semibold text-[#278550] dark:text-white">{labels[language].docTab}</span>
            </div>
            <div className="space-y-4">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#232b4a] border border-[#41AD89]/10 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 shadow"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* Document Preview or Icon */}
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#e3f2fd] to-[#e8f5e9] dark:from-[#232b4a] dark:to-[#1a223f] rounded-lg flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0 shadow">
                      {doc.url ? (
                        /\.(jpg|jpeg|png|webp|gif)$/i.test(doc.url) ? (
                          <img
                            src={doc.url}
                            alt={doc.label}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <FileText size={28} className="text-[#278550]" />
                        )
                      ) : (
                        <FileText size={28} className="text-gray-300" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[#278550] dark:text-white text-base truncate">{doc.label}</h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate">
                        {doc.url
                          ? `${labels[language].documentName}: ${doc.label
                              .toLowerCase()
                              .replace(/\s+/g, "")}.${doc.url.split(".").pop()}`
                          : labels[language].notUploaded}
                      </p>
                    </div>
                  </div>
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#41AD89] to-[#278550] hover:from-[#278550] hover:to-[#41AD89] text-white px-6 py-2 rounded-lg w-full md:w-auto text-center text-xs md:text-sm font-semibold shadow"
                    >
                      {labels[language].view}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailsPage;