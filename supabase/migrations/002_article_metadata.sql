-- Article metadata (body content lives in src/content/posts as React components)
alter table public.articles
  add column if not exists title text,
  add column if not exists subtitle text,
  add column if not exists pub_date timestamptz,
  add column if not exists updated_date timestamptz,
  add column if not exists hero_image text,
  add column if not exists subcategories text[] not null default '{}';

create index if not exists articles_pub_date_idx on public.articles (pub_date desc nulls last);