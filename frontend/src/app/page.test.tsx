import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renderiza a headline principal', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Tecnologia sob medida para o seu negócio crescer',
      }),
    ).toBeDefined();
  });

  it('renderiza os 4 serviços', () => {
    render(<Home />);
    expect(screen.getByText('Desenvolvimento de sites')).toBeDefined();
    expect(screen.getByText('Desenvolvimento de aplicativos')).toBeDefined();
    expect(screen.getByText('Soluções tecnológicas')).toBeDefined();
    expect(screen.getByText('Análise de dados')).toBeDefined();
  });

  it('tem CTA de orçamento e de serviços', () => {
    render(<Home />);
    expect(screen.getByText('Solicitar orçamento').closest('a')?.getAttribute('href')).toBe(
      '/contato',
    );
    expect(screen.getByText('Conhecer os serviços').closest('a')?.getAttribute('href')).toBe(
      '/servicos',
    );
  });
});
