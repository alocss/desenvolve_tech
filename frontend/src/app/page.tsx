import { FolderKanban, Gauge, Layers, TrendingUp, Workflow } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseCard } from '@/components/case-card';
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';
import { ServiceCard } from '@/components/service-card';
import { Button } from '@/components/ui/button';
import { cases } from '@/lib/cases';
import { services } from '@/lib/services';

export const metadata: Metadata = {
  description:
    'Desenvolvemos sites, aplicativos e soluções tecnológicas guiadas por dados para empresas e prestadores de serviço.',
};

const differentiators = [
  {
    icon: Layers,
    title: 'Dev e dados no mesmo time',
    description:
      'Quem constrói o seu site, app ou sistema é a mesma equipe que analisa os dados que ele gera — sem repasse entre fornecedores diferentes.',
  },
  {
    icon: Gauge,
    title: 'Performance e SEO desde o início',
    description:
      'Boas práticas de performance e SEO entram no projeto desde a primeira linha de código, não como retrofit de última hora.',
  },
  {
    icon: TrendingUp,
    title: 'Arquitetura para crescer',
    description:
      'Cada solução é pensada para acompanhar o crescimento do seu negócio, não para ser descartada no primeiro pico de uso.',
  },
  {
    icon: Workflow,
    title: 'Desenhado em torno do seu processo',
    description:
      'Entendemos como o seu negócio já funciona antes de propor qualquer sistema — a solução se adapta a você, não o contrário.',
  },
];

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary),transparent_82%),transparent)]"
        />
        <div className="hero-enter flex flex-col items-center">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Desenvolve Tech
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Tecnologia sob medida para o seu negócio crescer
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground text-balance">
            Desenvolvemos sites, aplicativos e soluções tecnológicas guiadas por dados — para
            empresas e prestadores de serviço que querem resultado, não só presença digital.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/contato" />} nativeButton={false}>
              Solicitar orçamento
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/portfolio" />}
              nativeButton={false}
            >
              Ver nossos projetos
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Soluções pensadas para transformar ideias em resultados
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            A Desenvolve Tech nasce da mesma equipe que projeta o software e que analisa os dados
            que ele gera — sem intermediários entre construir e entender o que foi construído. Do
            primeiro rascunho ao lançamento, cada site, aplicativo ou sistema é desenhado em torno
            do processo real do seu negócio, não de um modelo genérico. O compromisso é simples:
            entregar tecnologia que resolve problemas de verdade, com o mesmo padrão de atenção do
            primeiro contato ao suporte depois do lançamento.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">O que fazemos</h2>
            <p className="mt-4 text-muted-foreground">
              Quatro frentes, um único objetivo: tecnologia que resolve problemas reais do seu
              negócio.
            </p>
          </div>
          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <RevealItem key={service.slug}>
                <ServiceCard {...service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Conheça alguns dos nossos trabalhos
            </h2>
            <p className="mt-4 text-muted-foreground text-balance">
              Confira alguns projetos e soluções desenvolvidos pela nossa equipe e conheça de
              perto a qualidade do nosso trabalho.
            </p>
          </div>

          {cases.length > 0 ? (
            <Reveal>
              <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cases.slice(0, 3).map((project) => (
                  <CaseCard key={project.slug} {...project} />
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border/60 bg-card/40 p-10 text-center sm:p-14">
                <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FolderKanban className="size-7" />
                </div>
                <p className="mt-6 text-xl font-medium text-balance sm:text-2xl">
                  Nossos primeiros projetos estão em desenvolvimento.
                </p>
                <p className="mt-3 text-muted-foreground text-balance">
                  Assim que forem entregues, eles aparecem aqui e na página de portfólio completo.
                  Enquanto isso, conheça os serviços que podem se tornar o seu próximo projeto.
                </p>
              </div>
            </Reveal>
          )}

          <div className="mt-10 text-center">
            <Button size="lg" variant="outline" render={<Link href="/portfolio" />} nativeButton={false}>
              Ver portfólio completo
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              O que nos diferencia
            </h2>
          </div>
          <Reveal>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {differentiators.map((item) => (
                <ServiceCard key={item.title} {...item} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card/40 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Tem um projeto em mente? Vamos conversar.
          </h2>
          <p className="mt-4 text-muted-foreground text-balance">
            Entre em contato e conte um pouco sobre o que você precisa. Estamos prontos para
            entender sua ideia e apresentar a melhor solução para o seu projeto.
          </p>
          <Button size="lg" className="mt-8" render={<Link href="/contato" />} nativeButton={false}>
            Entrar em contato
          </Button>
        </div>
      </section>
    </main>
  );
}
