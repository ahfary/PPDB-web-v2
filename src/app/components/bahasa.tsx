import { useLanguage } from "@/app/context/LanguageContext";

const labels = {
  id: { welcome: "Selamat Datang" },
  en: { welcome: "Welcome" },
};

export default function WelcomeMessage() {
  const { language } = useLanguage();
  return <h1>{labels[language].welcome}</h1>;
}

