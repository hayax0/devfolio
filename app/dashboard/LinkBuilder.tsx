"use client";
import { useState } from "react";

export default function LinkBuilder({ initialLinks = [], plan = "FREE" }: { initialLinks?: { title: string; url: string }[], plan?: string }) {
  const [links, setLinks] = useState(initialLinks.length > 0 ? initialLinks : [{ title: "", url: "" }]);
  const isPro = plan === "PRO";
  const reachLimit = !isPro && links.length >= 2;

  const addLink = () => {
    if (reachLimit) return;
    setLinks([...links, { title: "", url: "" }]);
  };

  const removeLink = (indexToRemove: number) => {
    setLinks(links.filter((_, index) => index !== indexToRemove));
  };

  const updateLink = (index: number, field: "title" | "url", value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  return (
    <div className="space-y-4 mt-2">
      {links.map((link, index) => (
        <div
          key={index}
          className="flex gap-4 items-center bg-zinc-950 p-4 rounded-xl border border-zinc-800 relative group"
        >
          <div className="flex-1 space-y-3">
            <input
              type="text"
              placeholder="Título (Ex: Meu Instagram, Portfólio, WhatsApp)"
              value={link.title}
              onChange={(e) => updateLink(index, "title", e.target.value)}
              className="block w-full rounded-md bg-zinc-900 border border-zinc-700 text-white p-2 outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-colors duration-200 text-sm"
            />
            <input
              type="url"
              placeholder="https://..."
              value={link.url}
              onChange={(e) => updateLink(index, "url", e.target.value)}
              className="block w-full rounded-md bg-zinc-900 border border-zinc-700 text-white p-2 outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-colors duration-200 text-sm"
            />

            <input type="hidden" name="linkTitles" value={link.title} />
            <input type="hidden" name="linkUrls" value={link.url} />
          </div>
          <button
            type="button"
            onClick={() => removeLink(index)}
            className="text-zinc-600 hover:text-red-400 p-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
            title="Remover Link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addLink}
        disabled={reachLimit}
        className={`w-full py-4 border-2 border-dashed rounded-xl font-medium flex justify-center items-center gap-2 transition-all duration-200 ${reachLimit ? 'border-zinc-800/50 text-zinc-600 opacity-50 cursor-not-allowed' : 'border-zinc-800 text-zinc-400 hover:border-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 hover:scale-[1.02] active:scale-95'}`}
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
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        Adicionar Novo Link
      </button>

      {reachLimit && (
        <p className="text-center text-xs font-medium text-zinc-500 mt-2">
          Limite de 2 links atingido no plano Grátis.
        </p>
      )}
    </div>
  );
}
