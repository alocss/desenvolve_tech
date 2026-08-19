import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Servicos from './page';

describe('Servicos', () => {
  it('renderiza o título da página', () => {
    render(<Servicos />);
    expect(screen.getByRole('heading', { level: 1, name: 'Serviços' })).toBeDefined();
  });

  it('renderiza os 4 serviços com detalhes', () => {
    render(<Servicos />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Desenvolvimento de sites' }),
    ).toBeDefined();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Desenvolvimento de aplicativos' }),
    ).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Soluções tecnológicas' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Análise de dados' })).toBeDefined();
  });

  it('tem CTA de orçamento no final', () => {
    render(<Servicos />);
    expect(screen.getByText('Solicitar orçamento').closest('a')?.getAttribute('href')).toBe(
      'mailto:contato@desenvolvetech.com.br',
    );
  });
});
