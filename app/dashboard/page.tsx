import { prisma } from "@/lib/prisma";
import { ExternalLink } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import BannerUploader from "./BannerUploader";
import ImageUploader from "./ImageUploader";
import LinkBuilder from "./LinkBuilder";
import SaveButton from "./SaveButton";
import ShowcaseBuilder from "./ShowcaseBuilder";
import SlugInput from "./SlugInput"; // <-- O nosso novo Input Inteligente!
import ThemeSelector from "./ThemeSelector";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/");

  const email = user.emailAddresses[0].emailAddress || "";
  const dbUser = await prisma.user.findUnique({
    where: { email },
    include: {
      profile: {
        include: {
          analytics: true,
          links: { orderBy: { position: "asc" } },
          projects: { orderBy: { position: "asc" } },
        },
      },
    },
  });

  const profile = dbUser?.profile;
  const analytics = profile?.analytics;
  const views = analytics?.views || 0;
  const clicks = analytics?.clicks || 0;
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : "0.0";

  async function savePortfolio(formData: FormData) {
    "use server";

    const userAction = await currentUser();
    if (!userAction) throw new Error("Usuário não autenticado");

    const avatarUrl = formData.get("avatarUrl") as string | null;
    const bannerUrl = formData.get("bannerUrl") as string | null;

    let slug = formData.get("slug") as string;
    slug = slug.toLowerCase().trim().replace(/\s+/g, "-");

    // TRAVA DE SEGURANÇA NO BACKEND (Evita que salvem slug duplicado)
    const email = userAction.emailAddresses[0].emailAddress || "";
    const dbUser = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, password_hash: "via-clerk" },
    });

    const existingSlug = await prisma.profile.findUnique({ where: { slug } });
    if (existingSlug && existingSlug.userId !== dbUser.id) {
      throw new Error("Slug já está em uso por outra pessoa!");
      // Em um app real, aqui retornaríamos um toast de erro para a tela.
    }

    const fullName = formData.get("fullName") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;

    const whatsappNumber = formData.get("whatsappNumber") as string | null;
    const whatsappMessage = formData.get("whatsappMessage") as string | null;
    const theme = (formData.get("theme") as string) || "dark-minimal";
    const rawCustomColor = formData.get("customColor") as string | null;

    const linkTitles = formData.getAll("linkTitles") as string[];
    const linkUrls = formData.getAll("linkUrls") as string[];
    let linksData = linkTitles
      .map((title, index) => ({
        title: title,
        url: linkUrls[index],
        position: index,
      }))
      .filter((link) => link.title.trim() !== "" && link.url.trim() !== "");

    // TRAVA MÁXIMA DE INTEGRIDADE DE LIMITES FREE NO BACKEND
    if (dbUser.plan !== "PRO" && linksData.length > 2) {
      linksData = linksData.slice(0, 2);
    }

    const showcaseTitles = formData.getAll("showcaseTitles") as string[];
    const showcaseDescriptions = formData.getAll(
      "showcaseDescriptions",
    ) as string[];
    const showcaseLinks = formData.getAll("showcaseLinks") as string[];

    let projectsData = showcaseTitles
      .map((title, index) => ({
        title: title,
        description: showcaseDescriptions[index],
        linkUrl: showcaseLinks[index] || null,
        position: index,
      }))
      .filter((project) => project.title.trim() !== "");

    // TRAVA DE DESTAQUES (Apenas 1 para FREE)
    if (dbUser.plan !== "PRO" && projectsData.length > 1) {
      projectsData = projectsData.slice(0, 1);
    }

    const customColor = theme === "Personalizado" ? rawCustomColor : null;

    await prisma.profile.upsert({
      where: { userId: dbUser.id },
      update: {
        slug,
        fullName,
        role,
        bio,
        avatarUrl,
        bannerUrl,
        whatsappNumber,
        whatsappMessage,
        theme,
        customColor,
        links: { deleteMany: {}, create: linksData },
        projects: { deleteMany: {}, create: projectsData },
      },
      create: {
        userId: dbUser.id,
        slug,
        fullName,
        role,
        bio,
        avatarUrl,
        bannerUrl,
        whatsappNumber,
        whatsappMessage,
        theme,
        customColor,
        links: { create: linksData },
        projects: { create: projectsData },
      },
    });

    revalidatePath("/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-[family-name:var(--font-geist-sans)] p-8 selection:bg-zinc-800 selection:text-zinc-100">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-12 border-b border-zinc-800/50 pb-6">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
          Painel DevFolio
        </h1>
        <UserButton
          appearance={{ elements: { userButtonAvatarBox: "w-9 h-9" } }}
        />
      </header>

      <main className="max-w-2xl mx-auto space-y-8">
        {/* ESTATÍSTICAS */}
        {profile && (
          <section className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
            {/* Glow sutil de fundo que reage ao grupo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-violet-500/10 group-hover:scale-110 -mr-20 -mt-20"></div>

            <h2 className="text-sm font-semibold text-zinc-100 mb-6 flex items-center gap-2 uppercase tracking-widest">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-violet-400"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
              Estatísticas do Perfil
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-zinc-950/50 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors rounded-xl p-5 relative overflow-hidden">
                <p className="text-xs font-semibold text-zinc-400 mb-1.5 flex items-center gap-1.5 tracking-wider">
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
                    className="text-emerald-400"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  VISUALIZAÇÕES
                </p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-black tracking-tighter text-white">
                    {views}
                  </p>
                </div>
              </div>

              <div className="bg-zinc-950/50 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors rounded-xl p-5 relative overflow-hidden">
                <p className="text-xs font-semibold text-zinc-400 mb-1.5 flex items-center gap-1.5 tracking-wider">
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
                    className="text-blue-400"
                  >
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                  CLIQUES
                </p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-black tracking-tighter text-white">
                    {clicks}
                  </p>
                </div>
              </div>

              <div className="bg-zinc-950/50 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors rounded-xl p-5 relative overflow-hidden col-span-2 lg:col-span-1">
                <p className="text-xs font-semibold text-zinc-400 mb-1.5 flex items-center gap-1.5 tracking-wider">
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
                    className="text-fuchsia-400"
                  >
                    <path d="m12 14 4-4" />
                    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                  </svg>
                  TAXA / CTR
                </p>
                <div className="flex items-end gap-1">
                  <p className="text-4xl font-black tracking-tighter text-white">
                    {ctr}
                  </p>
                  <span className="text-lg font-bold text-zinc-500 mb-1">
                    %
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* EDITOR */}
        <section className="bg-zinc-900 p-8 sm:p-10 rounded-2xl border border-zinc-800 shadow-xl">
          <h2 className="text-xl font-medium text-zinc-100 mb-8">
            Informações do seu Portfólio
          </h2>

          <form action={savePortfolio} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3 text-center">
                Sua Foto de Perfil
              </label>
              <ImageUploader initialImageUrl={profile?.avatarUrl} />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3 text-center mt-8">
                Imagem de Fundo (Banner)
              </label>
              <BannerUploader initialBannerUrl={profile?.bannerUrl} />
            </div>

            <div className="pt-6 border-t border-zinc-800/50">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Link do seu site
              </label>
              <SlugInput initialSlug={profile?.slug} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="fullName"
                  defaultValue={profile?.fullName}
                  required
                  placeholder="Ex: Caio Campos"
                  className="block w-full rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 p-3 outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Cargo / Especialidade
                </label>
                <input
                  type="text"
                  name="role"
                  defaultValue={profile?.role}
                  required
                  placeholder="Ex: Full Stack Developer"
                  className="block w-full rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 p-3 outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Sobre você (Bio)
              </label>
              <textarea
                name="bio"
                defaultValue={profile?.bio || ""}
                rows={4}
                placeholder="Escreva um breve resumo..."
                className="block w-full rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 p-3 outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-colors resize-none text-sm"
              ></textarea>
            </div>

            <div className="pt-8 border-t border-zinc-800/50">
              <h3 className="text-lg font-medium text-zinc-100 mb-1">
                Botão Destaque: WhatsApp
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                Um botão exclusivo no topo do seu perfil para os clientes te
                chamarem em 1 clique.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Número (com DDD)
                  </label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    defaultValue={profile?.whatsappNumber || ""}
                    placeholder="Ex: 21999999999"
                    className="block w-full rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 p-3 outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Mensagem Automática
                  </label>
                  <input
                    type="text"
                    name="whatsappMessage"
                    defaultValue={profile?.whatsappMessage || ""}
                    placeholder="Ex: Olá! Vim pelo seu DevFolio."
                    className="block w-full rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 p-3 outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-colors text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-800/50">
              <h3 className="text-lg font-medium text-zinc-100 mb-1">
                Seus Links Rápidos
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                Adicione seus contatos e redes sociais.
              </p>
              <LinkBuilder
                initialLinks={profile?.links}
                plan={dbUser?.plan || "FREE"}
              />
            </div>

            <div className="pt-8 border-t border-zinc-800/50">
              <h3 className="text-lg font-medium text-zinc-100 mb-1">
                Vitrine de Destaques
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                Crie cards bonitos para vender seus produtos, exibir portfólio
                ou serviços.
              </p>
              <ShowcaseBuilder
                initialProjects={profile?.projects}
                plan={dbUser?.plan || "FREE"}
              />
            </div>

            <ThemeSelector
              initialTheme={profile?.theme}
              initialCustomColor={profile?.customColor}
            />

            <div className="pt-8 gap-4 flex flex-col">
              <SaveButton />
              {profile?.slug && (() => {
                const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
                const finalUrl = `${baseUrl.replace(/\/+$/, '')}/p/${profile.slug}`;
                return (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center mt-4">
                    <p className="text-sm font-medium text-emerald-400/80 mb-3">
                      Seu portfólio está online em:
                    </p>
                    <a 
                      href={finalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-sm tracking-wide rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-10px_rgba(16,185,129,0.3)] group"
                    >
                      {finalUrl.replace(/^https?:\/\//, '')}
                      <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                );
              })()}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
