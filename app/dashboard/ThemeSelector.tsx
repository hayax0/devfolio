"use client";

import { useState } from "react";

const PALETTE = [
  {
    name: "cosmic",
    classBg: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
  },
  { name: "ocean", classBg: "bg-gradient-to-r from-blue-600 to-cyan-400" },
  { name: "sunset", classBg: "bg-gradient-to-r from-orange-500 to-rose-500" },
  { name: "neon-cyan", classBg: "bg-gradient-to-r from-cyan-400 to-teal-500" },
];

export default function ThemeSelector({
  initialTheme = "dark-minimal",
  initialCustomColor = "cosmic",
}: {
  initialTheme?: string;
  initialCustomColor?: string | null;
}) {
  const [theme, setTheme] = useState(initialTheme);
  const [selectedCustomColor, setSelectedCustomColor] = useState(
    initialCustomColor || "cosmic",
  );

  const handleSelect = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  const customAccentClass =
    selectedCustomColor === "cosmic"
      ? "bg-violet-500/20 border-violet-500/50"
      : selectedCustomColor === "ocean"
        ? "bg-blue-600/20 border-blue-600/50"
        : selectedCustomColor === "sunset"
          ? "bg-orange-500/20 border-orange-500/50"
          : selectedCustomColor === "neon-cyan"
            ? "bg-teal-500/20 border-teal-500/50"
            : "bg-zinc-800 border-zinc-700";

  return (
    <div className="pt-8 border-t border-zinc-800/50">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-zinc-100 mb-1">
          Aparência do Portfólio
        </h3>
        <p className="text-sm text-zinc-400">
          Escolha a paleta de cores que mais combina com você.
        </p>
      </div>

      <input type="hidden" name="theme" value={theme} />
      {theme === "Personalizado" && (
        <input type="hidden" name="customColor" value={selectedCustomColor} />
      )}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          onClick={() => handleSelect("light")}
          className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 ${theme === "light" ? "border-white ring-1 ring-white bg-zinc-950" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"}`}
        >
          <div className="w-full h-20 bg-white rounded-lg mb-3 border border-zinc-200 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200"></div>
            <div className="w-16 h-2 rounded-full bg-zinc-300"></div>
          </div>
          <p className="text-center text-xs font-medium text-zinc-100">
            Light Clean
          </p>
        </div>

        <div
          onClick={() => handleSelect("dark-minimal")}
          className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 ${theme === "dark-minimal" ? "border-white ring-1 ring-white bg-zinc-950" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"}`}
        >
          <div className="w-full h-20 bg-zinc-950 rounded-lg mb-3 border border-zinc-800 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
            <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900"></div>
            <div className="w-16 h-2 rounded-full bg-zinc-100"></div>
            <div className="w-10 h-1 rounded-full bg-zinc-700 mt-1"></div>
          </div>
          <p className="text-center text-xs font-medium text-zinc-100">
            Dark Minimal
          </p>
        </div>

        <div
          onClick={() => handleSelect("dark-hacker")}
          className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 ${theme === "dark-hacker" ? "border-white ring-1 ring-white bg-zinc-950" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"}`}
        >
          <div className="w-full h-20 bg-zinc-900 rounded-lg mb-3 border border-zinc-800 flex flex-col items-center justify-center gap-2 relative">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]"></div>
            <div className="w-16 h-2 rounded-full bg-zinc-300"></div>
            <div className="w-10 h-1 rounded-full bg-emerald-500 mt-1"></div>
          </div>
          <p className="text-center text-xs font-medium text-zinc-100">
            Dark Hacker
          </p>
        </div>

        <div
          onClick={() => handleSelect("corporate")}
          className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 ${theme === "corporate" ? "border-white ring-1 ring-white bg-zinc-950" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"}`}
        >
          <div className="w-full h-20 bg-slate-900 rounded-lg mb-3 border border-slate-800 flex flex-col items-center justify-center gap-2 relative">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]"></div>
            <div className="w-16 h-2 rounded-full bg-slate-200"></div>
            <div className="w-10 h-1 rounded-full bg-blue-500 mt-1"></div>
          </div>
          <p className="text-center text-xs font-medium text-zinc-100">
            Corporate
          </p>
        </div>

        <div
          onClick={() => handleSelect("Personalizado")}
          className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 ${theme === "Personalizado" ? "border-white ring-1 ring-white bg-zinc-950" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"}`}
        >
          <div className="w-full h-20 bg-zinc-900 rounded-lg mb-3 border border-zinc-800 flex flex-col items-center justify-center gap-2 relative transition-all duration-300">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 border ${theme === "Personalizado" ? customAccentClass : "border-zinc-700 bg-zinc-800 text-transparent"}`}
            >
              {theme !== "Personalizado" && (
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 opacity-30"></div>
              )}
            </div>
            <div className="w-16 h-2 rounded-full bg-zinc-300"></div>
            {theme === "Personalizado" && (
              <div
                className={`w-10 h-1 rounded-full mt-1 transition-all duration-300 ${
                  selectedCustomColor === "cosmic"
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    : selectedCustomColor === "ocean"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-400"
                      : selectedCustomColor === "sunset"
                        ? "bg-gradient-to-r from-orange-500 to-rose-500"
                        : selectedCustomColor === "neon-cyan"
                          ? "bg-gradient-to-r from-cyan-400 to-teal-500"
                          : "bg-gradient-to-r from-zinc-500 to-zinc-400"
                }`}
              ></div>
            )}
            {theme !== "Personalizado" && (
              <div className="w-10 h-1 rounded-full mt-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-60"></div>
            )}
          </div>
          <p className="text-center text-xs font-medium text-zinc-100">
            Personalizado
          </p>
        </div>
      </div>

      {theme === "Personalizado" && (
        <div className="mt-6 p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl animate-fade-in-up">
          <p className="text-sm font-medium text-zinc-300 mb-4 text-center">
            Defina sua cor de destaque
          </p>
          <div className="flex items-center justify-center gap-5">
            {PALETTE.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedCustomColor(color.name);
                }}
                className={`w-10 h-10 rounded-full ${color.classBg} transition-all duration-200 hover:scale-110 active:scale-95 ${selectedCustomColor === color.name ? "ring-2 ring-white ring-offset-4 ring-offset-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.15)]" : "ring-0"}`}
                aria-label={`Selecionar cor ${color.name}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
