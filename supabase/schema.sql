create table if not exists public.about_content (
  id bigint primary key generated always as identity,
  content text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id bigint primary key generated always as identity,
  slug text unique not null,
  category text not null default 'Learning log',
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  published_at date not null default current_date,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id bigint primary key generated always as identity,
  email text unique not null,
  created_at timestamptz not null default now()
);

alter table public.about_content enable row level security;
alter table public.articles enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "Public can read about content"
  on public.about_content for select using (true);
create policy "Authenticated users manage about content"
  on public.about_content for all to authenticated using (true) with check (true);

create policy "Public can read published articles"
  on public.articles for select using (published = true or auth.role() = 'authenticated');
create policy "Authenticated users manage articles"
  on public.articles for all to authenticated using (true) with check (true);

create policy "Anyone can subscribe"
  on public.newsletter_subscribers for insert with check (true);
create policy "Authenticated users read subscribers"
  on public.newsletter_subscribers for select to authenticated using (true);

insert into public.about_content (content)
select 'I''m Vinks — a cybersecurity learner, builder and writer. I started with curiosity about why systems break, and a habit of taking notes while I found out.'
where not exists (select 1 from public.about_content);