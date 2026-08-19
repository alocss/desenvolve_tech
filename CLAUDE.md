# Contexto do Projeto — desenvolve_tech

> Este arquivo é lido por qualquer agente (Claude ou outro modelo) antes de implementar mudanças neste repositório. As regras abaixo são obrigatórias e têm precedência sobre atalhos convenientes.

## Status atual

**Produto**: site institucional da Desenvolve Tech — empresa de tecnologia focada em desenvolvimento de sites, aplicativos, soluções tecnológicas sob medida e análise de dados para empresas e prestadores de serviços. Objetivo do site: design inovador, com bastante animação e efeitos, para impressionar e converter futuros clientes.

**Stack**: monorepo (npm workspaces) com dois projetos fisicamente separados:
- `frontend/` — Next.js (App Router, TypeScript, Tailwind CSS v4), consome a API do backend via `NEXT_PUBLIC_API_URL`.
- `backend/` — NestJS (TypeScript), API própria com CORS restrito ao domínio do frontend e rate limit (`@nestjs/throttler`) habilitado globalmente.

Rodar localmente: `npm install` na raiz, depois `npm run dev:frontend` e `npm run dev:backend` (portas 3000 e 3001).

Roadmap de features rastreado nas Issues do GitHub (#1 a #9), uma por área do site (setup, design system, home, serviços, sobre, portfólio, contato/leads, SEO/performance, deploy).

Assets de marca (logo, wordmark, mockup) fornecidos pelo cliente estão em `frontend/public/brand/` — fonte em JPEG comprimido (export de WhatsApp); pedir versão em PNG/SVG com fundo transparente ao cliente antes de fechar o design system (Issue #2).

## Skills instaladas (`.claude/skills/`)

Pacote de skills de design da Hot Buro (Impeccable, UI/UX Pro Max, shadcn/ui, interaction/interface design, etc.) mais `design-motion-principles` (Kyle Zantos / Emil Kowalski / Jakub Krehel / Jhey Tompkins). Instaladas no escopo do projeto — ver seção "Padrão de interface" para quando usar `design-motion-principles`.

---

## 1. Fluxo de trabalho: Issues e Pull Requests

- **Toda tarefa vira uma Issue no GitHub antes de ser implementada**, classificada com exatamente um destes labels:
  - `correção` — bug fix, comportamento incorreto
  - `melhoria` — mudança em algo que já existe (performance, refactor, UX, etc.)
  - `nova função` — funcionalidade nova
- **Nenhum código vai direto para `main`.** Todo trabalho acontece em uma branch e é integrado via Pull Request (exceção: o commit inicial de bootstrap deste repositório, já que `main` não tinha nenhum commit).
- **Todo Pull Request deve conter, na descrição** (ver `.github/PULL_REQUEST_TEMPLATE.md`):
  1. **Issue relacionada** — referência que a feche automaticamente (`Closes #N`).
  2. **O que mudou** — resumo objetivo da mudança.
  3. **Como foi validado** — testes rodados, passos de verificação manual, evidências (prints, logs).
  4. **Riscos, limitações e próximos passos** — o que pode quebrar, o que ficou de fora do escopo, o que falta fazer depois.
- PRs só devem ser mergeados depois que a esteira de qualidade (seção 3) passar.

## 2. Padrão de interface (UI/UX)

Toda interface do sistema deve ter, quando fizer sentido para o componente/tela:

- **Lazy loading** de rotas, componentes pesados ou dados fora do viewport inicial.
- **Skeleton screens** para estados de carregamento (nunca tela em branco ou apenas um spinner genérico quando o layout final é previsível).
- **Animações suaves de entrada e saída** (nunca elementos aparecendo/sumindo de forma abrupta).
- **Estados de progresso** em elementos interativos (botões com loading state, barras de progresso em uploads/processos longos, etc.).
- **Feedback visual** para toda ação do usuário (clique, submit, erro, sucesso).
- **Transições consistentes** entre telas, cards, modais e listas — mesma linguagem de movimento em todo o sistema, não implementações ad-hoc por tela.

Use a skill **`design-motion-principles`**:
- Modo **create** ao construir ou animar qualquer componente de UI.
- Modo **audit** obrigatoriamente **antes de finalizar qualquer entrega de interface** — revisar como designer de produto sênior e corrigir tudo que parecer brusco, travado, genérico ou amador. Esse passo de auditoria é parte da definição de pronto (Definition of Done) de qualquer tarefa com componente visual, não uma etapa opcional.

## 3. Esteira de qualidade (obrigatória antes de merge em `main`)

Nenhum código entra em `main` sem passar pela esteira de qualidade — ver `.github/workflows/ci.yml` (jobs `lint`, `test`, `build`, `e2e`, todos obrigatórios via branch protection). Ferramentas adotadas para esta stack (Next.js + NestJS):

**Observabilidade** — Sentry (`@sentry/nextjs` no frontend, `@sentry/node` no backend). Desativado por padrão até um DSN real ser configurado em `SENTRY_DSN`/`NEXT_PUBLIC_SENTRY_DSN` (ver `.env.example`). Datadog/New Relic/OpenTelemetry: não adotados por ora — reavaliar se surgir necessidade de tracing distribuído mais robusto.

**Qualidade e lint de código** — Biome (lint + format, `biome.json` na raiz) cobrindo o monorepo, com override que desliga `useImportType` em `backend/**` (essa regra quebra a injeção de dependência do NestJS ao converter imports de providers para `import type`). Commitlint (Conventional Commits) via hook `commit-msg` do Husky. Knip para código/dependências não usados (`.claude/**` ignorado por ser skill vendorizada, não código do produto). `arch-contract`/Stryker: não adotados no setup inicial — Stryker (mutation testing) vale a pena reavaliar quando houver lógica de negócio real no backend para além de CRUD simples.

**Testes** — unitários: Vitest + Testing Library no frontend, Jest no backend (padrão do Nest). Integração: Jest e2e do Nest (`test/`) para o backend. End-to-end de UI: Playwright (`frontend/e2e/`). Cobertura reportada ao Codecov (job `test` do CI). Endtest: não adotado — Playwright já cobre a necessidade de e2e.

**Segurança e operação** — rate limit global via `ThrottlerModule` no backend (30 req/min por padrão, ajustar por rota conforme necessário, especialmente no endpoint de contato da Issue #7). Revisão de segurança obrigatória em qualquer PR que toque autenticação, dados pessoais ou endpoints públicos. Performance budget a definir na Issue #8 (Lighthouse CI). Backend e frontend já fisicamente separados (dois projetos, dois deploys). Termos de uso/política de privacidade: pendente — necessário antes do lançamento público, dado que o formulário de contato (Issue #7) coleta dados pessoais.

**Arquitetura** — princípios a aplicar em toda decisão técnica:
- Evitar overengineering — resolver o problema atual, não hipóteses futuras.
- Evitar bottlenecks óbvios de performance/escala.
- Componentizar desde o início (UI e lógica), em vez de acumular duplicação para refatorar depois.
- Aplicar DRY com critério — três linhas parecidas não justificam uma abstração prematura.
- **Antes de criar um componente, função ou serviço novo, verificar se algo equivalente já existe no projeto e reaproveitar** em vez de reconstruir.
