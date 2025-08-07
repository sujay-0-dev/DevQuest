-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Create user_progress table
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  roadmap_id text not null,
  topic_id text not null,
  completed boolean default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id, roadmap_id, topic_id)
);

alter table public.user_progress enable row level security;

create policy "Users can view own progress." on public.user_progress
  for select using (auth.uid() = user_id);

create policy "Users can insert own progress." on public.user_progress
  for insert with check (auth.uid() = user_id);

create policy "Users can update own progress." on public.user_progress
  for update using (auth.uid() = user_id);

-- Create daily_quests table
create table public.daily_quests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  quest_id text not null,
  completed boolean default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id, quest_id, created_at::date)
);

alter table public.daily_quests enable row level security;

create policy "Users can view own quests." on public.daily_quests
  for select using (auth.uid() = user_id);

create policy "Users can insert own quests." on public.daily_quests
  for insert with check (auth.uid() = user_id);

create policy "Users can update own quests." on public.daily_quests
  for update using (auth.uid() = user_id);

-- Create bookmarks table
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  resource_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id, resource_id)
);

alter table public.bookmarks enable row level security;

create policy "Users can view own bookmarks." on public.bookmarks
  for select using (auth.uid() = user_id);

create policy "Users can insert own bookmarks." on public.bookmarks
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks." on public.bookmarks
  for delete using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
