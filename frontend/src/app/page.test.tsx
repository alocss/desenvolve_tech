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

  it('tem CTA de orçamento e de portfólio no hero', () => {
    render(<Home />);
    expect(screen.getByText('Solicitar orçamento').closest('a')?.getAttribute('href')).toBe(
      '/contato',
    );
    expect(screen.getAllByText('Ver nossos projetos')[0].closest('a')?.getAttribute('href')).toBe(
      '/portfolio',
    );
  });

  it('renderiza a nova seção de apresentação institucional', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Soluções pensadas para transformar ideias em resultados',
      }),
    ).toBeDefined();
  });

  it('renderiza os cases reais no teaser de portfólio, com CTA para a página completa', () => {
    render(<Home />);
    expect(screen.getByText('Allction')).toBeDefined();
    expect(screen.getByText('Ver portfólio completo').closest('a')?.getAttribute('href')).toBe(
      '/portfolio',
    );
  });

  it('renderiza a seção de diferenciais', () => {
    render(<Home />);
    expect(screen.getByText('Dev e dados no mesmo time')).toBeDefined();
  });

  it('renderiza a chamada final de contato', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Tem um projeto em mente? Vamos conversar.' }),
    ).toBeDefined();
    expect(screen.getByText('Entrar em contato').closest('a')?.getAttribute('href')).toBe(
      '/contato',
    );
  });
});
