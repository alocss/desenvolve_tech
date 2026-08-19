import { BarChart3, Code2, type LucideIcon, Settings2, Smartphone } from 'lucide-react';

type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  includes: string[];
  audience: string;
  differentiator: string;
};

export const services: Service[] = [
  {
    slug: 'sites',
    icon: Code2,
    title: 'Desenvolvimento de sites',
    description: 'Sites rápidos, responsivos e construídos para converter visitantes em clientes.',
    includes: [
      'Sites institucionais e landing pages',
      'E-commerce sob medida',
      'Performance e SEO desde a primeira linha de código',
    ],
    audience:
      'Empresas que precisam de presença digital profissional ou querem converter mais visitantes em clientes.',
    differentiator:
      'Aplicamos boas práticas de performance e SEO desde o início do projeto — não como retrofit de última hora.',
  },
  {
    slug: 'aplicativos',
    icon: Smartphone,
    title: 'Desenvolvimento de aplicativos',
    description: 'Apps sob medida para Android, iOS ou web — do primeiro protótipo ao lançamento.',
    includes: [
      'Apps nativos e híbridos para Android e iOS',
      'Web apps (PWA) quando fizer mais sentido',
      'Do protótipo ao lançamento nas lojas',
    ],
    audience:
      'Negócios que precisam de um canal próprio com o cliente — agendamento, delivery, autoatendimento.',
    differentiator: 'Arquitetura pensada para escalar com o seu negócio, não um MVP descartável.',
  },
  {
    slug: 'solucoes-tecnologicas',
    icon: Settings2,
    title: 'Soluções tecnológicas',
    description: 'Sistemas e automações desenhados para o seu processo, não o contrário.',
    includes: [
      'Sistemas internos sob medida',
      'Automação de processos repetitivos',
      'Integração entre ferramentas que a empresa já usa',
    ],
    audience:
      'Empresas e prestadores de serviço com processos manuais que consomem tempo da equipe.',
    differentiator:
      'Desenhamos a solução em torno do processo real do cliente — não empurramos um sistema genérico.',
  },
  {
    slug: 'analise-de-dados',
    icon: BarChart3,
    title: 'Análise de dados',
    description: 'Dashboards e relatórios que transformam dados em decisões mais rápidas.',
    includes: [
      'Dashboards e relatórios automatizados',
      'Estruturação de dados espalhados em planilhas e sistemas soltos',
      'Indicadores acompanhados a partir de perguntas reais do negócio',
    ],
    audience: 'Gestores que hoje decidem no feeling por falta de visibilidade dos números.',
    differentiator:
      'Cada dashboard nasce de uma pergunta de negócio real — não de um gráfico bonito.',
  },
];
