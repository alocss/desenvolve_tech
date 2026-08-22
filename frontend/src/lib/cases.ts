type Case = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  image?: string;
};

/**
 * Cases reais entram aqui conforme forem entregues — nenhum dado
 * placeholder/fabricado. Enquanto vazio, a página de portfólio mostra
 * um estado vazio honesto (ver frontend/src/app/portfolio/page.tsx).
 */
export const cases: Case[] = [
  {
    slug: 'allction',
    title: 'Allction',
    summary: 'Transformando toda ação em resultado.',
    tags: ['Site institucional'],
    image: '/portfolio/allction.png',
  },
  {
    slug: 'nutri-crislane-oliveira',
    title: 'Nutricionista Crislane Oliveira',
    summary: 'Sua saúde começa com a escolha certa no prato.',
    tags: ['Site institucional'],
    image: '/portfolio/crislane-oliveira.png',
  },
  {
    slug: 'house-burger',
    title: 'House Burger',
    summary: 'A noite pede House.',
    tags: ['Loja online'],
    image: '/portfolio/house-burger.png',
  },
];
