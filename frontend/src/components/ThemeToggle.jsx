import React, { useEffect, useState } from "react";

const options = [
  { value: "dark",    label: "Dark Mode" },
  { value: "light",   label: "Light Mode" },
  { value: "colourblind", label: "Colour‑Blind Mode" },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const handleChange = (e) => {
    const t = e.target.value;
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  };

  return (
    <select
      value={theme}
      onChange={handleChange}
      className="bg-[#0a0a0a] text-gray-300 text-sm w-52 px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none shadow-sm"
    >
      <option disabled>Select Components</option>
      {options.map((o) => (
        <option
          key={o.value}
          value={o.value}
          className="text-gray-900 dark:text-gray-100 bg-[#0a0a0a]"
        >
          {o.label}
        </option>
      ))}
    </select>
  );
}
