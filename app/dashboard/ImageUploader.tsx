"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";

export default function ImageUploader({ initialImageUrl = "" }: { initialImageUrl?: string | null }) {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl || "");

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
      {imageUrl ? (
        <div className="flex flex-col items-center gap-4">
          <img
            src={imageUrl}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full object-cover border-4 border-zinc-800 shadow-sm"
          />
          <input type="hidden" name="avatarUrl" value={imageUrl} />

          <button
            type="button"
            onClick={() => setImageUrl("")}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Remover e enviar outra
          </button>
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`Erro no upload: ${error.message}`);
          }}
          appearance={{
            button:
              "bg-white text-zinc-950 font-medium mt-4 hover:bg-zinc-200 transition-colors",
            label: "text-zinc-300 hover:text-zinc-100",
            allowedContent: "text-zinc-500",
          }}
        />
      )}
    </div>
  );
}
