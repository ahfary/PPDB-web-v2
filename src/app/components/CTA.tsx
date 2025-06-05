const CallToActionSection = () => {
  return (
    <section className="cta-section bg-blue-600 text-white py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Siap untuk Memulai?</h2>
      <p className="text-lg mb-6">Bergabunglah dengan kami dan nikmati pengalaman yang luar biasa.</p>
      <div className="flex justify-center gap-6">
        <a 
          href="#signup" 
          className="cta-button bg-white text-blue-600 py-3 px-6 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
        >
          Daftar Sekarang
        </a>
        <a 
          href="#contact" 
          className="cta-button bg-transparent border-2 border-white text-white py-3 px-6 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
        >
          Hubungi Kami
        </a>
      </div>
    </section>
  );
};

export default CallToActionSection;
