# Contexto do Projeto — desenvolve_tech

> Este arquivo é lido por qualquer agente (Claude ou outro modelo) antes de implementar mudanças neste repositório. As regras abaixo são obrigatórias e têm precedência sobre atalhos convenientes.

## Status atual

Projeto em fase de bootstrap. Stack, escopo e funcionalidades ainda **não foram definidos** — não assuma tecnologia, linguagem ou arquitetura sem confirmar com o responsável pelo projeto. Assim que a stack for definida, esta seção deve ser atualizada e a seção "Esteira de qualidade" abaixo deve ser preenchida com as ferramentas concretas escolhidas.

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

Nenhum código entra em `main` sem passar pela esteira de qualidade. As ferramentas abaixo devem ser adotadas **quando fizerem sentido para a stack escolhida** — ainda a ser definida. Ao decidir a stack, revisitar esta lista e registrar no PR de setup quais itens foram adotados e por quê.

**Observabilidade** — Sentry, Datadog, New Relic, OpenTelemetry.

**Qualidade e lint de código** — arch-contract, Biome, Commitlint, Knip, Stryker.

**Testes** — unitários, integração, end-to-end; cobertura via Codecov; e2e via Playwright/Endtest.

**Segurança e operação** — rate limit, revisão de segurança em toda mudança sensível, performance budget, separação clara entre backend e frontend, termos de uso e política de privacidade revisados e aprovados pelo jurídico antes de qualquer lançamento público.

**Arquitetura** — princípios a aplicar em toda decisão técnica:
- Evitar overengineering — resolver o problema atual, não hipóteses futuras.
- Evitar bottlenecks óbvios de performance/escala.
- Componentizar desde o início (UI e lógica), em vez de acumular duplicação para refatorar depois.
- Aplicar DRY com critério — três linhas parecidas não justificam uma abstração prematura.
- **Antes de criar um componente, função ou serviço novo, verificar se algo equivalente já existe no projeto e reaproveitar** em vez de reconstruir.
