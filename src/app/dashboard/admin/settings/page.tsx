"use client";
import Sidebar from "@/app/components/sidebar";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Navbar from "@/app/components/navbar";
import { useLanguage } from "@/app/context/LanguageContext";

// Tambahkan daftar font menarik
const fontOptions = [
    { value: "poppins", label: "Poppins (Default)" },
    { value: "inter", label: "Inter" },
    { value: "roboto", label: "Roboto" },
    { value: "montserrat", label: "Montserrat" },
    { value: "nunito", label: "Nunito" },
    { value: "lato", label: "Lato" },
    { value: "raleway", label: "Raleway" },
    { value: "quicksand", label: "Quicksand" },
    { value: "merriweather", label: "Merriweather" },
    { value: "ubuntu", label: "Ubuntu" },
    { value: "open-sans", label: "Open Sans" },
    { value: "source-sans-pro", label: "Source Sans Pro" },
];

const languages = [
    { code: "id", label: "Bahasa Indonesia" },
    { code: "en", label: "English" },
];

const labels = {
    id: {
        pengaturan: "Pengaturan",
        tema: "Tema",
        terang: "Terang",
        gelap: "Gelap",
        sistem: "Sesuai Sistem",
        font: "Font",
        bahasa: "Bahasa",
    },
    en: {
        pengaturan: "Settings",
        tema: "Theme",
        terang: "Light",
        gelap: "Dark",
        sistem: "System",
        font: "Font",
        bahasa: "Language",
    },
};

const privacyPolicy = {
    id: {
        title: "Kebijakan Privasi",
        content: `Kami menjaga privasi data Anda. Data yang dikumpulkan hanya digunakan untuk keperluan PPDB dan tidak dibagikan ke pihak ketiga tanpa izin Anda. Anda dapat menghubungi admin untuk permintaan penghapusan data atau pertanyaan lebih lanjut.`,
    },
    en: {
        title: "Privacy Policy",
        content: `We respect your privacy. The data collected is only used for PPDB purposes and will not be shared with third parties without your consent. You can contact the admin for data deletion requests or further questions.`,
    },
};

type Language = keyof typeof labels;

export default function Settings() {
    const { theme, setTheme } = useTheme();
    const [font, setFont] = useState("poppins");
    const { language, changeLanguage } = useLanguage() as { language: Language; changeLanguage: (lang: Language) => void };

    // Inject font link ke <head> jika belum ada
    const injectFont = (fontValue: string) => {
        const fontLinks: Record<string, string> = {
            poppins: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap",
            inter: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap",
            roboto: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
            montserrat: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
            nunito: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap",
            lato: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap",
            raleway: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap",
            quicksand: "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap",
            merriweather: "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap",
            ubuntu: "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap",
            "open-sans": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap",
            "source-sans-pro": "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap",
        };
        const id = `font-link-${fontValue}`;
        if (!document.getElementById(id)) {
            const link = document.createElement("link");
            link.id = id;
        	link.rel = "stylesheet";
            link.href = fontLinks[fontValue];
            document.head.appendChild(link);
        }
    };

    // Terapkan font ke body
    const applyFont = (fontValue: string) => {
        const fontFamilies: Record<string, string> = {
            poppins: "'Poppins', sans-serif",
            inter: "'Inter', sans-serif",
            roboto: "'Roboto', sans-serif",
            montserrat: "'Montserrat', sans-serif",
            nunito: "'Nunito', sans-serif",
            lato: "'Lato', sans-serif",
            raleway: "'Raleway', sans-serif",
            quicksand: "'Quicksand', sans-serif",
            merriweather: "'Merriweather', serif",
            ubuntu: "'Ubuntu', sans-serif",
            "open-sans": "'Open Sans', sans-serif",
            "source-sans-pro": "'Source Sans Pro', sans-serif",
        };
        document.body.style.fontFamily = fontFamilies[fontValue] || fontFamilies["poppins"];
    };

    // Handle font change
    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFont = e.target.value;
        setFont(selectedFont);
        injectFont(selectedFont);
        applyFont(selectedFont);
        localStorage.setItem("font", selectedFont);
    };

    // Handle language change
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        changeLanguage(e.target.value as Language);
    };

    useEffect(() => {
        const savedFont = localStorage.getItem("font") || "poppins";
        setFont(savedFont);
        injectFont(savedFont);
        applyFont(savedFont);
    }, []);

    const label = labels[language];
    const privacy = privacyPolicy[language];

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <Navbar />
            <main className="flex-1 p-8 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
                    {label.pengaturan}
                </h1>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 space-y-8">
                    <div>
                        <label className="block mb-2 text-gray-700 dark:text-gray-200 font-medium">
                            {label.tema}
                        </label>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                        >
                            <option value="light">{label.terang}</option>
                            <option value="dark">{label.gelap}</option>
                            <option value="system">{label.sistem}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700 dark:text-gray-200 font-medium">
                            {label.font}
                        </label>
                        <select
                            value={font}
                            onChange={handleFontChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                        >
                            {fontOptions.map((f) => (
                                <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700 dark:text-gray-200 font-medium">
                            {label.bahasa}
                        </label>
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code}>{lang.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* Privacy Policy Section */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">{privacy.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{privacy.content}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
