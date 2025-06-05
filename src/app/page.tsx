/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [dark, setDark] = useState(false);

  // Sync dark mode with html class
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <main className={`font-sans transition-colors duration-300 ${dark ? "bg-[#181f2a] text-gray-100" : "bg-gray-50 text-gray-800"}`}>
      {/* Navbar */}
      <nav className={`navbar shadow-md fixed top-0 w-full z-50 px-6 md:px-32 transition-colors duration-300 ${dark ? "bg-[#232b3e] border-b border-[#2d3650]" : "bg-white"}`}>
        <div className="flex items-center space-x-2 navbar-start">
          <img src="/assets/logo-white" alt="Logo" className="h-10" />
        </div>
        <ul className="flex space-x-6 navbar-center">
          <li>
            <a href="#home" className="hover:text-green-500 font-medium transition-colors">Home</a>
          </li>
          <li>
            <a href="#tentang" className="hover:text-green-500 font-medium transition-colors">Tentang</a>
          </li>
          <li>
            <a href="#kurikulum" className="hover:text-green-500 font-medium transition-colors">Kurikulum</a>
          </li>
          <li>
            <a href="#about" className="hover:text-green-500 font-medium transition-colors">About Us</a>
          </li>
        </ul>
        <div className="navbar-end flex items-center">
          <button
            aria-label="Toggle dark mode"
            onClick={() => setDark((v) => !v)}
            className="ml-4 p-2 rounded-lg border border-gray-200 dark:border-[#2d3650] bg-gray-100 dark:bg-[#232b3e] hover:bg-green-100 dark:hover:bg-green-900 transition"
          >
            {dark ? (
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71m16.97 0l-.71-.71M4.05 4.05l-.71-.71M21 12h1M3 12H2m16.24 7.07a9 9 0 11-8.49-15.56 7 7 0 108.49 15.56z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className={`pt-32 pb-20 text-center transition-colors duration-300 ${dark ? "bg-gradient-to-br from-[#232b3e] via-[#1e2636] to-[#181f2a]" : "bg-gradient-to-br from-green-50 via-white to-blue-50"}`}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${dark ? "text-green-400" : "text-green-700"}`}>
            SMK KREATIF NUSANTARA <br /> Boarding School
          </h1>
          <p className={`mb-8 text-2xl ${dark ? "text-gray-300" : "text-gray-700"}`}>
            EDC menyediakan berbagai kelas industri untuk membantu perkembangan
            yang kamu inginkan
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <img src="/assets/hero.png" alt="photos" />
          </div>
          <div>
            <img src="/assets/group1.png" alt="photos" className="mt-12" />
          </div>
        </div>
      </section>

      {/* Mitra / Kolaborasi */}
      <section className={`py-16 ${dark ? "bg-[#232b3e]" : "bg-white"}`}>
        <div className="flex flex-wrap justify-center items-center gap-6 px-4 max-w-5xl mx-auto">
          <img src="/assets/collab.png" className="h-12" alt="Mikrotik" />
          <img src="/assets/mikrotik.png" className="h-12" alt="LSP" />
          <img src="/assets/lsp.png" className="h-12" alt="lsp" />
          <img src="/assets/pens.png" className="h-12" alt="pens" />
          <img src="/assets/anabuki.png" className="h-12" alt="anabuki" />
        </div>
      </section>

      {/* Visi */}
      <section className={`min-h-screen py-16 flex flex-col md:flex-row justify-center items-center ${dark ? "bg-[#181f2a]" : "bg-white"}`}>
        <div className="md:w-1/2 px-4 md:px-24">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${dark ? "text-green-300" : "text-green-700"} text-start`}>
           SMK KREATIF NUSANTARA mencetak tenaga ahli siap bersaing di industri
          </h2>
          <p className={`mx-auto text-xl mb-6 ${dark ? "text-gray-300" : "text-gray-600"}`}>
            SMK KREATIF NUSANTARA siap membimbingmu dari nol hingga ahli dengan metode belajar
            terbaik, kelas yang bisa diulang, dan peluang kerja terjamin
          </p>
        </div>
        <div>
          <img src="/assets/group2.png" alt="photos" className="h-[300px] md:h-[400px]" />
        </div>
      </section>

      {/* Diniyah & Umum */}
      <section id="kurikulum" className={`min-h-screen py-10 flex flex-col md:flex-row justify-center items-center px-4 md:px-44 ${dark ? "bg-[#232b3e]" : "bg-white"}`}>
        <div className="flex flex-col gap-12 max-w-2xl mx-auto md:mx-0">
          <h3 className={`text-3xl md:text-4xl font-bold mb-2 ${dark ? "text-green-300" : "text-green-700"}`}>
            Diniyah & Umum
          </h3>
          <p className={`text-lg md:text-xl ${dark ? "text-gray-300" : "text-gray-600"}`}>
            Sebagai acuan dasar dalam penyelenggaraan Lembaga Pendidikan
            Sekolah, para santri juga dibekali pelajaran...
          </p>
          <span className="underline text-green-600 dark:text-green-400 cursor-pointer">
            Learn More
          </span>
        </div>
        <div>
          <img src="/assets/diniyah.png" alt="photos" />
        </div>
      </section>

      {/* Keunggulan */}
      <section className={`py-16 text-center min-h-screen mb-24 ${dark ? "bg-[#181f2a]" : "bg-gray-50"}`}>
        <h2 className={`text-3xl font-bold mb-10 ${dark ? "text-green-300" : "text-green-700"}`}>
          Keunggulan Sekolah SMK KREATIF NUSANTARA 
        </h2>
        <div className="grid md:grid-cols-3 gap-12 px-4 max-w-6xl mx-auto">
          {[
            "/assets/ekskul.png",
            "/assets/pesantrenit.png",
            "/assets/keahlian.png",
            "/assets/serti.png",
            "/assets/sari.png",
            "/assets/tenaga.png",
          ].map((src, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-[#232b3e] shadow-lg rounded-lg p-12 h-80 flex justify-center items-center transition-colors`}
            >
              <img src={src} alt="ekskul" className="mx-auto mb-4" />
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-16 rounded-xl mb-24 mx-4 md:mx-44 text-center transition-colors duration-300 ${dark ? "bg-gradient-to-br from-green-900/30 to-blue-900/30" : "bg-gradient-to-br from-purple-100 to-blue-100"}`}>
        <div className="max-w-2xl mx-auto px-4">
          <h3 className={`text-2xl font-bold mb-4 ${dark ? "text-gray-100" : "text-gray-800"}`}>
            Segera Daftarkan Putra Anda Sekarang
          </h3>
          <p className={`mb-6 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            InsyaAllah kami adalah jawaban ayah bunda yang ingin putranya
            belajar IT, tetapi tetap memprioritaskan diniyah sebagai bekal
            hidupnya.
          </p>
          <a
            href="#"
            className="btn btn-success bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition"
          >
            Daftar Sekarang
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-10 transition-colors duration-300 ${dark ? "bg-[#232b3e] text-gray-200" : "bg-green-700 text-white"}`}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div>
            <img src="/logo.png" className="h-10 mb-2" />
            <p>SMK KREATIF NUSANTARA Boarding School</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Kontak</h4>
            <p>0851 6288 2547 (Yusuf)</p>
            <p>0821 6920 4657 (Hisyam)</p>
            <p>info@smkkreatifnusantara.sch.id</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Alamat</h4>
            <p>
              Ng. Kebon Kalapa, Jl. KH. R. Kosim RW01, Sindangsari, Kec. Sajira,
              Kab. Lebak, Banten
            </p>
            <p>NPSN: 69944476</p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm">
          © 2025 SMK MQ. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
