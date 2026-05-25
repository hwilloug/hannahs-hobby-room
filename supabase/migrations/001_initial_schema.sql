-- Articles: metadata, likes (body content lives in src/content/posts)
create table if not exists public.articles (
  slug text primary key,
  likes integer not null default 0 check (likes >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Comments: threaded via parent_id
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null references public.articles (slug) on delete cascade,
  username text not null,
  body text not null,
  parent_id uuid references public.comments (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists comments_article_slug_idx on public.comments (article_slug);
create index if not exists comments_parent_id_idx on public.comments (parent_id);

-- Newsletter subscribers
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Atomically update like count (matches previous Lambda behavior)
create or replace function public.update_article_likes(p_slug text, p_decrease boolean)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_likes integer;
begin
  insert into public.articles (slug, likes)
  values (p_slug, 0)
  on conflict (slug) do nothing;

  if p_decrease then
    update public.articles
    set
      likes = greatest(likes - 1, 0),
      updated_at = now()
    where slug = p_slug
    returning likes into new_likes;
  else
    update public.articles
    set
      likes = likes + 1,
      updated_at = now()
    where slug = p_slug
    returning likes into new_likes;
  end if;

  return coalesce(new_likes, 0);
end;
$$;

-- RLS: deny direct client access; API routes use the secret key
alter table public.articles enable row level security;
alter table public.comments enable row level security;
alter table public.newsletter_subscribers enable row level security;
