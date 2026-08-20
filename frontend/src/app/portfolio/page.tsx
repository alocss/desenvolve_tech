import { FolderKanban } from 'lucide-react';
import type { Metadata } from 'next';
import { CaseCard } from '@/components/case-card';
import { RevealGroup, RevealItem } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { cases } from '@/lib/cases';

export const metadata: Metadata = {
  title: 'Portfólio — Desenvolve Tech',
  description:
    'Projetos desenvolvidos pela Desenvolve Tech para empresas e prestadores de serviços.',
};

export default function Portfolio() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="px-6 pt-20 pb-8 text-center sm:pt-28">
        <div className="hero-enter mx-auto flex max-w-2xl flex-col items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Portfólio
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Projetos que desenvolvemos para empresas e prestadores de serviços.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          {cases.length > 0 ? (
            <RevealGroup className="grid gap-6 sm:grid-cols-2">
              {cases.map((project) => (
                <RevealItem key={project.slug}>
                  <CaseCard {...project} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <Empty className="mx-auto max-w-lg border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderKanban />
                </EmptyMedia>
                <EmptyTitle>Novos projetos em construção</EmptyTitle>
                <EmptyDescription>
                  Ainda não publicamos cases por aqui, mas já estamos trabalhando nos primeiros
                  projetos. Enquanto isso, conheça nossos serviços ou fale com a gente.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button render={<a href="/servicos" />} nativeButton={false}>
                  Conhecer os serviços
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </div>
      </section>
    </main>
  );
}
