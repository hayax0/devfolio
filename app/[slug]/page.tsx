import { prisma } from "@/lib/prisma";
import { ExternalLink, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PublicPortfolio({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const profile = await prisma.profile.findUnique({
    where: { slug: slug.toLowerCase() },
    include: {
      links: { orderBy: { position: "asc" } },
      projects: { orderBy: { position: "asc" } },
    },
  });

  if (!profile) {
    notFound();
  }

  // Theme Config Setup
  const isLight = profile.theme === "light";
  const isHacker = profile.theme === "dark-hacker";
  const isCorporate = profile.theme === "corporate";

  // Custom Color handling for Personalizado
  const customBg =
    profile.customColor === "ocean"
      ? "bg-blue-600 hover:bg-blue-500 text-white"
      : profile.customColor === "sunset"
        ? "bg-orange-500 hover:bg-orange-400 text-white"
        : profile.customColor === "neon-cyan"
          ? "bg-teal-500 hover:bg-teal-400 text-zinc-900"
          : "bg-violet-600 hover:bg-violet-500 text-white"; // default cosmic

  const containerClass = isLight
    ? "bg-zinc-50 text-zinc-900"
    : isHacker
      ? "bg-[#050505] text-emerald-400 font-mono"
      : isCorporate
        ? "bg-slate-900 text-slate-100"
        : "bg-zinc-950 text-zinc-100"; // dark-minimal & Personalizado

  const cardClass = isLight
    ? "bg-white border-zinc-200 text-zinc-900 shadow-xl shadow-zinc-200/50"
    : isHacker
      ? "bg-emerald-950/10 border-emerald-500/20 text-emerald-300 shadow-xl shadow-emerald-900/10"
      : isCorporate
        ? "bg-slate-800/80 border-slate-700 text-slate-200 shadow-xl shadow-slate-900/50"
        : "bg-zinc-900/40 backdrop-blur-xl border-zinc-800/60 text-zinc-200 shadow-2xl";

  const linkBtnClass =
    profile.theme === "Personalizado"
      ? `${customBg} border-transparent shadow-[0_0_20px_rgba(255,255,255,0.05)]`
      : isLight
        ? "bg-zinc-900 hover:bg-zinc-800 text-white border-transparent"
        : isHacker
          ? "bg-emerald-900/20 hover:bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          : isCorporate
            ? "bg-blue-600 hover:bg-blue-500 text-white border-transparent shadow-[0_5px_20px_rgba(37,99,235,0.3)]"
            : "bg-zinc-100 hover:bg-white text-zinc-950 border-transparent shadow-[0_10px_30px_rgba(255,255,255,0.1)]";

  return (
    <div
      className={`min-h-screen ${containerClass} transition-colors duration-500 selection:bg-zinc-500/30`}
    >
      {/* BANNER */}
      <div className="w-full h-48 md:h-64 relative overflow-hidden flex justify-center bg-zinc-900">
        {profile.bannerUrl ? (
          <Image
            src={profile.bannerUrl}
            alt="Banner do Perfil"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #71717a 0, #71717a 1px, transparent 0, transparent 10px)",
            }}
          ></div>
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${isLight ? "from-zinc-50" : isCorporate ? "from-slate-900" : isHacker ? "from-[#050505]" : "from-zinc-950"} to-transparent opacity-90`}
        ></div>
      </div>

      <main className="max-w-xl mx-auto px-6 -mt-24 relative z-10 pb-24">
        {/* HEADER / PROFILE */}
        <div className="flex flex-col items-center text-center animate-fade-in-up">
          <div
            className={`w-36 h-36 rounded-full border-[6px] ${isLight ? "border-zinc-50" : isCorporate ? "border-slate-900" : isHacker ? "border-[#050505]" : "border-zinc-950"} overflow-hidden shadow-2xl relative mb-5 bg-zinc-800 flex items-center justify-center transition-transform hover:scale-105 duration-500`}
          >
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-4xl font-black tracking-tighter text-zinc-500">
                {profile.fullName.charAt(0)}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-2">
            {profile.fullName}
          </h1>
          <p
            className={`text-lg mb-8 font-medium ${isLight ? "text-zinc-500" : isHacker ? "text-emerald-500" : isCorporate ? "text-slate-400" : "text-zinc-400"}`}
          >
            {profile.role}
          </p>

          {profile.bio && (
            <div
              className={`w-full p-8 rounded-[2rem] border ${cardClass} mb-12`}
            >
              <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base opacity-90">
                {profile.bio}
              </p>
            </div>
          )}
        </div>

        {/* LINKS */}
        {profile.links && profile.links.length > 0 && (
          <div
            className="flex flex-col gap-4 w-full mb-14 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            {profile.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-5 px-7 rounded-[1.5rem] transition-all duration-300 transform hover:-translate-y-1 ${linkBtnClass}`}
              >
                <span className="font-semibold">{link.title}</span>
                <ExternalLink className="w-5 h-5 opacity-70" />
              </a>
            ))}
          </div>
        )}

        {/* PROJECTS / VITRINE */}
        {profile.projects && profile.projects.length > 0 && (
          <div
            className="w-full animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <h2 className="text-xl font-bold mb-6 tracking-tight px-2 flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${isLight ? "bg-zinc-900" : isHacker ? "bg-emerald-500 animate-pulse" : isCorporate ? "bg-blue-500" : "bg-zinc-100"}`}
              ></span>
              Destaques
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {profile.projects.map((project) => (
                <div
                  key={project.id}
                  className={`flex flex-col h-full border rounded-[2rem] p-7 transition-all duration-500 hover:-translate-y-2 group ${cardClass}`}
                >
                  <h3 className="font-bold text-lg mb-3 leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  <p
                    className={`text-sm mb-8 flex-grow opacity-80 leading-relaxed`}
                  >
                    {project.description}
                  </p>
                  {project.linkUrl && (
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 w-max pb-1 border-b ${isLight ? "border-zinc-900/30 text-zinc-900 hover:border-zinc-900" : isHacker ? "text-emerald-400 border-emerald-500/30 hover:border-emerald-400" : isCorporate ? "text-blue-400 border-blue-400/30 hover:border-blue-400" : "text-zinc-100 border-zinc-700 hover:border-zinc-100"} transition-all`}
                    >
                      Acessar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WHATSAPP FLOAT or BUTTON */}
        {profile.whatsappNumber && (
          <div
            className="mt-14 flex justify-center animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href={`https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(profile.whatsappMessage || "Olá! Vim pelo seu portfólio.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-zinc-950 px-8 py-4 rounded-full font-bold shadow-[0_10px_40px_-10px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5" fill="currentColor" />
              Enviar Mensagem
            </a>
          </div>
        )}
      </main>

      {/* FOOTER BADGE */}
      <div className="pb-12 pt-6 flex justify-center relative z-10">
        <Link
          href="/"
          className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border opacity-50 hover:opacity-100 transition-all hover:-translate-y-0.5 ${isLight ? "border-zinc-300 text-zinc-500 bg-white/50" : isHacker ? "border-emerald-500/20 text-emerald-600 bg-emerald-950/20" : "border-zinc-800 text-zinc-500 bg-zinc-900/30"}`}
        >
          Feito com DevFolio
        </Link>
      </div>
    </div>
  );
}
