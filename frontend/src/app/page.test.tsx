import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renderiza o nome da empresa', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'Desenvolve Tech' })).toBeDefined();
  });
});
