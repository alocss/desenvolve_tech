import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('mostra erros de validação quando o formulário está vazio', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    expect(await screen.findByText('Conte seu nome.')).toBeDefined();
    expect(screen.getByText('Informe um e-mail.')).toBeDefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('envia o formulário e mostra a confirmação de sucesso', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ received: true }), { status: 200 }),
    );
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('Nome'), 'Maria Silva');
    await user.type(screen.getByLabelText('E-mail'), 'maria@example.com');
    await user.type(screen.getByLabelText('Mensagem'), 'Preciso de um orçamento para um site.');
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    expect(await screen.findByText('Mensagem enviada!')).toBeDefined();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/contact'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('mostra alerta de erro quando o envio falha', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(new Response(null, { status: 500 }));
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('Nome'), 'Maria Silva');
    await user.type(screen.getByLabelText('E-mail'), 'maria@example.com');
    await user.type(screen.getByLabelText('Mensagem'), 'Preciso de um orçamento para um site.');
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    expect(await screen.findByText('Não conseguimos enviar sua mensagem')).toBeDefined();
  });
});
