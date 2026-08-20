import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Sobre from './page';

describe('Sobre', () => {
  it('renderiza o título da página', () => {
    render(<Sobre />);
    expect(screen.getByRole('heading', { level: 1, name: 'Quem somos' })).toBeDefined();
  });

  it('renderiza a missão', () => {
    render(<Sobre />);
    expect(screen.getByText('Nossa missão')).toBeDefined();
  });

  it('renderiza os 4 princípios de como trabalhamos', () => {
    render(<Sobre />);
    expect(screen.getByText('Começamos pelo problema, não pela tecnologia')).toBeDefined();
    expect(screen.getByText('Simplicidade tem prioridade')).toBeDefined();
    expect(screen.getByText('Dados guiam a decisão')).toBeDefined();
    expect(screen.getByText('Parceria contínua')).toBeDefined();
  });
});
