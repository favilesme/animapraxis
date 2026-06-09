create table public.telegram_conversations (
  chat_id text primary key,
  messages jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
grant all on public.telegram_conversations to service_role;
alter table public.telegram_conversations enable row level security;