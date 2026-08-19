import { BarChart3, Code2, Settings2, Smartphone } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';
import { ServiceCard } from '@/components/service-card';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Code2,
    title: 'Desenvolvimento de sites',
    description: 'Sites rápidos, responsivos e construídos para converter visitantes em clientes.',
  },
  {
    icon: Smartphone,
    title: 'Desenvolvimento de aplicativos',
    description: 'Apps sob medida para Android, iOS ou web — do primeiro protótipo ao lançamento.',
  },
  {
    icon: Settings2,
    title: 'Soluções tecnológicas',
    description: 'Sistemas e automações desenhados para o seu processo, não o contrário.',
  },
  {
    icon: BarChart3,
    title: 'Análise de dados',
    description: 'Dashboards e relatórios que transformam dados em decisões mais rápidas.',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary),transparent_82%),transparent)]"
        />
        <Reveal className="flex flex-col items-center">
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
            <Button
              size="lg"
              render={<a href="mailto:contato@desenvolvetech.com.br" />}
              nativeButton={false}
            >
              Solicitar orçamento
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<a href="#servicos" />}
              nativeButton={false}
            >
              Conhecer os serviços
            </Button>
          </div>
        </Reveal>
      </section>

      <section id="servicos" className="px-6 py-24 sm:py-32">
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
              <RevealItem key={service.title}>
                <ServiceCard {...service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}
