/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Sidebar from "@/app/components/sidebar";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import Navbar from "@/app/components/navbar";

const labels = {
  id: {
    title: "Hasil Test",
    studentName: "Nama Siswa",
    matematika: "Matematika",
    inggris: "Bahasa Inggris",
    agama: "Agama",
    psikolog: "Psikolog",
    rataRata: "Rata-rata",
    status: "Status",
    lulus: "Lulus",
    tidakLulus: "Tidak Lulus",
    noData: "Tidak ada data",
    nilai: "Nilai",
    subjects: "Mata Pelajaran",
    search: "Cari nama siswa...",
    filter: "Filter Status",
    all: "Semua",
  },
  en: {
    title: "Test Results",
    studentName: "Student Name",
    matematika: "Mathematics",
    inggris: "English",
    agama: "Religion",
    psikolog: "Psychology",
    rataRata: "Average",
    status: "Status",
    lulus: "Passed",
    tidakLulus: "Not Passed",
    noData: "No data",
    nilai: "Score",
    subjects: "Subjects",
    search: "Search student name...",
    filter: "Filter Status",
    all: "All",
  },
};

type LanguageKey = keyof typeof labels;

interface Hasil {
  studentName: string;
  matematika: number;
  inggris: number;
  agama: number;
  psikolog: number;
  rataRata: number;
  status: string;
}

// Card Component untuk Mobile
function StudentCard({ student, label }: { student: Hasil; label: any }) {
  const isPass = student.status === "Lulus" || student.status === "Passed";
  return (
    <div className="bg-white dark:bg-[#0F103F] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 mb-4 hover:shadow-md transition-shadow">
      {/* Header Card */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
          {student.studentName}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isPass
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {student.status === "Lulus"
            ? label.lulus
            : student.status === "Tidak Lulus"
            ? label.tidakLulus
            : student.status}
        </span>
      </div>

      {/* Scores Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
          <div className="text-xs text-blue-600 dark:text-blue-200 font-medium mb-1">
            {label.matematika}
          </div>
          <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
            {student.matematika ?? 0}
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-lg">
          <div className="text-xs text-purple-600 dark:text-purple-200 font-medium mb-1">
            {label.inggris}
          </div>
          <div className="text-lg font-bold text-purple-900 dark:text-purple-100">
            {student.inggris ?? 0}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
          <div className="text-xs text-green-600 dark:text-green-200 font-medium mb-1">
            {label.agama}
          </div>
          <div className="text-lg font-bold text-green-900 dark:text-green-100">
            {student.agama ?? 0}
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900 p-3 rounded-lg">
          <div className="text-xs text-orange-600 dark:text-orange-200 font-medium mb-1">
            {label.psikolog}
          </div>
          <div className="text-lg font-bold text-orange-900 dark:text-orange-100">
            {student.psikolog ?? 0}
          </div>
        </div>
      </div>

      {/* Average Score */}
      <div className="bg-gray-50 dark:bg-[#1e2a4a] p-3 rounded-lg border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {label.rataRata}
          </span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {student.rataRata}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HasilPage() {
  const { language } = useLanguage() as { language: LanguageKey };
  const label = labels[language];

  const [data, setData] = useState<Hasil[]>([]);
  const [loading, setLoading] = useState(true);

  // Tambahan state untuk search dan filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/hasil-test");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter dan search
  const filteredData = data.filter((item) => {
    const matchName = item.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "lulus"
        ? item.status === "Lulus" || item.status === "Passed"
        : item.status === "Tidak Lulus" || item.status === "Not Passed";
    return matchName && matchStatus;
  });

  if (loading) {
    return (
      <div className="flex bg-white dark:bg-[#0F103F] min-h-screen text-gray-900 dark:text-white">
        <Sidebar />
        <Navbar />
        <div className="flex-1 p-4 md:p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-white dark:bg-[#0F103F] min-h-screen text-gray-900 dark:text-white">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-4 md:p-8 w-full">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {label.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {filteredData.length} {language === 'id' ? 'siswa terdaftar' : 'students registered'}
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          <input
            type="text"
            placeholder={label.search}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e2a4a] text-gray-900 dark:text-white rounded-lg px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-900 placeholder-gray-500 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e2a4a] text-gray-900 dark:text-white rounded-lg px-3 py-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-900"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">{label.all}</option>
            <option value="lulus">{label.lulus}</option>
            <option value="tidaklulus">{label.tidakLulus}</option>
          </select>
        </div>

        {/* Mobile View - Cards */}
        <div className="block md:hidden">
          {filteredData.length > 0 ? (
            <div className="space-y-4">
              {filteredData.map((student, idx) => (
                <StudentCard key={idx} student={student} label={label} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">📊</div>
              <p className="text-gray-500 dark:text-gray-400">{label.noData}</p>
            </div>
          )}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block">
          <div className="bg-white dark:bg-[#1e2a4a] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-[#242F59] border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {label.studentName}
                    </th>
                    <th className="text-center px-4 py-4 font-semibold text-blue-700 dark:text-blue-200">
                      {label.matematika}
                    </th>
                    <th className="text-center px-4 py-4 font-semibold text-purple-700 dark:text-purple-200">
                      {label.inggris}
                    </th>
                    <th className="text-center px-4 py-4 font-semibold text-green-700 dark:text-green-200">
                      {label.agama}
                    </th>
                    <th className="text-center px-4 py-4 font-semibold text-orange-700 dark:text-orange-200">
                      {label.psikolog}
                    </th>
                    <th className="text-center px-4 py-4 font-semibold text-gray-700 dark:text-gray-200">
                      {label.rataRata}
                    </th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {label.status}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-[#242F59] transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {item.studentName}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                            {item.matematika ?? 0}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded">
                            {item.inggris ?? 0}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                            {item.agama ?? 0}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-2 py-1 rounded">
                            {item.psikolog ?? 0}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="font-bold text-lg text-gray-900 dark:text-white">
                            {item.rataRata}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              item.status === "Lulus" || item.status === "Passed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {item.status === "Lulus"
                              ? label.lulus
                              : item.status === "Tidak Lulus"
                              ? label.tidakLulus
                              : item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">📊</div>
                        <p className="text-gray-500 dark:text-gray-400">{label.noData}</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}