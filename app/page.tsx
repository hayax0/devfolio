import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import ThemeCarousel from "./components/ThemeCarousel";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-400 font-[family-name:var(--font-geist-sans)] selection:bg-zinc-800 selection:text-zinc-100 flex flex-col">
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { 
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
        .delay-100 { animation-delay: 100ms; opacity: 0; }
        .delay-200 { animation-delay: 200ms; opacity: 0; }
      `}</style>

      <nav className="border-b border-zinc-800/50 relative z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-6">
          <div className="text-zinc-100 font-semibold tracking-tight text-lg">
            DevFolio
          </div>
          <div className="flex items-center gap-6">
            {user ? (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-zinc-950 bg-white px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors"
              >
                Ir para o Painel
              </Link>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
                    Entrar
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm font-medium text-zinc-950 bg-white px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors">
                    Criar Conta
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-40 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-zinc-100 max-w-4xl leading-[1.05] mb-8 animate-fade-in-up">
            Sua imagem profissional, em um único link de alto nível.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed animate-fade-in-up delay-100">
            Abandone PDFs pesados e links genéricos. Reúna portfólio, serviços e
            contatos em uma página rápida, elegante e desenhada para destacar
            você.
          </p>

          <ThemeCarousel />
        </section>

        {/* BENTO GRID */}
        <section className="py-24 md:py-32 border-t border-zinc-800/50 bg-zinc-950">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-20 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-100 mb-6">
                Poderoso e profissional
              </h2>
              <p className="text-lg text-zinc-400">
                Ferramentas de alto nível desenhadas para você ter controle
                total do seu perfil.
              </p>
            </div>

            <div className="max-w-5xl mx-auto w-full">
              {/* Analytics Único */}
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-[2rem] p-10 md:p-14 hover:border-zinc-700/80 transition-colors group relative overflow-hidden flex flex-col items-center">
                <div className="text-center relative z-10 mb-12">
                  <h3 className="text-3xl md:text-4xl font-semibold text-zinc-100 mb-4 tracking-tighter">
                    Analytics Integrado
                  </h3>
                  <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                    Monitore visualizações, cliques em links e taxa de conversão
                    do seu perfil em tempo real com precisão absoluta.
                  </p>
                </div>

                <div className="bg-zinc-950 border border-zinc-800/80 rounded-[2rem] p-8 md:p-12 relative z-10 shadow-2xl overflow-hidden w-full max-w-3xl mx-auto">
                  {/* Dashboard Header */}
                  <div className="flex flex-col items-center justify-center gap-4 mb-10 pb-8 border-b border-zinc-800/50">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
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
                          className="text-zinc-300"
                        >
                          <path d="M3 3v18h18" />
                          <path d="m19 9-5 5-4-4-3 3" />
                        </svg>
                      </div>
                      <div className="text-base font-semibold text-zinc-200 uppercase tracking-widest text-center">
                        Visão Geral
                      </div>
                      <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-700 mx-1"></div>
                      <div className="text-xs font-mono text-zinc-400 bg-zinc-900 py-2 px-4 rounded-lg border border-zinc-800 text-center">
                        Últimos 30 dias
                      </div>
                    </div>
                  </div>

                  {/* Metrics Flex Row Centered */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 mb-12">
                    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800/50 flex flex-col items-center justify-center min-w-[140px] w-full sm:w-auto">
                      <div className="text-[11px] uppercase font-bold tracking-widest text-zinc-500 mb-2">
                        Visualizações
                      </div>
                      <div className="text-4xl md:text-5xl font-semibold text-zinc-100 tracking-tighter">
                        12.4k
                      </div>
                    </div>
                    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800/50 flex flex-col items-center justify-center min-w-[140px] w-full sm:w-auto">
                      <div className="text-[11px] uppercase font-bold tracking-widest text-zinc-500 mb-2">
                        Cliques
                      </div>
                      <div className="text-4xl md:text-5xl font-semibold text-zinc-100 tracking-tighter">
                        3.1k
                      </div>
                    </div>
                    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800/50 flex flex-col items-center justify-center min-w-[140px] w-full sm:w-auto">
                      <div className="text-[11px] uppercase font-bold tracking-widest text-zinc-500 mb-2">
                        CTR
                      </div>
                      <div className="text-4xl md:text-5xl font-semibold text-zinc-100 tracking-tighter">
                        25%
                      </div>
                    </div>
                  </div>

                  {/* Graph Line Aligning */}
                  <div className="h-40 w-full max-w-2xl mx-auto relative flex items-end justify-between px-2 pt-4">
                    <svg
                      className="absolute inset-0 h-full w-full opacity-80"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <path
                        d="M0 100 L 10 80 L 30 90 L 50 40 L 70 60 L 90 20 L 100 10"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        vectorEffect="non-scaling-stroke"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#52525B"
                            stopOpacity="0.2"
                          />
                          <stop
                            offset="50%"
                            stopColor="#A1A1AA"
                            stopOpacity="0.8"
                          />
                          <stop
                            offset="100%"
                            stopColor="#E4E4E7"
                            stopOpacity="1"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="w-[1px] h-full bg-zinc-800/40"></div>
                    <div className="w-[1px] h-full bg-zinc-800/40"></div>
                    <div className="w-[1px] h-full bg-zinc-800/40"></div>
                    <div className="w-[1px] h-full bg-zinc-800/40"></div>
                    <div className="w-[1px] h-full bg-zinc-800/40"></div>
                    <div className="w-[1px] h-full bg-zinc-800/40"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 border-t border-zinc-800/50 bg-zinc-950/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-20 max-w-2xl text-center mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-zinc-100 mb-6">
                Tudo que você precisa para se destacar
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Todas as ferramentas essenciais para construir sua vitrine
                digital de forma totalmente gratuita e profissional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in-up">
              {[
                {
                  title: "Perfil com foto e bio",
                  desc: "Apresente quem você é de forma clara e elegante.",
                },
                {
                  title: "Links ilimitados",
                  desc: "Agrupe todas as suas redes, contatos e materiais sem limites.",
                },
                {
                  title: "Temas pré-construídos",
                  desc: "Altere a aparência do seu portfólio em um único clique.",
                },
                {
                  title: "Vitrine de projetos em grid",
                  desc: "Destaque seus melhores trabalhos de forma visual chamativa.",
                },
                {
                  title: "Botão de WhatsApp",
                  desc: "Atendimento expresso direto na sua página.",
                },
                {
                  title: "Banner customizado",
                  desc: "Faça o upload da sua própria imagem e reforce sua identidade.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 hover:border-zinc-700 transition-colors flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-zinc-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-zinc-200 font-medium mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 flex justify-center">
              {!user ? (
                <SignUpButton mode="modal">
                  <button className="text-base font-medium text-zinc-950 bg-white px-10 py-4 rounded-full transition-all duration-300 hover:bg-zinc-200 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)]">
                    Criar meu portfólio
                  </button>
                </SignUpButton>
              ) : (
                <Link
                  href="/dashboard"
                  className="text-base font-medium text-zinc-950 bg-white px-10 py-4 rounded-full transition-all duration-300 hover:bg-zinc-200 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] inline-block"
                >
                  Acessar painel
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/50 py-10 bg-zinc-950 relative z-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="text-zinc-300">DevFolio</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} DevFolio. Todos os direitos
            reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
