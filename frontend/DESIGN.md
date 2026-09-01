# Design

## Theme

Dark-first. `<html class="dark">` sempre — a marca é dark-first (ver assets de marca em `public/brand/`), light mode existe nos tokens mas não é o modo servido hoje.

## Color Palette

Definidos em OKLCH (`src/app/globals.css`), via shadcn (estilo `nova`) customizado com hue navy/teal.

| Token | Dark (ativo) | Light | Uso |
|---|---|---|---|
| `--background` | `oklch(0.15 0.025 250)` | `oklch(1 0 0)` | Fundo da página (navy quase-preto) |
| `--foreground` | `oklch(0.95 0.01 220)` | `oklch(0.17 0.02 250)` | Texto principal |
| `--card` | `oklch(0.19 0.025 250)` | `oklch(1 0 0)` | Fundo de cards/painéis |
| `--primary` | `oklch(0.72 0.13 195)` | `oklch(0.6 0.1 195)` | Teal — CTAs, links, ícones de destaque |
| `--muted-foreground` | `oklch(0.65 0.03 235)` | `oklch(0.5 0.02 250)` | Texto secundário |
| `--border` | `oklch(1 0 0 / 10%)` | `oklch(0.9 0.01 240)` | Bordas sutis |
| `--destructive` | `oklch(0.704 0.191 22.216)` | `oklch(0.577 0.245 27.325)` | Erros |

`--chart-1..5` seguem a mesma família teal/azul (hue ~190-240) para eventuais gráficos futuros.

Nenhuma cor "crua" (`bg-blue-500` etc.) é usada nas páginas — sempre tokens semânticos (`bg-primary`, `text-muted-foreground`).

## Typography

- **Fonte única**: Geist (via `next/font/google`, self-hosted) para sans e heading; Geist Mono disponível como `font-mono`.
- Hierarquia atual: hero `text-4xl sm:text-6xl font-semibold`, títulos de seção `text-3xl sm:text-4xl`, corpo `text-base`/`text-lg` com `text-muted-foreground` para texto de apoio.
- `text-balance` no hero e títulos curtos; parágrafos longos ainda não usam `text-pretty` sistematicamente.

## Spacing & Radius

- Radius base `--radius: 0.625rem`, com escala derivada (`--radius-sm` a `--radius-4xl`) via `calc()`.
- Layout em `max-w-5xl`/`max-w-2xl`/`max-w-lg` por contexto (grid de cards vs. texto corrido vs. formulário).
- Seções usam padding vertical generoso (`py-16` a `py-32`) — ritmo ainda relativamente uniforme entre páginas, oportunidade de variar mais.

## Components

Base: shadcn/ui (estilo `nova`, primitivas Base UI, ícones `lucide-react`). Componentes instalados em `src/components/ui/`: `button`, `card`, `input`, `textarea`, `label`, `badge`, `skeleton`, `spinner`, `alert`, `field` (+ `FieldGroup`/`FieldError`), `empty`, `separator`.

Componentes de produto (`src/components/`):
- `ServiceCard` — ícone + título + descrição (Home, Sobre, Serviços)
- `CaseCard` — imagem + resumo + tags (Portfólio)
- `SiteHeader` / `SiteFooter` — navegação fixa com blur, CTA de destaque
- `ContactForm` — formulário completo com validação, estados de loading/sucesso/erro

**Padrão observado a revisar**: `ServiceCard` é reaproveitado em 3 contextos (serviços na Home, princípios em Sobre, e a própria página de Serviços usa uma variação inline) — funcional, mas visualmente é o mesmo cartão ícone+título+texto repetido em quase toda página. Candidato a mais variação de layout por contexto.

## Motion

Ver skill `design-motion-principles` — já em uso, com peso Jakub Krehel (polimento) primário / Jhey Tompkins secundário para o hero.

- **Tokens**: `--duration-fast` (150ms), `--duration-base` (250ms), `--duration-slow` (400ms); `--ease-out` (`cubic-bezier(0.16,1,0.3,1)`), `--ease-in-out` (curva iOS, `cubic-bezier(0.32,0.72,0,1)`), `--ease-spring` (leve overshoot, `cubic-bezier(0.34,1.56,0.64,1)`).
- **Hero (acima da dobra)**: CSS puro (`.hero-enter` em `globals.css`), não Framer Motion — decisão deliberada por performance (LCP), ver Issue #8.
- **Abaixo da dobra**: Framer Motion (`motion/react`) via `Reveal`/`RevealGroup`/`RevealItem` em `src/components/reveal.tsx`, `whileInView` com spring `bounce: 0`.
- `prefers-reduced-motion` tratado globalmente via `MotionConfig` (`src/components/motion-provider.tsx`) para o Framer Motion, e via media query dedicada para o `.hero-enter` em CSS.
- **Oportunidade não explorada ainda**: motion nos estados de hover/interação além do que os componentes shadcn já trazem por padrão (ex.: cards do portfólio, navegação) — hoje é quase só entrada de conteúdo, pouco microinteração além disso.

## Iconography

`lucide-react`, tamanho consistente via classes do próprio componente shadcn (nunca `size-4` solto em ícone dentro de `Button`).

## Known gaps (para as próximas iterações)

- Paleta veio da leitura visual do logo (JPEG comprimido, sem valores de cor oficiais) — vale confirmar com o cliente se houver guia de marca formal.
- Nenhuma imagem real usada ainda além do logo/mockup em `public/brand/` — hero e seções são só texto+gradiente; oportunidade de trazer mais textura visual (grid pattern, glow, imagem de produto/equipe).
- Cards de serviço/princípio são visualmente idênticos entre si — falta um elemento de assinatura visual mais forte (algo que "só a Desenvolve Tech faria").
