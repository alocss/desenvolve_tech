import { CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Serviços — Desenvolve Tech',
  description:
    'Desenvolvimento de sites, aplicativos, soluções tecnológicas e análise de dados para empresas e prestadores de serviços.',
};

export default function Servicos() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="px-6 pt-20 pb-8 text-center sm:pt-28">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Serviços</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-balance">
          Quatro frentes de atuação, cada uma resolvendo um problema real do seu negócio.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug}>
                <article className="border-t border-border/60 pt-10 first:border-t-0 first:pt-0">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight">{service.title}</h2>
                  <p className="mt-3 text-muted-foreground">{service.description}</p>

                  <ul className="mt-6 flex flex-col gap-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Para quem é
                      </p>
                      <p className="mt-2 text-sm">{service.audience}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Diferencial
                      </p>
                      <p className="mt-2 text-sm">{service.differentiator}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Não sabe por onde começar?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Fale com a gente e vamos entender juntos qual serviço faz sentido para o seu momento.
        </p>
        <Button size="lg" className="mt-6" render={<Link href="/contato" />} nativeButton={false}>
          Solicitar orçamento
        </Button>
      </section>
    </main>
  );
}
