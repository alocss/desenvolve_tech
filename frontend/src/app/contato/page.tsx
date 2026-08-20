import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Contato — Desenvolve Tech',
  description: 'Solicite um orçamento ou fale com a Desenvolve Tech sobre o seu projeto.',
};

export default function Contato() {
  return (
    <main className="flex flex-1 flex-col px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-lg">
        <Reveal className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Vamos conversar
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Conte um pouco sobre o seu projeto e a gente responde em breve.
          </p>
        </Reveal>
        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
