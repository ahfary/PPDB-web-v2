/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
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
import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import WelcomeMessage from "@/app/components/bahasa";

const COLORS = (isDark: boolean) => {
  return isDark 
    ? ["#685cfc", "#9333ea"] // Dark mode colors
    : ["#50A663", "#34d399"]; // Light mode colors - green theme
};

const labels = {
  id: {
    dashboard: "Dashboard",
    totalSiswa: "Total Siswa",
    siswaLaki: "Siswa Laki-laki",
    siswaPerempuan: "Siswa Perempuan",
    totalTes: "Total Tes",
    rataRataNilai: "Rata-rata Nilai",
    lulusTidak: "Lulus / Tidak",
    distribusiGender: "Distribusi Jenis Kelamin",
    rataNilaiGender: "Rata-rata Nilai per Gender",
    rataNilaiTes: "Rata-rata Nilai per Tes",
    distribusiNilai: "Distribusi Nilai",
    statistikDomisili: "Statistik Domisili",
  },
  en: {
    dashboard: "Dashboard",
    totalSiswa: "Total Students",
    siswaLaki: "Male Students",
    siswaPerempuan: "Female Students",
    totalTes: "Total Tests",
    rataRataNilai: "Average Score",
    lulusTidak: "Passed / Not Passed",
    distribusiGender: "Gender Distribution",
    rataNilaiGender: "Average Score by Gender",
    rataNilaiTes: "Average Score per Test",
    distribusiNilai: "Score Distribution",
    statistikDomisili: "Domicile Statistics",
  },
};

export default function StatistikPage() {
  const { language } = useLanguage() as { language: "id" | "en" };
  const [data, setData] = useState<any[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [summaryData, setSummaryData] = useState({
    totalSiswa: 0,
    siswaLaki: 0,
    siswaPerempuan: 0,
    totalTes: 0,
    rataRataNilai: 0,
    jumlahLulus: 0,
    jumlahTidakLulus: 0,
  });

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Observer untuk perubahan dark mode
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const rataNilaiPerTes = [
    { tes: "Tes 1", nilai: 72 },
    { tes: "Tes 2", nilai: 75 },
    { tes: "Tes 3", nilai: 78 },
    { tes: "Tes 4", nilai: 74 },
    { tes: "Tes 5", nilai: 80 },
  ];

  const genderDistribusi = [
    { name: "laki-laki", value: summaryData.siswaLaki },
    { name: "perempuan", value: summaryData.siswaPerempuan },
  ];

  const nilaiPerGender = [
    { gender: "Laki-laki", rataRata: 87 },
    { gender: "Perempuan", rataRata: 50 },
  ];

  const distribusiNilai = [
    { range: "<60", jumlah: 10 },
    { range: "60–70", jumlah: 25 },
    { range: "70–80", jumlah: 40 },
    { range: "80–90", jumlah: 30 },
    { range: "90+", jumlah: 15 },
  ];

  const domisiliData = [
    { kota: "Jakarta", jumlah: 30 },
    { kota: "Bandung", jumlah: 20 },
    { kota: "Surabaya", jumlah: 15 },
    { kota: "Yogyakarta", jumlah: 10 },
    { kota: "Medan", jumlah: 8 },
    { kota: "Makassar", jumlah: 5 },
  ];

  // Custom Tooltip dengan dark mode support
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${
          isDark 
            ? 'bg-gray-800 border-gray-600 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name || entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/statistic");
      const result = await response.json();

      setData(result.dataSiswa);

      setSummaryData({
        totalSiswa: result.total,
        siswaLaki: result.berdasarkanJenisKelamin["laki-laki"] || 0,
        siswaPerempuan: result.berdasarkanJenisKelamin["Perempuan"] || 0,
        totalTes: 5,
        rataRataNilai: 75.8,
        jumlahLulus: 1,
        jumlahTidakLulus: 1,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <Sidebar />
      <Navbar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto h-screen">
        <WelcomeMessage />
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {labels[language].dashboard}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            label={labels[language].totalSiswa}
            value={summaryData.totalSiswa}
          />
          <StatCard
            label={labels[language].siswaLaki}
            value={summaryData.siswaLaki}
          />
          <StatCard
            label={labels[language].siswaPerempuan}
            value={summaryData.siswaPerempuan}
          />
          <StatCard
            label={labels[language].totalTes}
            value={summaryData.totalTes}
          />
          <StatCard
            label={labels[language].rataRataNilai}
            value={summaryData.rataRataNilai.toFixed(1)}
          />
          <StatCard
            label={labels[language].lulusTidak}
            value={`${summaryData.jumlahLulus} / ${summaryData.jumlahTidakLulus}`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
  <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
    {labels[language].distribusiGender}
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
        label={({ name, value }) => `${name}: ${value}`}
        labelLine={false}
        fontSize={12}
        fill={isDark ? "#ffffff" : "#374151"} // This affects the label color
      >
        {genderDistribusi.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS(isDark)[index % COLORS(isDark).length]}
            stroke={isDark ? "#374151" : "#ffffff"}
            strokeWidth={2}
          />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </ResponsiveContainer>
</div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {labels[language].rataNilaiGender}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={nilaiPerGender}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDark ? "#374151" : "#e5e7eb"}
                />
                <XAxis 
                  dataKey="gender" 
                  tick={{ fill: isDark ? "#d1d5db" : "#374151", fontSize: 12 }}
                  axisLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
                  tickLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
                />
                <YAxis 
                  tick={{ fill: isDark ? "#d1d5db" : "#374151", fontSize: 12 }}
                  axisLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
                  tickLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="rataRata" 
                  fill={isDark ? "#685cfc" : "#00D390"} 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-10 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {labels[language].rataNilaiTes}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rataNilaiPerTes}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis 
                dataKey="tes" 
                tick={{ fill: isDark ? "#d1d5db" : "#374151", fontSize: 12 }}
                axisLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
                tickLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
              />
              <YAxis 
                tick={{ fill: isDark ? "#d1d5db" : "#374151", fontSize: 12 }}
                axisLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
                tickLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  color: isDark ? "#d1d5db" : "#374151",
                  fontSize: "14px"
                }}
              />
              <Line
                type="monotone"
                dataKey="nilai"
                stroke={isDark ? "#685cfc" : "#10b981"}
                strokeWidth={3}
                name="Rata-rata Nilai"
                dot={{ 
                  fill: isDark ? "#685cfc" : "#10b981", 
                  strokeWidth: 2, 
                  r: 5 
                }}
                activeDot={{ 
                  r: 7, 
                  fill: isDark ? "#685cfc" : "#059669",
                  stroke: isDark ? "#ffffff" : "#ffffff",
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-10 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {labels[language].distribusiNilai}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distribusiNilai}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis 
                dataKey="range" 
                tick={{ fill: isDark ? "#d1d5db" : "#374151", fontSize: 12 }}
                axisLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
                tickLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
              />
              <YAxis 
                tick={{ fill: isDark ? "#d1d5db" : "#374151", fontSize: 12 }}
                axisLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
                tickLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="jumlah" 
                fill={isDark ? "#685cfc" : "#34d399"} 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {labels[language].statistikDomisili}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={domisiliData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis 
                dataKey="kota" 
                tick={{ fill: isDark ? "#d1d5db" : "#374151", fontSize: 12 }}
                axisLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
                tickLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
              />
              <YAxis 
                tick={{ fill: isDark ? "#d1d5db" : "#374151", fontSize: 12 }}
                axisLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
                tickLine={{ stroke: isDark ? "#6b7280" : "#9ca3af" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="jumlah" 
                fill={isDark ? "#685cfc" : "#278550"} 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Intersection Observer untuk animasi saat muncul di viewport
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setHasShown(true);
        }
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
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600
        ${hasShown ? "animate-fadeIn" : "opacity-0"}
        ${hasShown && !visible ? "opacity-100" : ""}
      `}
    >
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{label}</p>
      <p ref={ref} className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}