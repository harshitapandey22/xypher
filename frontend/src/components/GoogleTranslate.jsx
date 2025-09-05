import React, { useEffect, useState } from "react";

const languages = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
  te: "Telugu",
  mr: "Marathi",
  ta: "Tamil",
  ur: "Urdu",
  gu: "Gujarati",
  bho: "Bhojpuri",
  kn: "Kannada",
  ml: "Malayalam",
  pa: "Punjabi",
  es: "Spanish",
  fr: "French",
  ar: "Arabic",
  ru: "Russian",
  pt: "Portuguese",
};

export default function GoogleTranslateCustom() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: Object.keys(languages).join(","),
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const cookieLang = getCookie("googtrans");
    if (cookieLang) {
      const lang = cookieLang.split("/")[2];
      if (lang) setCurrentLang(lang);
    }
  }, []);

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `${name}=${value}${expires}; path=/`;
  };

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  const handleLanguageChange = (lang) => {
    setCookie("googtrans", `/en/${lang}`, 1);
    setCurrentLang(lang);
    setOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const resetLanguage = () => {
    setCookie("googtrans", "/en/en", 1);
    setCurrentLang("en");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="fixed top-3 left-3 w-full z-100 inline-block max-w-44 max-h-6">
      <button
        onClick={() => setOpen(!open)}
        className=" bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-4 py-2 text-zinc-100 cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 flex items-center gap-2 shadow-lg"
      >
        <span>Translate</span>
      </button>

      {open && (
        <div className="absolute mt-2 z-50 bg-blue-100 rounded shadow p-2 w-40">
          {Object.entries(languages).map(([code, label]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className="w-full text-left px-2 py-1 hover:bg-gray-100 text-sm text-gray-700"
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {currentLang !== "en" && (
        <button
          onClick={resetLanguage}
          className="ml-4 text-sm text-red-500 hover:text-red-600"
        >
          ❌
        </button>
      )}

      <div id="google_translate_element" className="hidden" />
    </div>
  );
}
