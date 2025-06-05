'use client'

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Home, Users, User, Settings, Files, NotebookPen } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/app/context/LanguageContext"

const menuLabels = {
  id: {
    overview: "Beranda",
    siswa: "Siswa",
    soal: "Soal Ujian",
    hasil: "Hasil Ujian",
    profil: "Profil",
    pengaturan: "Pengaturan",
    logout: "Keluar",
  },
  en: {
    overview: "Overview",
    siswa: "Students",
    soal: "Exam Questions",
    hasil: "Test Results",
    profil: "Profile",
    pengaturan: "Settings",
    logout: "Logout",
  },
};

type LanguageKey = keyof typeof menuLabels;

const Sidebar = () => {
  const { language } = useLanguage() as { language: LanguageKey };
  const label = menuLabels[language];

  const pathname = usePathname();
  const router = useRouter();

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
    <aside className="w-64 h-screen bg-[#278550] flex flex-col justify-between text-white p-4 dark:bg-[#0F103F] md:block hidden" >
      <div>
        <div className="text-2xl font-bold mb-10">
          <Image src={"/assets/SMKKN.png"} alt={"smk-kreatif-nusantara"} width={350} height={350} />
        </div>

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition font-semibold ${
                  isActive ? "bg-[#41AD89] dark:bg-white/30 text-white" : "hover:bg-white/10 text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="bg-[#50A663] dark:bg-info rounded-xl p-4 mt-80 text-sm space-y-2">
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
    </aside>
  );
};

export default Sidebar;
