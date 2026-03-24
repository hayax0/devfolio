"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";

export default function SaveButton() {
  const { pending } = useFormStatus();
  const [showSuccess, setShowSuccess] = useState(false);
  const wasPending = useRef(false);

  useEffect(() => {
    if (pending) {
      wasPending.current = true;
    } else if (wasPending.current) {
      wasPending.current = false;
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [pending]);

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-white text-zinc-950 font-bold py-3.5 px-4 rounded-xl transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] cursor-pointer text-base shadow-sm disabled:opacity-70 flex justify-center items-center gap-2"
      >
        {pending ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Salvando alterações...
          </>
        ) : (
          "Salvar Portfólio"
        )}
      </button>

      {showSuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl font-medium animate-fade-in-up flex items-center gap-2 z-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          Alterações salvas com sucesso!
        </div>
      )}
    </>
  );
}
