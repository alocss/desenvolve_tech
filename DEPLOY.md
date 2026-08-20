# Deploy — Desenvolve Tech

Guia para colocar o site no ar em produção. Frontend na Vercel, backend na Railway, domínio `desenvolvetech.com.br`.

Depois de mergear o PR desta issue, siga os passos abaixo pelo painel de cada serviço (nenhum deles precisa de acesso ao terminal).

## 1. Backend na Railway

1. Crie um projeto novo em [railway.app](https://railway.app) → **Deploy from GitHub repo** → selecione `alocss/desenvolve_tech`.
2. Nas configurações do serviço criado:
   - **Root Directory**: `backend`
   - Railway detecta o `backend/railway.json` automaticamente (build via Nixpacks, start com `npm run start:prod`).
3. Em **Variables**, adicione:
   | Variável | Valor |
   |---|---|
   | `CORS_ORIGIN` | `https://desenvolvetech.com.br,https://www.desenvolvetech.com.br` |
   | `SENTRY_DSN` | *(opcional — deixar em branco desativa, ver Issue #1)* |
   | `CONTACT_NOTIFICATION_EMAIL` | e-mail que deve receber os leads do formulário |
   | `SMTP_HOST` | host do provedor de e-mail (ex.: `smtp.gmail.com`, `smtp.sendgrid.net`) |
   | `SMTP_PORT` | `587` (ou `465` para SSL) |
   | `SMTP_USER` | usuário SMTP |
   | `SMTP_PASSWORD` | senha/app password SMTP |

   `PORT` não precisa ser definida — a Railway injeta automaticamente e o backend já lê `process.env.PORT`.

4. Depois do primeiro deploy, copie a URL pública gerada pela Railway (algo como `https://desenvolve-tech-backend-production.up.railway.app`) — ela será usada no passo 2.

**Sem as credenciais SMTP**: o backend continua funcionando normalmente, só não envia e-mail de notificação — o lead fica registrado no log da Railway (ver Issue #7). Configure isso quando tiver um provedor de e-mail definido.

## 2. Frontend na Vercel

1. Crie um projeto novo em [vercel.com](https://vercel.com) → **Add New → Project** → importe `alocss/desenvolve_tech`.
2. Em **Root Directory**, selecione `frontend`. A Vercel detecta Next.js automaticamente — não precisa mexer em build/install command.
3. Em **Environment Variables**, adicione:
   | Variável | Valor |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | URL da Railway copiada no passo anterior |
   | `NEXT_PUBLIC_SITE_URL` | `https://desenvolvetech.com.br` |
   | `NEXT_PUBLIC_SENTRY_DSN` | *(opcional)* |
   | `SENTRY_AUTH_TOKEN` | *(opcional, só necessário para source maps do Sentry)* |
4. Clique em **Deploy**.

## 3. Domínio `desenvolvetech.com.br`

1. No projeto da Vercel → **Settings → Domains** → adicione `desenvolvetech.com.br` e `www.desenvolvetech.com.br`.
2. A Vercel mostra os registros DNS exatos a configurar (normalmente um registro `A` apontando para `76.76.21.21` no domínio raiz e um `CNAME` para `cname.vercel-dns.com` no `www`). Adicione esses registros no painel do seu provedor de domínio (onde você registrou `desenvolvetech.com.br`).
3. Propagação de DNS pode levar de alguns minutos a algumas horas. A Vercel confirma automaticamente quando o domínio estiver ativo e emite o certificado HTTPS.

## 4. Staging / preview

- **Frontend**: a Vercel já cria automaticamente uma URL de preview para cada Pull Request — isso cobre a necessidade de um ambiente de staging para o frontend sem configuração extra.
- **Backend**: por ora, um único ambiente de produção na Railway. Se surgir a necessidade de testar mudanças de backend antes do merge, a Railway suporta múltiplos ambientes por projeto — pode ser configurado depois, sob demanda.

## 5. Depois do primeiro deploy

Depois que os dois serviços estiverem no ar, me avise com:
- a URL pública da Railway (backend);
- confirmação de que `https://desenvolvetech.com.br` está respondendo.

Vou atualizar o `CLAUDE.md` com as URLs de produção e revisitar os limiares do Lighthouse CI (`lighthouserc.json`) contra o ambiente real de produção — os limiares atuais foram calibrados testando localmente contra `next start`, não contra o CDN da Vercel (ver Issue #8).
