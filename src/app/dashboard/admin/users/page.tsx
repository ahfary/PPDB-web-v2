/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Sidebar from "@/app/components/sidebar";
import { FaEye, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import { useLanguage } from "@/app/context/LanguageContext";
import { User, GraduationCap } from "lucide-react";
import * as XLSX from "xlsx";

const MySwal = withReactContent(Swal);

const LIMIT = 5;

const labels = {
  id: {
    students: "Siswa",
    search: "Cari",
    name: "Nama",
    domicile: "Domisili",
    major: "Jurusan",
    phone: "Nomor Telepon",
    school: "Asal Sekolah",
    status: "Status",
    others: "Lainnya",
    notFound: "Tidak ada data yang ditemukan",
    detail: "Lihat Detail",
    close: "Tutup",
    confirmDeleteTitle: "Yakin ingin menghapus?",
    confirmDeleteText: "Data ini tidak dapat dikembalikan!",
    confirmDelete: "Ya, hapus!",
    cancel: "Batal",
    deleted: "Terhapus!",
    deleteSuccess: "Data berhasil dihapus.",
    deleteFail: "Gagal!",
    deleteFailMsg: "Terjadi kesalahan saat menghapus.",
    totalStudents: "Total Siswa",
    activeStudents: "Siswa Lengkap",
  },
  en: {
    students: "Students",
    search: "Search",
    name: "Name",
    domicile: "Domicile",
    major: "Major",
    phone: "Phone Number",
    school: "School Origin",
    status: "Status",
    others: "Others",
    notFound: "No data found",
    detail: "View Detail",
    close: "Close",
    confirmDeleteTitle: "Are you sure to delete?",
    confirmDeleteText: "This data cannot be restored!",
    confirmDelete: "Yes, delete!",
    cancel: "Cancel",
    deleted: "Deleted!",
    deleteSuccess: "Data deleted successfully.",
    deleteFail: "Failed!",
    deleteFailMsg: "An error occurred while deleting.",
    totalStudents: "Total Students",
    activeStudents: "Completed Students",
  },
};

type LanguageKey = keyof typeof labels;

const Users = () => {
  const { language } = useLanguage() as { language: LanguageKey };
  const label = labels[language];

  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1");
  const [dataSiswa, setDataSiswa] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState(label.name);

  // Stats
  const completedStudents = dataSiswa.filter((item) => item.siswa?.status === "complete").length;

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Tech Interview":
        return "bg-orange-100 text-orange-600";
      case "Task":
        return "bg-yellow-100 text-yellow-600";
      case "pending":
        return "bg-purple-100 text-purple-600";
      case "complete":
        return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/statistic");
        if (!res.ok) throw new Error("Gagal mengambil data siswa.");
        const result = await res.json();
        setDataSiswa(result.dataSiswa);
      } catch (error) {
        console.error("Error fetching data:", error);
        MySwal.fire("Error", "Gagal mengambil data siswa.", "error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = dataSiswa.filter((item: any) => {
      if (!term) return true;
      switch (filterBy) {
        case label.name:
          return item.siswa?.nama.toLowerCase().includes(term);
        case label.domicile:
          return item.siswa?.domisili.toLowerCase().includes(term);
        case label.major:
          return item.siswa?.jurusan.toLowerCase().includes(term);
        default:
          return false;
      }
    });

    setFilteredUsers(filtered);
  }, [searchTerm, filterBy, dataSiswa, label]);

  const startIndex = (pageParam - 1) * LIMIT;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + LIMIT);
  const totalPages = Math.ceil(filteredUsers.length / LIMIT);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/siswa/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || label.deleteFailMsg);
      }
      setDataSiswa((prev) => prev.filter((item: any) => item.siswa?.id !== id));
      MySwal.fire(label.deleted, label.deleteSuccess, "success");
    } catch (err: any) {
      console.error("Error deleting data:", err);
      MySwal.fire(label.deleteFail, err.message || label.deleteFailMsg, "error");
    }
  };

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  // Download as Excel
  const handleDownloadExcel = () => {
    // Format data for Excel
    const excelData = filteredUsers.map((item: any, idx: number) => ({
      No: idx + 1,
      Nama: item.siswa?.nama,
      Domisili: item.siswa?.domisili,
      Jurusan: item.siswa?.jurusan,
      "Nomor Telepon": item.siswa?.noTelpOrtu,
      "Asal Sekolah": item.siswa?.asalSekolah,
      Status: item.siswa?.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Siswa");

    XLSX.writeFile(workbook, "data_siswa.xlsx");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#f3e8ff] to-[#e3f2fd] text-gray-900 ">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-4 md:p-8 md:ml-0 dark:bg-gray-900">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-[#278550] tracking-tight">
              <span className="inline-block border-b-4 border-[#41AD89] dark:text-white pb-1">{label.students}</span>
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input
                className="input w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#41AD89] transition"
                placeholder={label.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="iconify" data-icon="mdi:magnify" style={{ fontSize: 18 }} />
              </span>
            </div>
            <select
              className="select rounded-xl border border-gray-200 bg-white dark:bg-gray-700 dark:text-white w-full md:w-auto focus:ring-2 focus:ring-[#41AD89] transition"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option>{label.name}</option>
              <option>{label.domicile}</option>
              <option>{label.major}</option>
            </select>
          </div>
          {/* Tambahkan tombol download */}
          <button
            onClick={handleDownloadExcel}
            className="btn bg-[#50A663] dark:bg-primary rounded-xl"
          >
            Download Excel
          </button>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-xl shadow-blue-500/30 backdrop-blur-sm border border-white/10 flex-1 min-w-[220px]">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-blue-100 text-sm">{label.totalStudents}</p>
                <p className="text-2xl font-bold text-white">{dataSiswa.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-xl shadow-emerald-500/30 backdrop-blur-sm border border-white/10 flex-1 min-w-[220px]">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-emerald-100 text-sm">{label.activeStudents}</p>
                <p className="text-2xl font-bold text-white">{completedStudents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container dengan tinggi maksimal */}
        <div
          className="bg-white/90 rounded-2xl shadow-lg text-gray-900 border border-[#41AD89]/10 "
          style={{ maxHeight: "60vh" }}
        >
            <table className="min-w-full dark:bg-gray-600 dark:text-white rounded-2xl overflow-hidden">
            <thead className="text-left text-[#278550] border-b dark:text-white ">
              <tr>
                <th className="p-3 md:p-4 text-xs md:text-base">No.</th>
                <th className="p-3 md:p-4 text-xs md:text-base">Photo</th>
                <th className="p-3 md:p-4 text-xs md:text-base">{label.name}</th>
                <th className="p-3 md:p-4 text-xs md:text-base hidden md:table-cell">{label.major}</th>
                <th className="p-3 md:p-4 text-xs md:text-base hidden md:table-cell">{label.phone}</th>
                <th className="p-3 md:p-4 text-xs md:text-base hidden md:table-cell">{label.school}</th>
                <th className="p-3 md:p-4 text-xs md:text-base">{label.status}</th>
                <th className="p-3 md:p-4 text-xs md:text-base">{label.others}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-[#e8f5e9]/60 border-b border-[#41AD89]/10 transition dark:bg-gray-800 dark">
                    <td className="p-3 md:p-4 text-xs md:text-base">{startIndex + index + 1}</td>
                    <td className="p-3 md:p-4">
                      <Image
                        src={item.berkas?.foto3x4Url || "https://randomuser.me/api/portraits/lego/1.jpg"}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#41AD89]/30"
                        alt="avatar"
                        width={48}
                        height={48}
                      />
                    </td>
                    <td className="p-3 md:p-4 dark:text-white">
                      <div className="font-semibold text-xs md:text-base text-black dark:text-info">{item.siswa?.nama}</div>
                      <div className="text-xs text-gray-500 md:block hidden dark:text-gray-300">{item.siswa?.alamat}</div>
                      <div className="text-xs text-gray-500 md:hidden block mt-1">{item.siswa?.jurusan}</div>
                    </td>
                    <td className="p-3 md:p-4 hidden md:table-cell text-xs md:text-base">{item.siswa?.jurusan}</td>
                    <td className="p-3 md:p-4 hidden md:table-cell text-xs md:text-base">{item.siswa?.noTelpOrtu}</td>
                    <td className="p-3 md:p-4 hidden md:table-cell text-xs md:text-base">{item.siswa?.asalSekolah}</td>
                    <td className="p-3 md:p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${getBadgeColor(
                          item.siswa?.status
                        )}`}
                      >
                        {item.siswa?.status}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 flex items-center gap-2 md:gap-3">
                      <button
                        className="text-[#278550] hover:text-[#41AD89] transition"
                        onClick={() =>
                          MySwal.fire({
                            title: <p>{item.siswa?.nama}</p>,
                            html: (
                              <div className="text-left">
                                <p><strong>{label.domicile}:</strong> {item.siswa?.domisili}</p>
                                <p><strong>{label.school}:</strong> {item.siswa?.asalSekolah}</p>
                                <p><strong>{label.major}:</strong> {item.siswa?.jurusan}</p>
                              </div>
                            ),
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonText: label.detail,
                            cancelButtonText: label.close,
                            reverseButtons: true,
                          }).then((result: any) => {
                            if (result.isConfirmed) {
                              router.push(`/dashboard/admin/users/detail/${item.siswa?.id}`);
                            }
                          })
                        }
                      >
                        <FaEye className="cursor-pointer" size={18} />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-500 transition"
                        onClick={async () => {
                          const result = await MySwal.fire({
                            title: label.confirmDeleteTitle,
                            text: label.confirmDeleteText,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: label.confirmDelete,
                            cancelButtonText: label.cancel,
                          });
                          if (result.isConfirmed) {
                            handleDelete(item.siswa?.id || "");
                          }
                        }}
                      >
                        <FaTrash className="cursor-pointer" size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-xs md:text-base">
                    {label.notFound}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        {/* Pagination pindah ke luar table */}
        <div className="flex justify-center md:justify-end p-4 dark:bg-gray-600 dark:text-white rounded-b-2xl overflow-hidden">
          <div className="join rounded-full overflow-hidden">
            <button
              className="join-item bg-gray-200 text-gray-500 btn btn-sm md:btn-md border-none rounded-l-full"
              onClick={() => pageParam > 1 && goToPage(pageParam - 1)}
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
          key={i}
          className={`join-item btn btn-sm md:btn-md border-none ${
            pageParam === i + 1
              ? "btn-active bg-[#41AD89] text-white"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => goToPage(i + 1)}
              >
          {i + 1}
              </button>
            ))}
            <button
              className="join-item bg-gray-200 text-gray-500 btn btn-sm md:btn-md border-none rounded-r-full"
              onClick={() => pageParam < totalPages && goToPage(pageParam + 1)}
            >
              »
            </button>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
};

export default Users;