"use client";
import { useState } from "react";

export default function ShowcaseBuilder({ initialProjects = [], plan = "FREE" }: { initialProjects?: { title: string; description: string; linkUrl: string | null }[], plan?: string }) {
  const [items, setItems] = useState(
    initialProjects.length > 0
      ? initialProjects.map(p => ({ title: p.title, description: p.description, linkUrl: p.linkUrl || "" }))
      : [{ title: "", description: "", linkUrl: "" }]
  );

  const isPro = plan === "PRO";
  const reachLimit = !isPro && items.length >= 1;

  const addItem = () => {
    if (reachLimit) return;
    setItems([...items, { title: "", description: "", linkUrl: "" }]);
  };

  const removeItem = (indexToRemove: number) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  const updateItem = (
    index: number,
    field: "title" | "description" | "linkUrl",
    value: string,
  ) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <div className="space-y-6 mt-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 bg-zinc-950 p-5 rounded-xl border border-zinc-800 relative group"
        >
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-zinc-300 font-medium text-sm uppercase tracking-wider">
              Destaque #{index + 1}
            </h4>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-zinc-600 hover:text-red-400 p-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              title="Remover"
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
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>

          <input
            type="text"
            placeholder="Ex: Meu E-book, Mentoria, Portfólio 2026..."
            value={item.title}
            onChange={(e) => updateItem(index, "title", e.target.value)}
            className="block w-full rounded-md bg-zinc-900 border border-zinc-700 text-white p-3 outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-colors duration-200"
          />
          <textarea
            placeholder="Descreva os detalhes e gere desejo no seu cliente..."
            rows={3}
            value={item.description}
            onChange={(e) => updateItem(index, "description", e.target.value)}
            className="block w-full rounded-md bg-zinc-900 border border-zinc-700 text-white p-3 outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-colors duration-200 resize-none"
          />
          <input
            type="url"
            placeholder="Link de Ação (Ex: https://...)"
            value={item.linkUrl}
            onChange={(e) => updateItem(index, "linkUrl", e.target.value)}
            className="block w-full rounded-md bg-zinc-900 border border-zinc-700 text-white p-3 outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-colors duration-200"
          />

          <input type="hidden" name="showcaseTitles" value={item.title} />
          <input
            type="hidden"
            name="showcaseDescriptions"
            value={item.description}
          />
          <input type="hidden" name="showcaseLinks" value={item.linkUrl} />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
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
        Adicionar Novo Destaque
      </button>

      {reachLimit && (
        <p className="text-center text-xs font-medium text-zinc-500 mt-2">
          Limite de 1 destaque atingido no plano Grátis.
        </p>
      )}
    </div>
  );
}
