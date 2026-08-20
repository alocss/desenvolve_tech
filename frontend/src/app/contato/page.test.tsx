import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Contato from './page';

describe('Contato', () => {
  it('renderiza o título e o formulário', () => {
    render(<Contato />);
    expect(screen.getByRole('heading', { level: 1, name: 'Vamos conversar' })).toBeDefined();
    expect(screen.getByLabelText('Nome')).toBeDefined();
    expect(screen.getByLabelText('E-mail')).toBeDefined();
    expect(screen.getByLabelText('Mensagem')).toBeDefined();
  });
});
