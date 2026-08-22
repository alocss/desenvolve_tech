import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Portfolio from './page';

describe('Portfolio', () => {
  it('renderiza o título da página', () => {
    render(<Portfolio />);
    expect(screen.getByRole('heading', { level: 1, name: 'Portfólio' })).toBeDefined();
  });

  it('renderiza os cases cadastrados', () => {
    render(<Portfolio />);
    expect(screen.getByText('Allction')).toBeDefined();
    expect(screen.getByText('Nutricionista Crislane Oliveira')).toBeDefined();
    expect(screen.getByText('House Burger')).toBeDefined();
  });
});
