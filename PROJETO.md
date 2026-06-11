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

