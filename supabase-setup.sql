-- ============================================
-- Life Lessons App - Supabase Database Setup
-- Run this in the Supabase SQL Editor
-- ============================================

-- 1. PROFILES TABLE
-- Stores parent/user profile info
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Users can only see and edit their own profile
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);


-- 2. CHILDREN TABLE
-- Stores child profiles linked to a parent
create table if not exists children (
  id uuid default gen_random_uuid() primary key,
  parent_id uuid references auth.users on delete cascade not null,
  name text not null,
  age integer not null check (age >= 1 and age <= 18),
  interests text default '',
  personality text default '',
  challenges text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table children enable row level security;

-- Parents can only see and manage their own children
create policy "Parents can view own children"
  on children for select
  using (auth.uid() = parent_id);

create policy "Parents can insert own children"
  on children for insert
  with check (auth.uid() = parent_id);

create policy "Parents can update own children"
  on children for update
  using (auth.uid() = parent_id);

create policy "Parents can delete own children"
  on children for delete
  using (auth.uid() = parent_id);


-- 3. LESSON PROGRESS TABLE
-- Tracks which lessons a user has completed, favorited, or reflected on
create table if not exists lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  lesson_id text not null,
  is_completed boolean default false,
  is_favorited boolean default false,
  reflection text default '',
  child_id uuid references children on delete set null,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Each user can only have one progress record per lesson
  unique(user_id, lesson_id)
);

-- Enable Row Level Security
alter table lesson_progress enable row level security;

-- Users can only see and manage their own lesson progress
create policy "Users can view own progress"
  on lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on lesson_progress for update
  using (auth.uid() = user_id);

create policy "Users can delete own progress"
  on lesson_progress for delete
  using (auth.uid() = user_id);
