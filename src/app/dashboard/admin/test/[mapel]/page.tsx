/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaTrash, FaPlus, FaPen, FaCheckCircle, FaBook, FaListOl, FaEye, FaEdit, FaTimes, FaSave } from "react-icons/fa";

// Import Firebase
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  setDoc,
  getDoc,
} from "firebase/firestore";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqaxNwwZF5W5Oy2kw1CtQdnrDKlNJmImc",
  authDomain: "ppdb-project-b213e.firebaseapp.com",
  projectId: "ppdb-project-b213e",
  storageBucket: "ppdb-project-b213e.firebasestorage.app",
  messagingSenderId: "562454569704",
  appId: "1:562454569704:web:3f457426b101d5fe36df5d",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

export default function BuatSoalPage() {
  const { mapel } = useParams();
  const [soal, setSoal] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const soalRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentSoalIndex, setCurrentSoalIndex] = useState<number | null>(null);
  const [formInput, setFormInput] = useState({
    pertanyaan: "",
    opsiA: "",
    opsiB: "",
    opsiC: "",
    opsiD: "",
    jawabanBenar: "",
  });

  // Tambahkan ini sebelum komponen utama
  const soalRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        setLoading(true);
        setError(null);

        // Ambil semua dokumen dari koleksi soal_test
        const snapshot = await getDocs(collection(db, "soal_test"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const transformedData: any[] = [];
        data.forEach((doc: any) => {
          // Cek jika dokumen memiliki properti soal dan mapel yang sesuai
          if (doc.soal && doc.nama_pelajaran === mapel) {
            doc.soal.forEach((s: any) => {
              transformedData.push({
                id: doc.id,
                pertanyaan: s.judul,
                opsiA: s.jawaban[0],
                opsiB: s.jawaban[1],
                opsiC: s.jawaban[2],
                opsiD: s.jawaban[3],
                jawabanBenar: s.jawaban_benar,
              });
            });
          }
        });

        setSoal(transformedData);
      } catch (error: any) {
        console.error("Gagal fetch soal:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSoal();
  }, [mapel]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentSoalIndex !== null) {
      // Edit existing soal
      try {
        const docRef = doc(db, "soal_test", mapel as string);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
          // Jika dokumen tidak ada, buat dokumen baru dan tambahkan soal
          await setDoc(docRef, {
            nama_pelajaran: mapel,
            soal: [
              {
                judul: formInput.pertanyaan,
                jawaban: [
                  formInput.opsiA,
                  formInput.opsiB,
                  formInput.opsiC,
                  formInput.opsiD,
                ],
                jawaban_benar: formInput.jawabanBenar,
              },
            ],
          });
        } else {
          // Jika dokumen ada, perbarui soal yang ada
          const oldSoal = {
            judul: soal[currentSoalIndex].pertanyaan,
            jawaban: [
              soal[currentSoalIndex].opsiA,
              soal[currentSoalIndex].opsiB,
              soal[currentSoalIndex].opsiC,
              soal[currentSoalIndex].opsiD,
            ],
            jawaban_benar: soal[currentSoalIndex].jawabanBenar,
          };

          await updateDoc(docRef, {
            soal: arrayRemove(oldSoal),
          });

          await updateDoc(docRef, {
            soal: arrayUnion({
              judul: formInput.pertanyaan,
              jawaban: [
                formInput.opsiA,
                formInput.opsiB,
                formInput.opsiC,
                formInput.opsiD,
              ],
              jawaban_benar: formInput.jawabanBenar,
            }),
          });
        }

        setSoal((prev) =>
          prev.map((s, i) =>
            i === currentSoalIndex
              ? {
                  ...s,
                  pertanyaan: formInput.pertanyaan,
                  opsiA: formInput.opsiA,
                  opsiB: formInput.opsiB,
                  opsiC: formInput.opsiC,
                  opsiD: formInput.opsiD,
                  jawabanBenar: formInput.jawabanBenar,
                }
              : s
          )
        );

        setShowForm(false);
        setCurrentSoalIndex(null);
        setFormInput({
          pertanyaan: "",
          opsiA: "",
          opsiB: "",
          opsiC: "",
          opsiD: "",
          jawabanBenar: "",
        });
      } catch (err: any) {
        console.error("Gagal edit soal:", err);
        setError(err.message);
      }
    } else {
      // Add new soal
      try {
        const docRef = doc(db, "soal_test", mapel as string);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
          // Jika dokumen tidak ada, buat dokumen baru dan tambahkan soal
          await setDoc(docRef, {
            nama_pelajaran: mapel,
            soal: [
              {
                judul: formInput.pertanyaan,
                jawaban: [
                  formInput.opsiA,
                  formInput.opsiB,
                  formInput.opsiC,
                  formInput.opsiD,
                ],
                jawaban_benar: formInput.jawabanBenar,
              },
            ],
          });
        } else {
          // Jika dokumen ada, tambahkan soal baru
          await updateDoc(docRef, {
            soal: arrayUnion({
              judul: formInput.pertanyaan,
              jawaban: [
                formInput.opsiA,
                formInput.opsiB,
                formInput.opsiC,
                formInput.opsiD,
              ],
              jawaban_benar: formInput.jawabanBenar,
            }),
          });
        }

        setSoal((prev) => [
          ...prev,
          {
            id: mapel,
            pertanyaan: formInput.pertanyaan,
            opsiA: formInput.opsiA,
            opsiB: formInput.opsiB,
            opsiC: formInput.opsiC,
            opsiD: formInput.opsiD,
            jawabanBenar: formInput.jawabanBenar,
          },
        ]);

        setShowForm(false);
        setFormInput({
          pertanyaan: "",
          opsiA: "",
          opsiB: "",
          opsiC: "",
          opsiD: "",
          jawabanBenar: "",
        });
      } catch (err: any) {
        console.error("Gagal tambah soal:", err);
        setError(err.message);
      }
    }
  };

  const handleEditSoal = (index: number) => {
    const soalToEdit = soal[index];
    setFormInput({
      pertanyaan: soalToEdit.pertanyaan,
      opsiA: soalToEdit.opsiA,
      opsiB: soalToEdit.opsiB,
      opsiC: soalToEdit.opsiC,
      opsiD: soalToEdit.opsiD,
      jawabanBenar: soalToEdit.jawabanBenar,
    });
    setCurrentSoalIndex(index);
    setShowForm(true);
  };

  const handleHapusSoal = async (index: number) => {
    // Gunakan SweetAlert2 untuk konfirmasi
    const Swal = (await import("sweetalert2")).default;
    const withReactContent = (await import("sweetalert2-react-content")).default;
    const MySwal = withReactContent(Swal);

    const result = await MySwal.fire({
      title: "Hapus Soal?",
      text: "Apakah Anda yakin ingin menghapus soal ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      const soalToDelete = {
        judul: soal[index].pertanyaan,
        jawaban: [
          soal[index].opsiA,
          soal[index].opsiB,
          soal[index].opsiC,
          soal[index].opsiD,
        ],
        jawaban_benar: soal[index].jawabanBenar,
      };

      const docRef = doc(db, "soal_test", mapel as string);
      await updateDoc(docRef, {
        soal: arrayRemove(soalToDelete),
      });

      setSoal((prev) => prev.filter((_, i) => i !== index));

      MySwal.fire({
        title: "Berhasil!",
        text: "Soal berhasil dihapus.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err: any) {
      console.error("Gagal hapus soal:", err);
      setError(err.message);
      MySwal.fire({
        title: "Gagal!",
        text: "Gagal menghapus soal.",
        icon: "error",
      });
    }
  };

  const handleTambahSoal = () => {
    setShowForm(true);
    setCurrentSoalIndex(null);
    setFormInput({
      pertanyaan: "",
      opsiA: "",
      opsiB: "",
      opsiC: "",
      opsiD: "",
      jawabanBenar: "",
    });
  };

  // Ganti handleNavigateToSoal agar scroll ke soal tertentu
  const handleNavigateToSoal = (index: number) => {
    const ref = soalRefs.current[index];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-900 dark:from-slate-900 dark:to-slate-800 dark:text-white">
        <div className="hidden lg:block">
          <div className="fixed left-0 top-0 h-screen w-[260px] z-20">
            <Sidebar />
          </div>
        </div>
        <div className="flex-1 flex flex-col lg:ml-[260px]">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-gray-600 dark:text-gray-400">Memuat data soal...</p>
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-900 dark:from-slate-900 dark:to-slate-800 dark:text-white">
        <div className="hidden lg:block">
          <div className="fixed left-0 top-0 h-screen w-[260px] z-20">
            <Sidebar />
          </div>
        </div>
        <div className="flex-1 flex flex-col lg:ml-[260px]">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Terjadi Kesalahan</h3>
                  <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-900 dark:from-slate-900 dark:to-slate-800 dark:text-white overflow-hidden">
      <div className="hidden lg:block">
        <div className="fixed left-0 top-0 h-screen w-[260px] z-20">
          <Sidebar />
        </div>
      </div>
      <div className="flex-1 flex flex-col lg:ml-[260px]">
        <Navbar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <FaBook className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Bank Soal
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mata Pelajaran: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{mapel?.toString().toUpperCase()}</span>
                </p>
              </div>
            </div>
            
            {/* Stats & Add Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <FaListOl className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{soal.length} Soal</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleTambahSoal}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 space-x-2"
              >
                <FaPlus className="h-4 w-4" />
                <span>Tambah Soal</span>
              </button>
            </div>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold flex items-center space-x-2">
                    <FaEdit className="h-5 w-5 text-indigo-600" />
                    <span>{currentSoalIndex !== null ? "Edit Soal" : "Tambah Soal Baru"}</span>
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setCurrentSoalIndex(null);
                      setFormInput({
                        pertanyaan: "",
                        opsiA: "",
                        opsiB: "",
                        opsiC: "",
                        opsiD: "",
                        jawabanBenar: "",
                      });
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
                  {/* Question Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pertanyaan
                    </label>
                    <textarea
                      value={formInput.pertanyaan}
                      onChange={(e) =>
                        setFormInput((prev) => ({
                          ...prev,
                          pertanyaan: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-white resize-none transition-all duration-200"
                      rows={4}
                      placeholder="Masukkan pertanyaan soal..."
                      required
                    />
                  </div>
                  
                  {/* Options Grid */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Pilihan Jawaban
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["A", "B", "C", "D"].map((option) => (
                        <div key={option} className="space-y-2">
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Opsi {option}
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                              {option}
                            </span>
                            <input
                              type="text"
                              value={formInput[`opsi${option}` as keyof typeof formInput]}
                              onChange={(e) =>
                                setFormInput((prev) => ({
                                  ...prev,
                                  [`opsi${option}`]: e.target.value,
                                }))
                              }
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-200"
                              placeholder={`Masukkan opsi ${option}...`}
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Correct Answer Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jawaban Benar
                    </label>
                    <select
                      value={formInput.jawabanBenar}
                      onChange={(e) =>
                        setFormInput((prev) => ({
                          ...prev,
                          jawabanBenar: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-200"
                      required
                    >
                      <option value="" disabled>
                        Pilih Jawaban Benar
                      </option>
                      <option value={formInput.opsiA}>A. {formInput.opsiA}</option>
                      <option value={formInput.opsiB}>B. {formInput.opsiB}</option>
                      <option value={formInput.opsiC}>C. {formInput.opsiC}</option>
                      <option value={formInput.opsiD}>D. {formInput.opsiD}</option>
                    </select>
                  </div>
                  
                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setCurrentSoalIndex(null);
                        setFormInput({
                          pertanyaan: "",
                          opsiA: "",
                          opsiB: "",
                          opsiC: "",
                          opsiD: "",
                          jawabanBenar: "",
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 space-x-2"
                    >
                      <FaSave className="h-4 w-4" />
                      <span>{currentSoalIndex !== null ? "Update Soal" : "Simpan Soal"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Questions List */}
            <div className="flex-1" ref={soalRef}>
              {soal.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                  <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <FaBook className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Belum ada soal
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Mulai membuat soal untuk mata pelajaran {mapel?.toString().toUpperCase()}
                  </p>
                  <button
                    onClick={handleTambahSoal}
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 space-x-2"
                  >
                    <FaPlus className="h-4 w-4" />
                    <span>Buat Soal Pertama</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {soal.map((item, index) => (
                    <div
                      key={`${item.id}-${item.pertanyaan}`}
                      ref={el => { soalRefs.current[index] = el; }}
                      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="p-6">
                        {/* Question Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                                {item.pertanyaan}
                              </p>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleEditSoal(index)}
                              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors duration-200"
                              title="Edit Soal"
                            >
                              <FaPen className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleHapusSoal(index)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                              title="Hapus Soal"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Answer Options */}
                        <div className="space-y-3">
                          {["A", "B", "C", "D"].map((huruf, i) => {
                            const jawaban = item[`opsi${huruf}`];
                            const isCorrect = jawaban === item.jawabanBenar;

                            return (
                              <div 
                                key={i} 
                                className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                                  isCorrect 
                                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                                    : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600'
                                }`}
                              >
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isCorrect 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                }`}>
                                  {huruf}
                                </div>
                                <span className={`flex-1 ${
                                  isCorrect 
                                    ? 'text-green-800 dark:text-green-200 font-medium' 
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                  {jawaban || ""}
                                </span>
                                {isCorrect && (
                                  <FaCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Question Navigation Sidebar */}
            {soal.length > 0 && (
              <div className="lg:w-80">
                {/* Mobile Navigation */}
                <div className="lg:hidden mb-6">
                  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                      <FaListOl className="h-4 w-4" />
                      <span>Navigasi Soal</span>
                    </h3>
                    <div className="grid grid-cols-6 gap-2">
                      {soal.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handleNavigateToSoal(i)}
                          className="aspect-square flex items-center justify-center text-sm font-medium bg-gray-100 hover:bg-indigo-100 dark:bg-slate-700 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-colors duration-200"
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop Navigation - Fixed when scrolling */}
                <div className="hidden lg:block">
                  <div className="fixed top-24 right-8 w-80 z-10">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <FaListOl className="h-5 w-5" />
                        <span>Navigasi Soal</span>
                      </h3>
                      <div className="grid grid-cols-5 gap-3">
                        {soal.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handleNavigateToSoal(i)}
                            className="aspect-square flex items-center justify-center text-lg font-semibold bg-gray-100 hover:bg-indigo-100 dark:bg-slate-700 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-sm"
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      {/* Quick Actions */}
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={handleTambahSoal}
                          className="w-full inline-flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 space-x-2"
                        >
                          <FaPlus className="h-4 w-4" />
                          <span>Tambah Soal</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}