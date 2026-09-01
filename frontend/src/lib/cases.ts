type Case = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  image?: string;
};

export const cases: Case[] = [
  {
    slug: 'solucoes-eolicas',
    title: 'Soluções Eólicas do Brasil',
    summary:
      'Site institucional para empresa de engenharia eólica — instalação, manutenção, comissionamento e fornecimento técnico para a indústria eólica.',
    tags: ['Desenvolvimento de sites'],
    image: '/portfolio/solucoes-eolicas.jpg',
  },
];
