"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LandingPage = () => {
  return (
    <main className="font-sans">

      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">MyKantin</h1>
          <div className="space-x-4">
            <a href="#fitur" className="text-gray-700 hover:text-blue-600">Fitur</a>
            <a href="#testimoni" className="text-gray-700 hover:text-blue-600">Testimoni</a>
            <a href="#kontak" className="text-gray-700 hover:text-blue-600">Kontak</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-500 to-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Kelola Kantin Sekolah Lebih Mudah</h1>
          <p className="text-lg mb-6">Aplikasi MyKantin memudahkan admin dan kasir mengatur transaksi harian.</p>
          <a href="#kontak" className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
            Hubungi Kami
          </a>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-10">Fitur Unggulan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Manajemen Produk</h3>
              <p>Tambah, edit, dan hapus produk dengan mudah lewat dashboard admin.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Transaksi Cepat</h3>
              <p>Kasir bisa memproses pembelian dengan cepat dan efisien.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Tanpa Registrasi</h3>
              <p>Staff langsung diberi akun oleh admin. Aman dan praktis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section id="testimoni" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8">Apa Kata Mereka?</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-lg italic">“Aplikasinya sangat membantu pekerjaan saya sehari-hari.”</p>
                <h4 className="mt-4 font-semibold">- Budi, Kasir Kantin</h4>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-lg italic">“Sangat mudah digunakan, tampilannya juga keren!”</p>
                <h4 className="mt-4 font-semibold">- Sari, Admin</h4>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="py-16 bg-blue-50">
        <div className="max-w-xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>
          <p className="mb-4">Tertarik menggunakan MyKantin? Hubungi kami untuk demo atau informasi lebih lanjut.</p>
          <a
            href="mailto:admin@mykantin.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700"
          >
            admin@mykantin.com
          </a>
        </div>
      </section>

    </main>
  );
};

export default LandingPage;
