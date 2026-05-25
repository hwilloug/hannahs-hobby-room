-- Move top-level category into subcategories, then drop category column.
update public.articles
set subcategories = subcategories || category::text
where category is not null
  and not (subcategories @> array[category]);

drop index if exists articles_category_idx;

alter table public.articles drop column if exists category;
