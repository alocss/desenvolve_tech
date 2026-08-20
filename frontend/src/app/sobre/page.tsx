import { Handshake, LineChart, Search, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { RevealGroup, RevealItem } from '@/components/reveal';
import { ServiceCard } from '@/components/service-card';

export const metadata: Metadata = {
  title: 'Sobre — Desenvolve Tech',
  description:
    'Quem é a Desenvolve Tech, nossa missão e como trabalhamos com empresas e prestadores de serviços.',
};

const principles = [
  {
    icon: Search,
    title: 'Começamos pelo problema, não pela tecnologia',
    description:
      'Entendemos o processo real do seu negócio antes de propor qualquer sistema, app ou dashboard.',
  },
  {
    icon: Sparkles,
    title: 'Simplicidade tem prioridade',
    description:
      'Evitamos soluções mais complexas do que o problema exige. Sistema bom é o que resolve, não o que impressiona.',
  },
  {
    icon: LineChart,
    title: 'Dados guiam a decisão',
    description:
      'Sempre que possível, medimos o que construímos — para saber se está funcionando de verdade.',
  },
  {
    icon: Handshake,
    title: 'Parceria contínua',
    description:
      'Entregamos o projeto, mas continuamos por perto depois do lançamento — ajuste, suporte, próxima etapa.',
  },
];

export default function Sobre() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="px-6 pt-20 pb-8 text-center sm:pt-28">
        <div className="hero-enter mx-auto flex max-w-2xl flex-col items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Quem somos
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            A Desenvolve Tech nasceu para resolver um problema simples: empresas e prestadores de
            serviço muitas vezes não têm acesso à tecnologia que poderia mudar o jogo do negócio
            deles — não por falta de necessidade, mas por falta de um parceiro técnico que fale a
            língua deles.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="hero-enter mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card/40 p-8 text-center sm:p-10">
          <p className="text-xs font-medium tracking-wide text-primary uppercase">Nossa missão</p>
          <p className="mt-4 text-xl font-medium text-balance sm:text-2xl">
            Desenvolver soluções tecnológicas sob medida que resolvem problemas reais — sem
            complexidade desnecessária, sem prometer o que não vamos entregar.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Como trabalhamos</h2>
          </div>
          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <RevealItem key={principle.title}>
                <ServiceCard {...principle} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}
