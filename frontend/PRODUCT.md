# Product

## Register

brand

## Users

Donos e gestores de empresas de pequeno/médio porte e prestadores de serviço avaliando se a Desenvolve Tech tem competência técnica para desenvolver sites, aplicativos, soluções tecnológicas sob medida e análise de dados para o negócio deles. Chegam via busca, indicação ou redes sociais, comparando fornecedores — o site precisa convencer em poucos segundos que a empresa entende de tecnologia de verdade, não é "mais uma agência genérica".

## Product Purpose

Site institucional que funciona como a principal vitrine comercial da Desenvolve Tech: apresentar as 4 linhas de serviço (sites, apps, soluções tecnológicas, análise de dados), mostrar portfólio real e converter visitantes em leads via formulário de contato. Sucesso = visitante qualificado envia uma mensagem pelo formulário pedindo orçamento.

## Brand Personality

Ousada e técnica — confiante, cheia de movimento e efeitos que comprovam domínio técnico, sem soar teatral. Referências: Linear, Vercel, Stripe — visual escuro, preciso, moderno, onde a própria interface já é prova de competência (o site "pratica o que prega").

## Anti-references

Evitar parecer "mais uma agência genérica" ou template pronto (estilo Canva) — layout raso, cards repetidos sem ponto de vista visual próprio, motion decorativo sem propósito.

## Design Principles

- A interface é a prova: um site de empresa de tecnologia demonstra competência técnica pela própria qualidade de execução (motion, performance, polimento), não só pelo texto.
- Ousadia com propósito: animação e efeito chamam atenção, mas cada um precisa justificar a própria existência — nunca decorativo por padrão (ver skill `design-motion-principles`, já em uso no projeto).
- Hierarquia clara sobre densidade: escuro e preciso não significa carregado — espaço negativo e contraste fazem o conteúdo respirar.
- Reaproveitar antes de reconstruir: componentizar cedo, expandir o design system existente (shadcn + tokens em `globals.css`) em vez de criar variações ad-hoc por página.

## Accessibility & Inclusion

WCAG AA como piso (contraste ≥4.5:1 em texto de corpo, ≥3:1 em texto grande), navegação por teclado completa (skip link já implementado), `prefers-reduced-motion` respeitado em toda animação. Métrica de acessibilidade do Lighthouse CI travada em ≥0,95 (hoje em 1.0 em todas as páginas — não pode regredir).
