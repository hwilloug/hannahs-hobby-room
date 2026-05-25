-- Body search text is not stored in the database; search uses title, subtitle, and tags.
alter table public.articles drop column if exists search_text;
