"use client";

import { useState } from "react";

const themes = [
  {
    name: "Light Clean",
    type: "FREE",
    glow: "bg-zinc-400/10",
    mockupBg: "bg-zinc-50",
    mockupBorder: "border-zinc-200",
    notch: "bg-zinc-200",
    avatar: "bg-zinc-200",
    text1: "bg-zinc-900",
    text2: "bg-zinc-200",
    linkBg: "bg-white",
    linkBorder: "border-zinc-200",
    linkIcon: "bg-zinc-300",
    linkText: "bg-zinc-400",
  },
  {
    name: "Dark Minimal",
    type: "FREE",
    glow: "bg-zinc-500/10",
    mockupBg: "bg-zinc-950",
    mockupBorder: "border-zinc-800",
    notch: "bg-zinc-800",
    avatar: "bg-zinc-900 border border-zinc-700",
    text1: "bg-zinc-100",
    text2: "bg-zinc-800",
    linkBg: "bg-zinc-900/50",
    linkBorder: "border-zinc-800",
    linkIcon: "bg-zinc-700",
    linkText: "bg-zinc-400",
  },
  {
    name: "Dark Hacker",
    type: "PRO",
    glow: "bg-emerald-500/15",
    mockupBg: "bg-zinc-900",
    mockupBorder: "border-emerald-500/30",
    notch: "bg-zinc-800",
    avatar: "bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    text1: "bg-emerald-500",
    text2: "bg-zinc-700",
    linkBg: "bg-zinc-800/50",
    linkBorder: "border-emerald-500/20",
    linkIcon: "bg-emerald-500/60",
    linkText: "bg-zinc-300",
  },
  {
    name: "Corporate",
    type: "PRO",
    glow: "bg-blue-600/15",
    mockupBg: "bg-slate-900",
    mockupBorder: "border-blue-500/30",
    notch: "bg-slate-800",
    avatar: "bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    text1: "bg-blue-500",
    text2: "bg-slate-700",
    linkBg: "bg-slate-800/50",
    linkBorder: "border-blue-500/20",
    linkIcon: "bg-blue-500/60",
    linkText: "bg-slate-300",
  },
  {
    name: "Personalizado",
    type: "PRO",
    glow: "bg-violet-500/15",
    mockupBg: "bg-zinc-950",
    mockupBorder: "border-zinc-800",
    notch: "bg-zinc-900",
    avatar: "bg-zinc-800 border-2 border-dashed border-violet-500/50",
    text1: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    text2: "bg-zinc-800",
    linkBg: "bg-zinc-900",
    linkBorder: "border-zinc-800",
    linkIcon: "bg-gradient-to-tr from-violet-500 to-fuchsia-500",
    linkText: "bg-zinc-600",
  },
];

export default function ThemeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1); // Começa no "Dark Minimal"

  const prevTheme = () => {
    setCurrentIndex((prev) => (prev === 0 ? themes.length - 1 : prev - 1));
  };

  const nextTheme = () => {
    setCurrentIndex((prev) => (prev === themes.length - 1 ? 0 : prev + 1));
  };

  const selected = themes[currentIndex];

  return (
    <div className="mt-24 w-full flex flex-col items-center animate-fade-in-up delay-200">
      <h3 className="text-sm md:text-base font-medium text-zinc-400 tracking-tight mb-8">
        Escolha entre os seus temas favoritos
      </h3>

      <div className="flex items-center justify-center gap-6 sm:gap-12 w-full">
        <button
          onClick={prevTheme}
          className="p-3 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900 rounded-full transition-all duration-200 hover:scale-[1.05] active:scale-95 border border-zinc-800/50 hover:border-zinc-700 shadow-sm"
          aria-label="Tema anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="relative w-full max-w-[260px]">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[90%] blur-[80px] -z-10 rounded-full transition-colors duration-1000 ${selected.glow}`}
          ></div>

          <div
            className={`w-full aspect-[9/19] rounded-[2.5rem] border p-4 shadow-2xl relative overflow-hidden flex flex-col gap-4 transition-colors duration-500 group hover:border-zinc-400 ${selected.mockupBg} ${selected.mockupBorder}`}
          >
            <div
              className={`w-24 h-5 rounded-full mx-auto transition-colors duration-500 ${selected.notch}`}
            ></div>
            <div
              className={`w-16 h-16 rounded-full mx-auto mt-6 shrink-0 transition-all duration-500 ${selected.avatar}`}
            ></div>

            <div className="flex flex-col gap-3 mt-2 shrink-0">
              <div
                className={`w-28 h-3 rounded-full mx-auto transition-colors duration-500 ${selected.text1}`}
              ></div>
              <div
                className={`w-40 h-2.5 rounded-full mx-auto transition-colors duration-500 ${selected.text2}`}
              ></div>
            </div>

            <div className="flex flex-col gap-3 mt-8 shrink-0">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className={`w-full h-11 rounded-xl border flex items-center px-4 transition-colors duration-500 ${selected.linkBg} ${selected.linkBorder}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full shrink-0 transition-colors duration-500 ${selected.linkIcon}`}
                  ></div>
                  <div
                    className={`h-2.5 rounded-full mx-auto transition-colors duration-500 ${selected.linkText} ${i === 0 ? "w-24" : i === 1 ? "w-28" : "w-20"}`}
                  ></div>
                  <div className="w-4 h-4 shrink-0"></div>
                </div>
              ))}
            </div>

            <div
              className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t pointer-events-none transition-colors duration-500 ${selected.name === "Light Clean" ? "from-white/50" : selected.name === "Corporate" ? "from-slate-900/80" : selected.name === "Dark Hacker" ? "from-zinc-900/80" : "from-zinc-950/80"} to-transparent`}
            ></div>
          </div>
        </div>

        <button
          onClick={nextTheme}
          className="p-3 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900 rounded-full transition-all duration-200 hover:scale-[1.05] active:scale-95 border border-zinc-800/50 hover:border-zinc-700 shadow-sm"
          aria-label="Próximo tema"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-8 text-center min-h-[40px] flex flex-col items-center gap-2">
        <span className="text-sm font-medium tracking-wide text-zinc-500 transition-opacity duration-300">
          Tema Atual:{" "}
          <span className="text-zinc-200 uppercase">{selected.name}</span>
        </span>

        {selected.type === "PRO" && (
          <div className="bg-zinc-100 text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-sm animate-fade-in-up uppercase tracking-widest shadow-lg">
            Plano Pro
          </div>
        )}
      </div>
    </div>
  );
}
