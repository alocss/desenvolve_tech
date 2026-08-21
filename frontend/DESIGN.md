---
name: Desenvolve Tech
description: Site institucional dark-first de uma consultoria de dev + análise de dados sob medida.
colors:
  background: "oklch(0.15 0.025 250)"
  foreground: "oklch(0.95 0.01 220)"
  card: "oklch(0.19 0.025 250)"
  primary: "oklch(0.72 0.13 195)"
  primary-foreground: "oklch(0.15 0.03 200)"
  secondary: "oklch(0.24 0.025 250)"
  muted: "oklch(0.22 0.025 250)"
  muted-foreground: "oklch(0.65 0.03 235)"
  accent: "oklch(0.27 0.04 210)"
  border: "oklch(1 0 0 / 10%)"
  destructive: "oklch(0.704 0.191 22.216)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    padding: "8px 10px"
  button-primary-hover:
    backgroundColor: "color-mix(in oklch, {colors.primary}, transparent 20%)"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "8px 10px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "16px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "4px 10px"
---

# Design System: Desenvolve Tech

## Overview

**Creative North Star: "The Signal Console"** *(inferido a partir da implementação existente — não confirmado em entrevista com o cliente; ver nota abaixo)*

O site já implementado é dark-first por construção (`<html class="dark">` fixo, sem toggle) — o visitante sempre vê um fundo quase-preto azulado com um único acento teal/ciano funcionando como "sinal vivo" sobre uma superfície calma. Isso conversa diretamente com o posicionamento registrado em `PRODUCT.md`: dev de software e análise de dados no mesmo time. A superfície escura e o acento único remetem a um console/instrumento de leitura — precisão, não decoração.

O sistema é plano por padrão: profundidade vem de contorno de 1px (`ring-foreground/10`), nunca de sombra. Tipografia é uma única família (Geist) trabalhada por peso e tamanho, não por múltiplas fontes. Movimento é suave e físico (spring, sem bounce) — nada pisca ou salta.

**Nota de proveniência**: o North Star, os nomes descritivos de cor e as frases de personalidade abaixo foram inferidos automaticamente a partir do código incumbente (tokens, componentes, animações), não confirmados por um humano em entrevista — a sessão rodou em modo de autonomia total sem pausar para essa rodada qualitativa. Trate a nomenclatura como descritiva, não como decisão de marca vinculante; os valores técnicos (hex/oklch, px, durações) são os fatos reais extraídos do código.

**Key Characteristics:**
- Dark-only por padrão (sem light mode exposto ao visitante hoje)
- Um único acento de cor (teal/ciano), usado com moderação
- Profundidade via contorno de 1px, nunca sombra
- Tipografia única (Geist) variando por peso/tamanho
- Movimento spring crítico (sem bounce), sempre com `prefers-reduced-motion` respeitado

## Colors

Paleta quase-monocromática (fundo/texto em tons de azul-acinzentado neutro) com um único acento de cor com propósito.

### Primary
- **Signal Teal** (`oklch(0.72 0.13 195)`): CTAs primários, links, ícones de destaque, glow do hero. É a única cor viva do sistema — usada com moderação deliberada.

### Neutral
- **Console Black** (`oklch(0.15 0.025 250)`, fundo): base de toda a página.
- **Elevated Panel** (`oklch(0.19 0.025 250)`, card): superfície de cards, ligeiramente mais clara que o fundo.
- **Signal White** (`oklch(0.95 0.01 220)`, foreground): texto principal.
- **Quiet Gray** (`oklch(0.65 0.03 235)`, muted-foreground): texto secundário/descrições.
- **Hairline** (`oklch(1 0 0 / 10%)`, border): toda borda e divisor do sistema.

### Named Rules
**The Hairline Rule.** Profundidade nunca vem de `box-shadow`; vem de um contorno de 1px em `foreground/10%` (ring ou border). Nenhum componente do sistema usa sombra hoje.

**The One Signal Rule.** A cor de acento (teal) aparece em no máximo um elemento por seção — CTA primário, ícone do card em hover, ou glow do hero. Nunca dois acentos competindo na mesma tela.

## Typography

**Display/Body/Label Font:** Geist (`next/font/google`, variável `--font-geist-sans`), com `Geist_Mono` carregada mas hoje não usada visualmente em nenhum lugar do site.

**Character:** Uma família só, neutra e geométrica; hierarquia feita por peso e tamanho, não por troca de fonte. Nenhuma serifada ou display separada.

### Hierarchy
- **Display** (600, `clamp(2.25rem, 5vw, 3.75rem)`, 1.1): H1 do hero de cada página.
- **Title** (600, 1.875rem/30px, 1.2): títulos de seção (`<h2>`).
- **Body** (400, 1rem, 1.6): parágrafos e descrições.
- **Label** (500, 0.875rem, uppercase no hero): rótulos curtos como o eyebrow "Desenvolve Tech" acima do H1.

### Named Rules
**The Weight-Not-Family Rule.** Toda hierarquia tipográfica é resolvida trocando peso/tamanho da mesma Geist — nunca introduzindo uma segunda família para dar ênfase.

## Layout

Container principal centralizado em `max-w-5xl` com padding horizontal `px-6`. Seções de página usam ritmo vertical generoso (`py-24`/`py-32` em telas ≥ sm). O hero ocupa `min-h-[90vh]` e centraliza conteúdo vertical e horizontalmente. Grids de conteúdo (ex.: cards de serviço) usam `gap-6` em 2 colunas a partir de `sm`, 1 coluna abaixo disso — mobile-first.

## Elevation & Depth

Sistema **flat por padrão**: nenhum componente usa `box-shadow`. Profundidade e separação vêm de contorno de 1px (`ring-1 ring-foreground/10` em cards, `border-b border-border/60` no header) e de diferença sutil de luminosidade entre `background` e `card`.

### Named Rules
**The Flat-By-Default Rule.** Sombra não faz parte do vocabulário visual atual. Se uma futura elevação for necessária, prefira aumentar o contraste do hairline ou da luminosidade da superfície antes de introduzir `box-shadow`.

## Shapes

Cantos consistentemente arredondados, escala derivada de uma única variável `--radius: 0.625rem` (10px): botões e inputs em `rounded-lg` (10px), cards em `rounded-xl` (14px). Nenhum elemento usa cantos retos ou border completo (a maioria das bordas é hairline de 1px, não um contorno estrutural pesado).

## Components

### Buttons
- **Shape:** `rounded-lg` (10px).
- **Primary:** fundo `primary` (teal), texto `primary-foreground`, hover reduz opacidade para 80% (`hover:bg-primary/80`) em vez de escurecer a cor.
- **Outline:** fundo transparente, borda `border-border`, hover troca para `bg-muted`.
- **Hover / Focus:** foco visível com `ring-3 ring-ring/50` + borda `ring`; estado ativo desloca 1px para baixo (`active:translate-y-px`) — feedback tátil sutil, sem escala.
- **Secondary / Ghost / Destructive / Link:** variantes existem e seguem o mesmo padrão de opacidade em hover, sem tonalidades novas.

### Cards / Containers
- **Corner Style:** `rounded-xl` (14px), com máscara de overflow (`overflow-hidden`) para imagens internas herdarem o raio.
- **Background:** `card` (levemente mais claro que o fundo da página).
- **Shadow Strategy:** nenhuma — ver Elevation & Depth. Separação vem de `ring-1 ring-foreground/10`.
- **Border:** hairline via `ring`, não `border` estrutural.
- **Internal Padding:** `--card-spacing` = 16px (default) ou 12px (`size="sm"`).
- Variante observada em `ServiceCard`: borda semi-transparente (`border-border/60`), fundo `bg-card/60`, que ganham opacidade total e `border-primary/40` no hover — cartão "acende" ao ser tocado.

### Inputs / Fields
- **Style:** `rounded-lg`, fundo transparente, borda `border-input`.
- **Focus:** `ring-3 ring-ring/50` + borda muda para `ring` — mesmo tratamento de foco dos botões, consistente em todo o sistema.
- **Disabled:** opacidade 50% + fundo `bg-input/50`.

### Navigation
- **Style:** header fixo (`sticky top-0`), fundo semitransparente com `backdrop-blur-md`, separado do conteúdo por `border-b border-border/60`.
- **Links:** texto `muted-foreground`, transição rápida (`duration-fast`) para `foreground` no hover — sem sublinhado nem troca de peso.
- **CTA:** o único link do header que é um botão sólido (`Contato`), reforçando a regra de um único acento por seção.

### Reveal (componente de assinatura)
Padrão de entrada reutilizado em toda página abaixo da dobra: `opacity 0 → 1`, `translateY(12px) → 0`, `blur(4px) → 0`, com spring crítico (`bounce: 0`, duração ~0.5s), disparado por `whileInView` (uma vez, `margin: -80px`). Grupos de itens (`RevealGroup`/`RevealItem`) escalonam com `staggerChildren: 0.08s`. **Regra dura, já documentada no CLAUDE.md do projeto**: nunca usar esse padrão no conteúdo acima da dobra (hero) — o hero usa a classe CSS pura `.hero-enter` para não atrasar o LCP.

## Do's and Don'ts

### Do:
- **Do** usar o acento teal (`primary`) em no máximo um elemento de destaque por seção (The One Signal Rule).
- **Do** resolver toda hierarquia tipográfica com peso/tamanho da Geist, nunca uma segunda família.
- **Do** usar `.hero-enter` (CSS puro) para qualquer elemento candidato a LCP; reservar `Reveal`/`RevealGroup` (Framer Motion) para conteúdo abaixo da dobra.
- **Do** transmitir profundidade com hairline de 1px (`ring-foreground/10` ou `border-border/60`), nunca com `box-shadow`.
- **Do** respeitar `prefers-reduced-motion` em qualquer animação nova, como já ocorre em `.hero-enter`.

### Don't:
- **Don't** introduzir uma segunda cor de acento competindo com o teal na mesma tela.
- **Don't** adicionar `box-shadow` a cards ou painéis — quebra a linguagem flat do sistema.
- **Don't** animar conteúdo acima da dobra com Framer Motion (`Reveal`/`RevealGroup`) — atrasa o LCP (ver Issue #8).
- **Don't** usar bounce em transições de entrada — todas as springs do sistema usam `bounce: 0`. (Auditoria de 2026-08-21: o token `--ease-spring`, um easing com overshoot, existia em `globals.css` sem nenhum uso real e contradizia esta regra — foi removido. Uma transição com bounce só deve virar token depois de uma decisão explícita registrada aqui.)
