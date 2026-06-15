-- ==============================================================================
-- Migration Inicial - CarrosselFlow
-- Cria as tabelas do projeto (profiles, templates, projects, project_images),
-- configura chaves primárias, estrangeiras e constraints.
-- Aplica Row Level Security (RLS) nas 4 tabelas e no Storage,
-- e configura as triggers para user sign-up e updated_at.
-- ==============================================================================

-- Habilita extensão pgcrypto para gen_random_uuid()
create extension if not exists pgcrypto;

-- ==========================================
-- 1. Criação das Tabelas
-- ==========================================

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    full_name text,
    role text not null default 'free' check (role in ('free', 'admin')),
    created_at timestamptz default now()
);

create table if not exists public.templates (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    is_premium boolean default false,
    config jsonb not null default '{}',
    thumbnail_url text,
    created_at timestamptz default now()
);

create table if not exists public.projects (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    title text not null,
    source_url text,
    template_id uuid references public.templates(id) on delete set null,
    content jsonb not null default '{}',
    brand_handle text,
    keywords text[] default '{}',
    language text default 'pt-BR',
    status text not null default 'draft' check (status in ('draft', 'done')),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists public.project_images (
    id uuid primary key default gen_random_uuid(),
    project_id uuid not null references public.projects(id) on delete cascade,
    storage_path text not null,
    slide_index int not null,
    created_at timestamptz default now()
);

-- ==========================================
-- 2. Índices
-- ==========================================
create index if not exists idx_projects_user_id on public.projects(user_id);
create index if not exists idx_project_images_project_id on public.project_images(project_id);


-- ==========================================
-- 3. Triggers
-- ==========================================

-- Atualiza o campo updated_at da tabela projects a cada UPDATE
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger on_projects_updated
    before update on public.projects
    for each row execute procedure public.handle_updated_at();

-- Cria perfil em public.profiles automaticamente quando um auth.user for criado
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, role)
    values (new.id, new.email, 'free');
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();


-- ==========================================
-- 4. Row Level Security (RLS)
-- ==========================================

alter table public.profiles enable row level security;
alter table public.templates enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;

-- RLS: profiles
create policy "Select proprio perfil"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Update proprio perfil"
    on public.profiles for update
    using (auth.uid() = id);

-- RLS: templates
create policy "Templates visiveis para usuarios autenticados"
    on public.templates for select
    using (auth.role() = 'authenticated');

create policy "Admin pode inserir templates"
    on public.templates for insert
    with check (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Admin pode atualizar templates"
    on public.templates for update
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Admin pode deletar templates"
    on public.templates for delete
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

-- RLS: projects
create policy "Usuario gerencia proprios projetos - SELECT"
    on public.projects for select
    using (auth.uid() = user_id);

create policy "Usuario gerencia proprios projetos - INSERT"
    on public.projects for insert
    with check (auth.uid() = user_id);

create policy "Usuario gerencia proprios projetos - UPDATE"
    on public.projects for update
    using (auth.uid() = user_id);

create policy "Usuario gerencia proprios projetos - DELETE"
    on public.projects for delete
    using (auth.uid() = user_id);

-- RLS: project_images
create policy "Acesso a imagens do proprio projeto - SELECT"
    on public.project_images for select
    using (
        exists (
            select 1 from public.projects
            where projects.id = project_images.project_id
            and projects.user_id = auth.uid()
        )
    );

create policy "Acesso a imagens do proprio projeto - INSERT"
    on public.project_images for insert
    with check (
        exists (
            select 1 from public.projects
            where projects.id = project_images.project_id
            and projects.user_id = auth.uid()
        )
    );

create policy "Acesso a imagens do proprio projeto - UPDATE"
    on public.project_images for update
    using (
        exists (
            select 1 from public.projects
            where projects.id = project_images.project_id
            and projects.user_id = auth.uid()
        )
    );

create policy "Acesso a imagens do proprio projeto - DELETE"
    on public.project_images for delete
    using (
        exists (
            select 1 from public.projects
            where projects.id = project_images.project_id
            and projects.user_id = auth.uid()
        )
    );


-- ==========================================
-- 5. Storage
-- ==========================================

-- Garante criacao do bucket 'project-images' como privado
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', false)
on conflict (id) do nothing;

-- RLS para Storage (apenas a pasta = user_id auth.uid())
create policy "Usuario manipula imagens do proprio bucket - SELECT"
    on storage.objects for select
    using (
        bucket_id = 'project-images'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "Usuario manipula imagens do proprio bucket - INSERT"
    on storage.objects for insert
    with check (
        bucket_id = 'project-images'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "Usuario manipula imagens do proprio bucket - UPDATE"
    on storage.objects for update
    using (
        bucket_id = 'project-images'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "Usuario manipula imagens do proprio bucket - DELETE"
    on storage.objects for delete
    using (
        bucket_id = 'project-images'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );
