import { trackVisit } from "@/app/actions/track";
import TrackedLink from "@/app/components/TrackedLink";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

const customColorsMap = {
  cosmic: {
    glow: "bg-violet-500/20",
    avatarRing: "border-zinc-900 ring-violet-500",
    roleText:
      "bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent",
    whatsappButton:
      "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-violet-500/20 hover:opacity-90 transition-opacity",
    linkButton:
      "bg-zinc-800/80 hover:bg-zinc-700 text-white border-zinc-700 hover:border-violet-500 hover:shadow-[0_10px_20px_-10px_rgba(139,92,246,0.3)]",
    watermark:
      "bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent",
    projectTitle:
      "bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent",
    projectButton:
      "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-violet-500",
  },
  ocean: {
    glow: "bg-blue-600/20",
    avatarRing: "border-zinc-900 ring-blue-600",
    roleText:
      "bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent",
    whatsappButton:
      "bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-blue-500/20 hover:opacity-90 transition-opacity",
    linkButton:
      "bg-zinc-800/80 hover:bg-zinc-700 text-white border-zinc-700 hover:border-blue-500 hover:shadow-[0_10px_20px_-10px_rgba(37,99,235,0.3)]",
    watermark:
      "bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent",
    projectTitle:
      "bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent",
    projectButton:
      "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-blue-500",
  },
  sunset: {
    glow: "bg-orange-500/20",
    avatarRing: "border-zinc-900 ring-orange-500",
    roleText:
      "bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent",
    whatsappButton:
      "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-orange-500/20 hover:opacity-90 transition-opacity",
    linkButton:
      "bg-zinc-800/80 hover:bg-zinc-700 text-white border-zinc-700 hover:border-orange-500 hover:shadow-[0_10px_20px_-10px_rgba(249,115,22,0.3)]",
    watermark:
      "bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent",
    projectTitle:
      "bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent",
    projectButton:
      "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-orange-500",
  },
  "neon-cyan": {
    glow: "bg-teal-500/20",
    avatarRing: "border-zinc-900 ring-teal-500",
    roleText:
      "bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent",
    whatsappButton:
      "bg-gradient-to-r from-cyan-400 to-teal-500 text-white shadow-teal-500/20 hover:opacity-90 transition-opacity",
    linkButton:
      "bg-zinc-800/80 hover:bg-zinc-700 text-white border-zinc-700 hover:border-teal-500 hover:shadow-[0_10px_20px_-10px_rgba(20,184,166,0.3)]",
    watermark:
      "bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent",
    projectTitle:
      "bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent",
    projectButton:
      "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-teal-500",
  },
};

function getThemeContext(themeName: string, customColor: string | null) {
  console.log("🛠️ TEMA RECEBIDO DO BANCO:", themeName);
  console.log("🛠️ COR RECEBIDA DO BANCO:", customColor);

  const isCustomTheme =
    themeName === "Personalizado" ||
    themeName === "custom" ||
    themeName === "personalizado";

  if (isCustomTheme) {
    const safeColor =
      customColor &&
      customColorsMap[customColor as keyof typeof customColorsMap]
        ? (customColor as keyof typeof customColorsMap)
        : "ocean";

    const colorMap = customColorsMap[safeColor];

    return {
      background: "bg-zinc-950 text-white",
      card: "bg-zinc-900 border-zinc-800",
      bioText: "text-zinc-400",
      projectCard: "bg-zinc-950/50 border border-zinc-800",
      projectDesc: "text-zinc-400",
      ...colorMap,
    };
  }

  const staticThemes: Record<string, any> = {
    light: {
      /* ... */
    },
    "dark-minimal": {
      background: "bg-zinc-950 text-white",
      card: "bg-zinc-900 border-zinc-800",
      glow: "bg-zinc-500/10",
      avatarRing: "border-zinc-900 ring-zinc-700",
      roleText: "text-zinc-400",
      bioText: "text-zinc-400",
      whatsappButton:
        "bg-white text-zinc-950 hover:bg-zinc-200 shadow-white/10",
      linkButton:
        "bg-zinc-800/80 hover:bg-zinc-700 text-white border-zinc-700 hover:border-zinc-500 hover:shadow-[0_10px_20px_-10px_rgba(255,255,255,0.05)]",
      watermark: "text-zinc-300",
      projectCard: "bg-zinc-950/50 border border-zinc-800",
      projectTitle: "text-zinc-100",
      projectDesc: "text-zinc-400",
      projectButton:
        "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500",
    },
    "dark-hacker": {
      background: "bg-zinc-950 text-white",
      card: "bg-zinc-900 border-zinc-800",
      glow: "bg-emerald-500/20",
      avatarRing: "border-zinc-900 ring-emerald-500",
      roleText: "text-emerald-400",
      bioText: "text-zinc-400",
      whatsappButton:
        "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20",
      linkButton:
        "bg-zinc-800/80 hover:bg-zinc-700 text-white border-zinc-700 hover:border-emerald-500 hover:shadow-[0_10px_20px_-10px_rgba(16,185,129,0.3)]",
      watermark: "text-emerald-500",
      projectCard: "bg-zinc-950/50 border border-zinc-800",
      projectTitle: "text-emerald-400",
      projectDesc: "text-zinc-400",
      projectButton:
        "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-500",
    },
    corporate: {
      background: "bg-slate-950 text-white",
      card: "bg-slate-900 border-slate-800",
      glow: "bg-blue-500/20",
      avatarRing: "border-slate-900 ring-blue-500",
      roleText: "text-blue-400",
      bioText: "text-slate-400",
      whatsappButton:
        "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20",
      linkButton:
        "bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700 hover:border-blue-500 hover:shadow-[0_10px_20px_-10px_rgba(59,130,246,0.3)]",
      watermark: "text-blue-500",
      projectCard: "bg-slate-950/50 border border-slate-800",
      projectTitle: "text-blue-400",
      projectDesc: "text-slate-400",
      projectButton:
        "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 hover:border-blue-500",
    },
  };

  return staticThemes[themeName] || staticThemes["dark-minimal"];
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  trackVisit(resolvedParams.slug);

  const profile = await prisma.profile.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      user: true,
      links: { orderBy: { position: "asc" } },
      projects: { orderBy: { position: "asc" } },
    },
  });

  if (!profile) {
    notFound();
  }

  const currentTheme = getThemeContext(profile.theme, profile.customColor);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center p-4 md:p-8 font-[family-name:var(--font-geist-sans)] transition-colors duration-500 ${currentTheme.background}`}
    >
      <main
        className={`max-w-3xl w-full rounded-3xl p-8 md:p-16 relative overflow-hidden transition-colors duration-500 border mb-16 mt-8 ${currentTheme.card}`}
      >
        {profile.bannerUrl ? (
          <div className="absolute top-0 left-0 w-full h-32 md:h-48">
            <img
              src={profile.bannerUrl}
              alt="Banner"
              className="w-full h-full object-cover opacity-80"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${profile.theme === "light" ? "from-white" : profile.theme === "corporate" ? "from-slate-900" : "from-zinc-900"} to-transparent`}
            ></div>
          </div>
        ) : (
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-[100px] pointer-events-none transition-colors duration-1000 ${currentTheme.glow}`}
          ></div>
        )}

        <div className="relative z-10 flex flex-col items-center text-center pt-8 md:pt-16">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt={`Foto de ${profile.fullName}`}
              className={`w-40 h-40 rounded-full object-cover mb-6 border-4 ring-4 shadow-2xl transition-all duration-500 animate-fade-in-up ${currentTheme.avatarRing}`}
              style={{ animationDelay: '100ms', animationFillMode: 'both' }}
            />
          )}

          <div className="animate-fade-in-up flex flex-col items-center" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
              {profile.fullName}
            </h1>
            <h2
              className={`text-xl md:text-2xl font-semibold mb-8 transition-colors duration-500 ${currentTheme.roleText}`}
            >
              {profile.role}
            </h2>

            {profile.bio && (
              <p
                className={`text-base md:text-lg leading-relaxed max-w-2xl mb-10 transition-colors duration-500 ${currentTheme.bioText}`}
              >
                {profile.bio}
              </p>
            )}
          </div>

          {/* LINKS E WHATSAPP */}
          <div className="flex flex-col gap-4 w-full max-w-md mb-12 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            {profile.whatsappNumber && profile.user.plan === "PRO" && (
              <TrackedLink
                profileId={profile.id}
                href={`https://wa.me/55${profile.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(profile.whatsappMessage || "")}`}
                target="_blank"
                rel="noreferrer"
                className={`w-full font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 mb-2 shadow-lg hover:-translate-y-1 ${currentTheme.whatsappButton}`}
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Fale comigo no WhatsApp
              </TrackedLink>
            )}

            {profile.links.map((link) => (
              <TrackedLink
                key={link.id}
                profileId={profile.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`font-medium py-4 px-6 rounded-xl transition-all flex items-center justify-center border backdrop-blur-sm hover:-translate-y-1 ${currentTheme.linkButton}`}
              >
                {link.title}
              </TrackedLink>
            ))}
          </div>

          {profile.projects.length > 0 && (
            <div className="w-full pt-8 border-t border-zinc-500/20 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
              <h3
                className={`text-2xl font-bold mb-8 transition-colors duration-500 ${currentTheme.roleText}`}
              >
                Destaques & Serviços
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {profile.projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-6 flex flex-col justify-between h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-700/80 group"
                  >
                    <div>
                      <h4
                        className={`text-xl font-bold mb-3 transition-colors duration-500 ${currentTheme.projectTitle}`}
                      >
                        {project.title}
                      </h4>
                      <p
                        className={`text-sm leading-relaxed mb-6 whitespace-pre-wrap transition-colors duration-500 ${currentTheme.projectDesc}`}
                      >
                        {project.description}
                      </p>
                    </div>

                    {project.linkUrl && (
                      <TrackedLink
                        profileId={profile.id}
                        href={project.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`mt-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors text-sm w-full sm:w-auto ${currentTheme.projectButton}`}
                      >
                        Acessar
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </TrackedLink>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="text-center text-xs text-zinc-600 mt-16 pb-8 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
        Feito com{" "}
        <Link
          href="/"
          className="hover:text-zinc-400 font-medium transition-colors duration-500"
        >
          DevFolio
        </Link>
      </div>
    </div>
  );
}
