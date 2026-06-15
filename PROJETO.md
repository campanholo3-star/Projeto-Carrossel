# CarrosselFlow — Documento Mestre de Planejamento
> Fonte da verdade do projeto. Consulte SEMPRE antes de implementar qualquer etapa.
> Versão 1.1 · Idioma padrão: PT-BR

---

## ⚠️ INSTRUÇÕES PARA A IA DE CÓDIGO (LEIA PRIMEIRO)
- Este documento é a fonte única de verdade. Em caso de dúvida, siga-o.
- Implemente UMA etapa do Roadmap por vez, na ordem definida.
- NÃO invente requisitos, campos, endpoints ou bibliotecas fora deste doc.
- Mantenha consistência: nomes de tabelas, campos, rotas e tipos são fixos.
- Use TypeScript em tudo. Valide entradas com Zod. Respeite RLS.
- Não exponha SUPABASE_SERVICE_ROLE_KEY no client.
- Padrão de resposta de API: `{ success: boolean, data?, error? }`.
- Ao concluir uma etapa, verifique os Critérios de Aceite antes de avançar.

---

## Índice
1. Visão e Escopo
2. Requisitos (RF / RNF)
3. Personas
4. Stack Tecnológica
5. Arquitetura
6. Estrutura de Diretórios
7. Modelo de Dados
8. Schema do JSON da Skill
9. Contrato de API
10. Variáveis de Ambiente
11. Roadmap de Execução (com critérios)
12. A Skill — Analista Editorial
13. Regras de Negócio Críticas

---

## 1. Visão e Escopo

### Resumo do Produto
CarrosselFlow é um web app (PWA) que transforma a análise editorial de uma
notícia/reportagem em carrosséis visuais editáveis para redes sociais. Uma
"Skill" externa de IA analisa a reportagem e gera um JSON estruturado e rico;
o usuário importa esse JSON no app, ajusta o design, faz upload das imagens
e exporta em PNG/PDF.

### Proposta de Valor
Acelera a produção de carrosséis profissionais para criadores e social media,
eliminando o trabalho manual de design e de curadoria editorial.

### Funcionalidades MVP
- Cadastro/login (e-mail/senha + Google).
- Importação de carrossel via JSON validado (saída da Skill).
- Galeria de templates + edição básica.
- Editor visual com DOIS MODOS:
  - Edição individual (slide a slide).
  - Pré-definição de layout global (aplicar estilo a todos os slides antes).
- Definir a QUANTIDADE de slides do carrossel.
- Upload de imagens por slide.
- Campo de marca manual (`@marca`) + palavras-chave adicionais.
- Exibição dos prompts de imagem (com botão copiar).
- Exportação PNG (por slide, 1080×1350) e PDF (carrossel completo).
- Plano grátis limitado (3 projetos); admin ilimitado.
- PWA instalável.

### Funcionalidades Futuras (backlog)
- Pagamento (Stripe) e planos premium.
- Geração de imagem integrada.
- Templates premium.
- Agendamento/publicação nas redes.
- Colaboração em equipe.

---

## 2. Requisitos

### Funcionais (RF)
- RF01: Autenticar usuários (e-mail/senha e Google).
- RF02: Importar carrossel via JSON com validação de schema.
- RF03: Listar, abrir, editar e excluir projetos.
- RF04: Aplicar e editar templates.
- RF05: Editar textos, cores, fontes e layout dos slides.
- RF06: Definir a quantidade de slides do carrossel.
- RF07: Editar em dois modos (individual / layout global).
- RF08: Fazer upload de imagens por slide.
- RF09: Informar `@marca` manual e palavras-chave por projeto.
- RF10: Exibir prompts de imagem com opção de copiar.
- RF11: Exportar slides em PNG e o carrossel em PDF.
- RF12: Limitar plano grátis a 3 projetos; admin ilimitado.
- RF13: Painel admin para gerenciar templates e usuários.

### Não-Funcionais (RNF)
- RNF01 (Performance): editor reativo; exportação client-side.
- RNF02 (Segurança): RLS no banco, validação Zod, HTTPS, boas práticas OWASP.
- RNF03 (Escalabilidade): stack serverless (Vercel + Supabase).
- RNF04 (Custo): operar no free tier no MVP.
- RNF05 (Usabilidade): responsivo e instalável (PWA).
- RNF06 (Manutenibilidade): TypeScript, código modular e tipado.

---

## 3. Personas
- **Usuário Free**: cria até 3 projetos.
- **Admin**: ilimitado + gestão de templates e usuários.

---

## 4. Stack Tecnológica
| Camada      | Tecnologia                                  |
|-------------|---------------------------------------------|
| Front-end   | Next.js 14 (App Router), React, TypeScript  |
| UI/Estilo   | Tailwind CSS, shadcn/ui, lucide-react       |
| Estado      | Zustand                                     |
| Back-end    | Next.js Route Handlers (REST /api/v1)       |
| Validação   | Zod + react-hook-form                       |
| Banco       | Supabase (PostgreSQL + jsonb)               |
| Auth        | Supabase Auth (@supabase/ssr) + RLS         |
| Storage     | Supabase Storage (bucket project-images)    |
| Exportação  | html-to-image (PNG), jsPDF (PDF)            |
| PWA         | next-pwa                                     |
| Deploy      | Vercel (CI/CD via GitHub)                   |
> Usar sempre versões estáveis mais recentes; confirmar no setup.

---

## 5. Arquitetura
[ IA do usuário + Skill ] → analisa reportagem → gera JSON editorial │ (usuário cola o JSON no app) ▼ [ Navegador / PWA — Next.js ] ◄──HTTPS──► [ API Next.js /api/v1 ]

Editor visual (Zustand) │
Exportação PNG/PDF (client) ▼ [ Supabase: DB + Auth + Storage + RLS ]
Deploy: GitHub → Vercel (CI/CD)




Padrões:
- API REST, prefixo `/api/v1`, resposta `{ success, data, error }`.
- Segurança por RLS (cada usuário só acessa seus dados) + validação Zod.

---

## 6. Estrutura de Diretórios
carrosselflow/ ├── public/ # manifest.json, icons/, fonts/ ├── src/ │ ├── app/ │ │ ├── (auth)/ # login, register │ │ ├── (app)/ # dashboard, editor/[id], import │ │ ├── (admin)/ # admin │ │ ├── auth/callback/ # OAuth callback │ │ ├── api/v1/ # import, projects, projects/[id], templates, upload │ │ ├── layout.tsx │ │ ├── page.tsx │ │ └── globals.css │ ├── components/ # ui/, editor/, templates/, export/ │ ├── lib/ # supabase/, validation/, export/, api/, utils.ts │ ├── store/ # editorStore.ts │ ├── types/ # index.ts │ └── middleware.ts ├── supabase/migrations/0001_init.sql └── configs (.env.local, next.config.js, tailwind.config.ts, tsconfig.json)




---

## 7. Modelo de Dados

### profiles
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK (ref auth.users) | ID do usuário |
| email | text | E-mail |
| full_name | text | Nome |
| role | text ('free'\|'admin') default 'free' | Perfil |
| created_at | timestamptz default now() | Criação |

### templates
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK default gen_random_uuid() | ID |
| name | text | Nome |
| is_premium | boolean default false | Uso futuro |
| config | jsonb | Estilos do template |
| thumbnail_url | text | Preview |
| created_at | timestamptz default now() | Criação |

### projects
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK default gen_random_uuid() | ID |
| user_id | uuid FK→profiles(id) ON DELETE CASCADE | Dono |
| title | text | Título |
| source_url | text | Origem da notícia |
| template_id | uuid FK→templates(id) | Template aplicado |
| content | jsonb | Slides (ver §8) |
| brand_handle | text | Marca manual (@marca) |
| keywords | text[] | Palavras-chave |
| language | text default 'pt-BR' | Idioma |
| status | text ('draft'\|'done') default 'draft' | Status |
| created_at | timestamptz default now() | Criação |
| updated_at | timestamptz default now() | Atualização |

### project_images
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK default gen_random_uuid() | ID |
| project_id | uuid FK→projects(id) ON DELETE CASCADE | Projeto |
| storage_path | text | Caminho no Storage |
| slide_index | int | Slide vinculado |
| created_at | timestamptz default now() | Criação |

Relações: profiles 1:N projects · templates 1:N projects · projects 1:N project_images

---

## 8. Schema do JSON da Skill
```json
{
  "version": "1.0",
  "title": "string",
  "source_url": "string?",
  "language": "pt-BR",
  "theme": {
    "primaryColor": "#RRGGBB",
    "accentColor": "#RRGGBB",
    "backgroundColor": "#RRGGBB",
    "fontFamily": "string",
    "fontHeading": "string"
  },
  "slides": [
    {
      "index": 0,
      "type": "cover | content | cta",
      "title": "string?",
      "subtitle": "string?",
      "body": "string?",
      "brandHandle": "@marca?",
      "suggestedBgColor": "#RRGGBB?",
      "imagePrompt": "prompt editorial detalhado e específico à notícia",
      "imageStyle": "editorial | fotojornalismo | minimalista | ...?",
      "referenceSuggestion": "ex: anexar foto do personagem X como referência?",
      "imageUrl": null,
      "layout": "center | top | bottom | split"
    }
  ]
}
Regras de validação (Zod):

Cores em hex (regex ^#([0-9A-Fa-f]{6})$).
slides com no mínimo 1 item; index >= 0.
imagePrompt obrigatório por slide.
Mensagens de erro em PT-BR.
9. Contrato de API (/api/v1)



Método	Endpoint	Descrição	Auth
POST	/import	Valida JSON + cria projeto (checa limite free)	✅
GET	/projects	Lista projetos do usuário	✅
GET	/projects/[id]	Detalhe do projeto	✅
PATCH	/projects/[id]	Atualiza título/slides/template/marca/keywords/status	✅
DELETE	/projects/[id]	Exclui projeto	✅
GET	/templates	Lista templates	✅
POST	/upload	Upload de imagem (Supabase Storage)	✅
Resposta padrão: { success: boolean, data?: T, error?: string }. Regra free: role='free' com 3 projetos → HTTP 403. Admin → ilimitado.

10. Variáveis de Ambiente (.env.local)


NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_FREE_PROJECT_LIMIT=3
(Nunca commitar valores reais. SERVICE_ROLE só no servidor.)

11. Roadmap de Execução
Implementar nesta ordem. Cada etapa: Objetivo · Entregável · Dependências · Critério de aceite.

Setup do ambiente e repositório — Base Next.js+TS+Tailwind+shadcn. Dep: nenhuma. Aceite: npm run dev renderiza landing.
Supabase + banco + migrations + RLS — Clients + 0001_init.sql + RLS + trigger profile + bucket. Dep: 1. Aceite: migration aplica; RLS isola dados.
Tipos e validação (Zod) — types/index.ts + carrosselSchema. Dep: 2. Aceite: JSON válido passa, inválido lista erros PT-BR.
Autenticação + proteção de rotas — login/register/callback + middleware. Dep: 2,3. Aceite: cadastro cria profile, rotas privadas bloqueadas.
API: importação de JSON — POST /import com limite free. Dep: 3,4. Aceite: cria projeto; free no limite → 403.
API: CRUD projetos + GET templates — endpoints REST. Dep: 5. Aceite: CRUD respeita RLS; PATCH persiste slides.
Dashboard + tela de import — lista de projetos + colar JSON. Dep: 6. Aceite: importa e lista projetos.
Estado do editor (Zustand) — editorStore com slides, modo, slide ativo. Dep: 7. Aceite: estado reativo e tipado.
Editor visual (dois modos + qtd de slides) — edição individual e layout global; ajustar quantidade. Dep: 8. Aceite: edita textos/cores/layout e altera nº de slides.
Templates (galeria + aplicação) — aplicar template ao projeto. Dep: 9. Aceite: template aplica estilos aos slides.
Upload de imagens — POST /upload + vínculo por slide. Dep: 9. Aceite: imagem sobe e aparece no slide.
Exibição de prompts de imagem — bloco copiável por slide. Dep: 9. Aceite: copia prompt para clipboard.
Exportação PNG/PDF — html-to-image + jsPDF. Dep: 9,11. Aceite: PNG 1080×1350 por slide e PDF do carrossel.
Painel admin — gerir templates e usuários. Dep: 6. Aceite: admin cria/edita templates; free não acessa.
PWA + responsividade — manifest + next-pwa + ajustes mobile. Dep: 7. Aceite: instalável e responsivo.
Deploy + monitoramento — Vercel + GitHub CI/CD + envs. Dep: todas. Aceite: build em produção funcional.
A Skill (SKILL.md) — documento de análise editorial. Dep: 3 (schema). Aceite: gera JSON válido a partir de uma notícia.
12. A Skill — Analista Editorial
A Skill é um documento de instruções (SKILL.md) para uma IA externa. Ela NÃO é apenas um formatador de JSON — é uma analista editorial. Recebe um link ou texto de reportagem e deve:

Analisar tecnicamente o conteúdo da reportagem.
Extrair os elementos-chave (fatos, protagonistas, contexto, ângulo).
Definir títulos principais e subtítulos de impacto por card.
Redigir o texto de cada card (resumido, com gancho de leitura).
Sugerir cores de fundo que chamem atenção e combinem com o tom da notícia.
Posicionar a marca (brandHandle) quando informada.
Gerar prompts de imagem editoriais — específicos, impactantes e conectados ao tema real (NUNCA genéricos), em estilo editorial/fotojornalístico.
Identificar personagens/elementos presentes e, quando útil, indicar em referenceSuggestion o uso de imagem de referência (pois ferramentas de geração aceitam anexar referência), aumentando a fidelidade da imagem.
Saída final: JSON válido conforme §8.
Idioma padrão: PT-BR; o usuário pode escolher outro idioma livremente.
A marca e as palavras-chave são informadas pelo usuário (manuais).
13. Regras de Negócio Críticas
Limite free: máximo 3 projetos para role='free'. Admin ilimitado. Validar SEMPRE no servidor lendo role do banco (nunca confiar no client).
Isolamento: RLS garante que cada usuário acessa apenas seus dados.
Marca/keywords: manuais por projeto; não inferir automaticamente.
Idioma: default PT-BR, configurável por projeto.
Exportação: client-side, formato de slide 1080×1350 (4:5).
Prompts de imagem: sempre específicos à reportagem; jamais genéricos.
Consistência: nomes de tabelas/campos/rotas/tipos deste doc são imutáveis.

