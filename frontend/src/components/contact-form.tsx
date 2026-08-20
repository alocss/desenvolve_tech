'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Reveal } from '@/components/reveal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Conte seu nome.').max(120),
  email: z.string().trim().min(1, 'Informe um e-mail.').email('E-mail inválido.'),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, 'Conte um pouco mais (mínimo 10 caracteres).').max(2000),
  website: z.string().max(0).optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactValues) {
    setStatus('idle');
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('request failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <Reveal>
        <Alert className="border-primary/30 bg-primary/5">
          <CheckCircle2 className="text-primary" />
          <AlertTitle>Mensagem enviada!</AlertTitle>
          <AlertDescription>Recebemos seu contato e vamos responder em breve.</AlertDescription>
        </Alert>
      </Reveal>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register('name')} />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.company}>
          <FieldLabel htmlFor="company">Empresa (opcional)</FieldLabel>
          <Input id="company" autoComplete="organization" {...register('company')} />
          <FieldError errors={[errors.company]} />
        </Field>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message">Mensagem</FieldLabel>
          <Textarea
            id="message"
            rows={5}
            aria-invalid={!!errors.message}
            {...register('message')}
          />
          <FieldError errors={[errors.message]} />
        </Field>

        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <label htmlFor="website">Não preencha este campo</label>
          <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
        </div>

        {status === 'error' && (
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertTitle>Não conseguimos enviar sua mensagem</AlertTitle>
            <AlertDescription>
              Tente novamente em instantes ou nos escreva em contato@desenvolvetech.com.br.
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-fit">
          {isSubmitting && <Spinner data-icon="inline-start" />}
          {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
        </Button>
      </FieldGroup>
    </form>
  );
}
