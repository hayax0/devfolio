"use client";

import { checkSlugAvailability } from "@/app/actions/checkSlug";
import { useEffect, useState } from "react";

export default function SlugInput({ initialSlug = "" }: { initialSlug?: string }) {
  const [slug, setSlug] = useState(initialSlug);
  const [status, setStatus] = useState<
    "idle" | "checking" | "available" | "unavailable"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!slug) {
      setStatus("idle");
      return;
    }

    setStatus("checking");

    const delayDebounceFn = setTimeout(async () => {
      try {
        const result = await checkSlugAvailability(slug);
        setStatus(result.available ? "available" : "unavailable");
        if (result.message) setMessage(result.message);
      } catch (error) {
        console.error("Erro ao checar slug:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = e.target.value.toLowerCase().replace(/\s+/g, "-");
    setSlug(formatted);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex">
        <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-zinc-800 bg-zinc-900 text-zinc-400 text-sm">
          devfolio.app/p/
        </span>
        <input
          type="text"
          name="slug"
          required
          placeholder="seunome"
          value={slug}
          onChange={handleChange}
          className={`flex-1 block w-full rounded-none rounded-r-md bg-zinc-950 border text-zinc-100 p-3 outline-none text-sm transition-colors ${
            status === "unavailable"
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : status === "available"
                ? "border-emerald-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                : "border-zinc-800 focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300"
          }`}
        />
      </div>

      <div className="h-5 mt-1">
        {status === "checking" && (
          <span className="text-xs text-zinc-400 animate-pulse">
            Verificando disponibilidade...
          </span>
        )}
        {status === "available" && (
          <span className="text-xs text-emerald-500">✅ URL disponível!</span>
        )}
        {status === "unavailable" && (
          <span className="text-xs text-red-500">
            ❌ {message || "Esta URL já está em uso."}
          </span>
        )}
      </div>
    </div>
  );
}
