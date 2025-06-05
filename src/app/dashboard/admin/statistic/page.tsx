"use client";

import Sidebar from "@/app/components/sidebar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useRef, useState } from "react";

const summary = {
  totalSiswa: 120,
  siswaLaki: 70,
  siswaPerempuan: 50,
  totalTes: 15,
  rataRataNilai: 76.3,
  jumlahLulus: 90,
  jumlahTidakLulus: 30,
};

const rataNilaiPerTes = [
  { tes: "Tes 1", nilai: 72 },
  { tes: "Tes 2", nilai: 75 },
  { tes: "Tes 3", nilai: 78 },
  { tes: "Tes 4", nilai: 74 },
  { tes: "Tes 5", nilai: 80 },
];

const genderDistribusi = [
  { name: "Laki-laki", value: 70 },
  { name: "Perempuan", value: 50 },
];

const distribusiNilai = [
  { range: "<60", jumlah: 10 },
  { range: "60–70", jumlah: 25 },
  { range: "70–80", jumlah: 40 },
  { range: "80–90", jumlah: 30 },
  { range: "90+", jumlah: 15 },
];

const nilaiPerGender = [
  { gender: "Laki-laki", rataRata: 87 },
  { gender: "Perempuan", rataRata: 50 },
];

const domisiliData = [
  { kota: "Jakarta", jumlah: 30 },
  { kota: "Bandung", jumlah: 20 },
  { kota: "Surabaya", jumlah: 15 },
  { kota: "Yogyakarta", jumlah: 10 },
  { kota: "Medan", jumlah: 8 },
  { kota: "Makassar", jumlah: 5 },
];

const COLORS = ["#50A663", "#278550"];

export default function StatistikPage() {
  return (
    <div className="flex bg-gray-100 min-h-screen text-black">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold mb-6">Statistik</h1>

        {/* Ringkasan */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Siswa" value={summary.totalSiswa} />
          <StatCard label="Siswa Laki-laki" value={summary.siswaLaki} />
          <StatCard label="Siswa Perempuan" value={summary.siswaPerempuan} />
          <StatCard label="Total Tes" value={summary.totalTes} />
          <StatCard
            label="Rata-rata Nilai"
            value={summary.rataRataNilai.toFixed(1)}
          />
          <StatCard
            label="Lulus / Tidak"
            value={`${summary.jumlahLulus} / ${summary.jumlahTidakLulus}`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Pie Chart Gender */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Distribusi Jenis Kelamin
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderDistribusi}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {genderDistribusi.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart Nilai per Gender */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Rata-rata Nilai per Gender
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={nilaiPerGender}>
                <XAxis dataKey="gender" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rataRata" fill="#00D390" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rata-rata Nilai per Tes */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Rata-rata Nilai per Tes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rataNilaiPerTes}>
              <XAxis dataKey="tes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="nilai"
                stroke="#10b981"
                name="Rata-rata Nilai"
              />
              <CartesianGrid strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribusi Nilai */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-lg font-semibold mb-4">Distribusi Nilai</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distribusiNilai}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Statistik Domisili</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={domisiliData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="kota" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#278550" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Intersection Observer untuk animasi saat muncul di viewport
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Animasi angka hanya saat visible
  useEffect(() => {
    if (typeof value === "number" && ref.current && visible) {
      const start = 0;
      const end = Number(value);
      if (start === end) return;
      let current = start;
      const duration = 900;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        current += 1;
        if (ref.current) ref.current.textContent = current.toString();
        if (current === end) clearInterval(timer);
      }, stepTime > 20 ? stepTime : 20);
      return () => clearInterval(timer);
    } else if (ref.current && visible) {
      ref.current.textContent = value.toString();
    }
  }, [value, visible]);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl shadow p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg ${
        visible ? "animate-fadeIn" : "opacity-0"
      }`}
    >
      <p className="text-gray-500 text-sm">{label}</p>
      <p ref={ref} className="text-xl font-bold">{value}</p>
    </div>
  );
}

// Tambahkan animasi fadeIn di global CSS jika belum ada
// .animate-fadeIn { animation: fadeIn 0.7s; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
