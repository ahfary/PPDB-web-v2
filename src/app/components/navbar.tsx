'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Users, User, Settings, Files, NotebookPen, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useLanguage } from "@/app/context/LanguageContext"

const menuLabels = {
  id: {
    overview: "Beranda",
    siswa: "Siswa",
    soal: "Soal Ujian",
    hasil: "Hasil Ujian",
    profil: "Profil",
    pengaturan: "Pengaturan",
    menu: "Menu",
    logout: "Keluar",
  },
  en: {
    overview: "Overview",
    siswa: "Students",
    soal: "Exam Questions",
    hasil: "Test Results",
    profil: "Profile",
    pengaturan: "Settings",
    menu: "Menu",
    logout: "Logout",
  },
};

type LanguageKey = keyof typeof menuLabels;

export default function ResponsiveNavbar() {
  const { language } = useLanguage() as { language: LanguageKey };
  const label = menuLabels[language];

  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: label.overview, icon: <Home className="w-5 h-5" />, href: "/dashboard/admin" },
    { name: label.siswa, icon: <Users className="w-5 h-5" />, href: "/dashboard/admin/users" },
    { name: label.soal, icon: <NotebookPen className="w-5 h-5" />, href: "/dashboard/admin/test" },
    { name: label.hasil, icon: <Files className="w-5 h-5" />, href: "/dashboard/admin/result" },
    { name: label.profil, icon: <User className="w-5 h-5" />, href: "/dashboard/admin/profile" },
    { name: label.pengaturan, icon: <Settings className="w-5 h-5" />, href: "/dashboard/admin/settings" },
  ];

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/auth/login');
  };

  return (
    <div className="fixed top-4 right-4 z-50 lg:hidden">
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 bg-[#278550] text-white font-semibold rounded-full shadow-lg dark:bg-[#0F103F]"
        >
          <span>{label.menu}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-[#278550] text-white border-none shadow-lg rounded-xl flex flex-col py-4 dark:bg-[#0F103F]">
            <div className="flex flex-col items-center mb-6">
              <Image src="/assets/SMKKN.png" alt="smk-kreatif-nusantara" width={120} height={120} />
            </div>
            <nav className="flex flex-col space-y-2 px-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 p-3 rounded-xl transition font-semibold ${
                      isActive
                        ? "bg-[#41AD89] dark:bg-white/30 text-white"
                        : "hover:bg-white/10 text-white"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="bg-[#50A663] dark:bg-info rounded-xl p-4 mt-6 text-sm space-y-2 mx-4">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                alt="promo"
                className="w-12 h-12 mx-auto"
                width={48}
                height={48}
              />
              <p className="text-center font-semibold">Mr Abqory</p>
              <button
                onClick={handleLogout}
                className="btn btn-block btn-success text-white mt-2 dark:btn-primary"
              >
                {label.logout}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}