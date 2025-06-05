"use client";

import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

const mapelList = [
	{
		id: "matematika",
		name: { id: "Matematika", en: "Mathematics" },
		desc: {
			id: "ilmu yang mempelajari angka, struktur, hubungan, dan operasi, serta bentuk-bentuk dalam ruang dan struktur serta pengukurannya. Matematika membantu memahami dunia di sekitar kita dan cara kerjanya, serta mengembangkan kemampuan berpikir logis, analisis, sistematis, kritis, dan kreatif.",
			en: "The science that studies numbers, structures, relationships, and operations, as well as shapes in space and their measurements. Mathematics helps us understand the world around us and how it works, and develops logical, analytical, systematic, critical, and creative thinking skills.",
		},
	},
	{
		id: "psikolog",
		name: { id: "Psikologi", en: "Psychology" },
		desc: {
			id: "mata pelajaran yang mempelajari tentang perilaku dan proses mental manusia. Psikologi adalah ilmu pengetahuan yang mempelajari pikiran, emosi, dan perilaku manusia, serta faktor-faktor yang mempengaruhinya.",
			en: "A subject that studies human behavior and mental processes. Psychology is the science that studies the mind, emotions, and human behavior, as well as the factors that influence them.",
		},
	},
	{
		id: "bahasa-inggris",
		name: { id: "Bahasa Inggris", en: "English" },
		desc: {
			id: "Mata pelajaran yang mengajarkan keterampilan berbahasa Inggris, meliputi mendengarkan, berbicara, membaca, dan menulis.",
			en: "A subject that teaches English language skills, including listening, speaking, reading, and writing.",
		},
	},
	{
		id: "agama",
		name: { id: "Agama", en: "Religion" },
		desc: {
			id: "pelajaran yang berkaitan dengan agama Islam, yang umumnya diajarkan di Madrasah Diniyah atau Madrasah Diniyah Takmiliyah. Materi pelajaran meliputi ilmu Al-Qur'an, Hadits, Aqidah, Akhlak, Fiqih, Sejarah Islam, Bahasa Arab, dan praktik ibadah.",
			en: "A subject related to Islam, usually taught in Madrasah Diniyah. The material includes Qur'an studies, Hadith, Aqidah, Morals, Fiqh, Islamic History, Arabic, and worship practices.",
		},
	},
];

const labels = {
	id: {
		examTitle: "Soal Ujian",
		viewQuestions: "Lihat Soal",
	},
	en: {
		examTitle: "Exam Questions",
		viewQuestions: "View Questions",
	},
};

type LanguageKey = keyof typeof labels;

export default function TestPage() {
	const router = useRouter();
	const { language } = useLanguage() as { language: LanguageKey };
	const label = labels[language];

	return (
		<div className="flex h-screen bg-gray-100 text-black dark:bg-[#242F59] dark:text-white">
			{/* Sidebar - Hidden on mobile */}
			<div className="hidden lg:block">
				<Sidebar />
			</div>

			{/* Main Content */}
			<main className="flex-1 flex flex-col lg:w-5/6">
				{/* Navbar - Added below Sidebar */}
				<Navbar />

				{/* Content */}
				<div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
					<h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
						{label.examTitle}
					</h1>

					{/* Grid - Responsive columns */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
						{mapelList.map((mapel) => (
							<div
								key={mapel.id}
								className="bg-white rounded-lg shadow-md p-4 flex flex-col dark:bg-[#0F103F]"
							>
								{/* Placeholder Gambar - Responsive height */}
								<div className="bg-gray-300 h-32 sm:h-40 lg:h-56 rounded mb-4 dark:bg-gray-500"></div>

								{/* Nama dan Deskripsi */}
								<h2 className="text-base sm:text-lg font-bold mb-2">
									{mapel.name[language]}
								</h2>
								<p className="text-xs sm:text-sm text-gray-600 mb-4 dark:text-gray-400 line-clamp-3 sm:line-clamp-none">
									{mapel.desc[language]}
								</p>

								{/* Tombol Aksi */}
								<div className="mt-auto flex gap-2">
									<button
										onClick={() =>
											router.push(`/dashboard/admin/test/${mapel.id}`)
										}
										className="flex-1 btn bg-[#278550] dark:bg-primary border-none text-white text-sm sm:text-base py-2 px-4 rounded hover:opacity-90 transition-opacity"
									>
										{label.viewQuestions}
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}