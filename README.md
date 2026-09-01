# 🚀 Desenvolve Tech

> **Site institucional** de uma empresa de tecnologia que oferece serviços de desenvolvimento web, aplicativos móveis, soluções tecnológicas customizadas e análise de dados.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.x-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![Railway](https://img.shields.io/badge/Railway-Backend-0B0D0E?style=flat-square&logo=railway&logoColor=white)](https://railway.app/)

---

## 📋 Sobre o Projeto

O **Desenvolve Tech** é um monorepo fullstack composto por um site institucional moderno e uma API backend robusta. O frontend apresenta os serviços da empresa com foco em performance, acessibilidade e experiência do usuário; o backend gerencia o formulário de contato com rate limiting e integração de e-mail.

A arquitetura segue o padrão monorepo com **workspaces npm**, mantendo frontend e backend em um único repositório com pipeline de CI/CD compartilhado.

### Arquitetura

```
desenvolve_tech/
   │
   ├── frontend/     ◄── Next.js 16 + React 19 + Tailwind v4
   │                      Vercel (produção)
   │
   └── backend/      ◄── NestJS 11 + Nodemailer
                          Railway (produção)
```

---

## 🛠️ Tecnologias

### Frontend

| Tecnologia | Versão | Função |
|:-----------|:------:|:-------|
| Next.js | 16.3.1 | Framework React com App Router e SSR |
| React | 19.2.8 | Biblioteca de interface |
| TypeScript | 5.x | Tipagem estática |
| Tailwind CSS | v4 | Estilização utilitária |
| Motion | 13.x | Animações declarativas |
| shadcn/ui | 4.x | Componentes acessíveis (Base UI) |
| React Hook Form | 7.x | Gerenciamento de formulários |
| Zod | 4.x | Validação de esquemas |
| Sentry | 10.x | Monitoramento de erros em produção |
| Vitest | 3.x | Testes unitários e de componentes |
| Playwright | 1.50.x | Testes end-to-end |
| Lighthouse CI | 0.15.x | Auditoria de performance automatizada |

### Backend

| Tecnologia | Versão | Função |
|:-----------|:------:|:-------|
| NestJS | 11.x | Framework Node.js modular e escalável |
| TypeScript | 5.x | Tipagem estática |
| @nestjs/throttler | 6.x | Rate limiting (30 req/min global, 5/hora em `/contact`) |
| Nodemailer | 9.x | Envio de e-mails via SMTP |
| class-validator | 0.15.x | Validação de DTOs |
| class-transformer | 0.5.x | Transformação de objetos |
| Sentry | 10.x | Monitoramento de erros em produção |
| Jest | 30.x | Testes unitários e de integração |

### DevOps & Qualidade

| Ferramenta | Função |
|:-----------|:-------|
| Biome | Linter e formatter unificado (substitui ESLint + Prettier no monorepo) |
| Commitlint + Husky | Padronização de mensagens de commit (Conventional Commits) |
| Knip | Detecção de código e dependências não utilizadas |
| GitHub Actions | CI/CD — lint, test, build e e2e obrigatórios em cada PR |

---

## 🗂️ Estrutura do Projeto

```
desenvolve_tech/
├── frontend/
│   ├── src/
│   │   ├── app/               # App Router do Next.js (páginas e layouts)
│   │   ├── components/        # Componentes reutilizáveis
│   │   └── lib/               # Utilitários e configurações
│   ├── public/brand/          # Assets de marca (logo, ícones, imagens)
│   ├── playwright.config.ts   # Configuração de testes e2e
│   ├── vitest.config.ts       # Configuração de testes unitários
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── contact/           # Módulo de formulário de contato
│   │   ├── app.module.ts      # Módulo raiz com ThrottlerModule
│   │   └── main.ts            # Bootstrap da aplicação (porta 3001)
│   ├── test/                  # Testes e2e (Jest)
│   └── package.json
│
├── .github/workflows/         # Pipelines de CI/CD
├── biome.json                 # Configuração do Biome (monorepo)
├── lighthouserc.json          # Configuração do Lighthouse CI
└── package.json               # Workspaces npm
```

---

## ✨ Funcionalidades

- **Site institucional** com apresentação dos serviços: desenvolvimento web, apps, soluções customizadas e análise de dados
- **Formulário de contato** com validação client-side (Zod + React Hook Form) e envio via e-mail (Nodemailer)
- **Rate limiting** no backend: 30 requisições/minuto globalmente, 5 requisições/hora na rota de contato
- **Animações fluidas** com Motion (Framer Motion)
- **Monitoramento de erros** em frontend e backend via Sentry
- **Auditoria de performance** automatizada com Lighthouse CI a cada deploy
- **Testes automatizados** em três camadas: unitário, integração e end-to-end

---

## 🔒 Segurança & Performance

O backend aplica **rate limiting progressivo** via `@nestjs/throttler` para prevenir abuso do formulário de contato. O frontend é monitorado continuamente pelo **Lighthouse CI**, garantindo métricas de performance, acessibilidade e boas práticas a cada deploy.

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/alocss/desenvolve_tech.git
cd desenvolve_tech

# Instala dependências de todo o monorepo
npm install
```

### Executar o Frontend

```bash
cd frontend
npm run dev
```

Acesse em `http://localhost:3000`.

### Executar o Backend

```bash
cd backend
npm run start:dev
```

API disponível em `http://localhost:3001`.

---

## 🧪 Testes

```bash
# Testes unitários do frontend (Vitest)
cd frontend && npm run test:unit

# Testes e2e do frontend (Playwright)
cd frontend && npm run test:e2e

# Testes do backend (Jest)
cd backend && npm test
```

---

## 📦 Deploy

| Serviço | Aplicação | Trigger |
|:--------|:----------|:--------|
| **Vercel** | Frontend (Next.js) | Push na branch `main` |
| **Railway** | Backend (NestJS) | Push na branch `main` |

O pipeline de CI no GitHub Actions executa **lint → test → build → e2e** antes de qualquer merge. Todos os checks são obrigatórios.

---

## 🔗 Links

- **Site em produção** — deploy via Vercel
- **Repositório** — [github.com/alocss/desenvolve_tech](https://github.com/alocss/desenvolve_tech)

---

## 👤 Autor

**Alex Ribeiro**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-alexribeiro--dev-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/alexribeiro-dev)
[![GitHub](https://img.shields.io/badge/GitHub-alocss-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/alocss)
