<div align="center">
  <h1>📁 DevFolio</h1>
  <p><strong>Gerador de Portfólio para Desenvolvedores</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/Railway-131415?style=flat-square&logo=railway&logoColor=white" alt="Railway" />
  </p>

  <p>Hub central para reunir links, projetos e informações profissionais em uma vitrine digital personalizada.</p>
</div>

---

## 📖 Sobre o Projeto

O **DevFolio** é uma ferramenta para desenvolvedores centralizarem sua presença online. Através de um painel de gerenciamento, o usuário consegue configurar sua biografia, links sociais e expor seus principais projetos de forma organizada e rápida.

## 🛠️ Funcionalidades

- **🌐 URL Personalizada**: Definição de slug único para o perfil.
- **🎨 Editor de Perfil**: Customização de Banner, Avatar e Bio.
- **🔗 Gestão de Conteúdo**: Cadastro de links e vitrine de projetos.
- **📊 Analytics Simples**: Monitoramento de visualizações e cliques.
- **📱 Responsivo**: Interface adaptada para qualquer dispositivo.

## 💻 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Auth:** Clerk
- **Banco de Dados:** PostgreSQL (Hospedado no **Railway**)
- **ORM:** Prisma

---

## 🚀 Diferenciais Técnicos

* **Relacionamentos Prisma:** Estrutura vinculando usuários a perfis, links e projetos.
* **Server Actions:** Manipulação de dados e revalidação de cache sem necessidade de APIs externas complexas.
* **Validação de Slug:** Verificação de disponibilidade de URL em tempo real.

---

## ⚙️ Como Rodar o Projeto

1. **Clone o repositório:**
   `git clone https://github.com/hayax0/devfolio.git`

2. **Instale as dependências:**
   `npm install`

3. **Configure as variáveis de ambiente (.env):**
   ```env
   DATABASE_URL="sua_url_do_postgres_no_railway"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="sua_key_do_clerk"
   CLERK_SECRET_KEY="seu_secret_do_clerk"
   
4. **Inicie o servidor:**
`npm run dev`

👨‍💻 Autor
Caio Campos
Graduando em Engenharia de Software (UVA) e Técnico em Desenvolvimento de Sistemas (NAVE/RJ).

<div align="center">
<p>Desenvolvido por <a href="https://www.google.com/search?q=https://github.com/hayax0">Caio Campos</a></p>
</div>
