-- ============================================================
-- Tripcraft — Database Schema
-- Run in Supabase SQL Editor
-- ============================================================

create extension if not exists "pgcrypto";

-- ── Profiles ─────────────────────────────────────────────────
create table if not exists profiles (
  id         uuid references auth.users(id) on delete cascade primary key,
  name       text,
  avatar_url text,
  created_at timestamptz default now() not null
);

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'user_name',
      split_part(new.email, '@', 1),
      'Traveler'
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ── Trips ─────────────────────────────────────────────────────
create table if not exists trips (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references profiles(id) on delete cascade not null,
  destination   text not null,
  country       text not null,
  days          integer not null,
  style         text not null check (style in ('cultural','adventure','relaxation','foodie','budget')),
  budget_level  text not null check (budget_level in ('budget','moderate','luxury')),
  itinerary     jsonb not null,
  cover_emoji   text default '🗺️',
  created_at    timestamptz default now() not null,
  updated_at    timestamptz default now() not null
);

create or replace function set_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists trips_updated_at on trips;
create trigger trips_updated_at
  before update on trips
  for each row execute function set_updated_at();

-- ── RLS ───────────────────────────────────────────────────────
alter table profiles enable row level security;
alter table trips    enable row level security;

create policy "profiles: read all"   on profiles for select using (true);
create policy "profiles: update own" on profiles for update using (auth.uid() = id);

create policy "trips: owner can read"
  on trips for select using (auth.uid() = user_id);

create policy "trips: owner can insert"
  on trips for insert with check (auth.uid() = user_id);

create policy "trips: owner can delete"
  on trips for delete using (auth.uid() = user_id);

-- ── RPC: create trip bypassing RLS auth.uid() edge case ──────
create or replace function save_trip(
  p_destination  text,
  p_country      text,
  p_days         integer,
  p_style        text,
  p_budget_level text,
  p_itinerary    jsonb,
  p_cover_emoji  text default '🗺️'
) returns trips
language plpgsql security definer set search_path = public
as $$
declare v_trip trips;
begin
  if auth.uid() is null then raise exception 'Not authenticated'; end if;
  insert into trips (user_id, destination, country, days, style, budget_level, itinerary, cover_emoji)
  values (auth.uid(), p_destination, p_country, p_days, p_style, p_budget_level, p_itinerary, p_cover_emoji)
  returning * into v_trip;
  return v_trip;
end;
$$;
