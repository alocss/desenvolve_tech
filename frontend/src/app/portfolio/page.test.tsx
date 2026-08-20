import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Portfolio from './page';

describe('Portfolio', () => {
  it('renderiza o título da página', () => {
    render(<Portfolio />);
    expect(screen.getByRole('heading', { level: 1, name: 'Portfólio' })).toBeDefined();
  });

  it('mostra o estado vazio honesto quando não há cases', () => {
    render(<Portfolio />);
    expect(screen.getByText('Novos projetos em construção')).toBeDefined();
    expect(screen.getByText('Conhecer os serviços')).toBeDefined();
  });
});
