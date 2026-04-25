-- Hry pro děti — AI generátor
-- Migrace: 001_initial

CREATE TABLE saved_games (
  id          integer generated always as identity primary key,
  title       text not null,
  description text not null,
  age         text,
  players     text,
  duration    text,
  energy      text,
  situation   text,
  created_at  timestamptz default now(),
  user_id     uuid references auth.users(id)
);

ALTER TABLE saved_games ENABLE ROW LEVEL SECURITY;
CREATE POLICY "saved_games_allow_all" ON saved_games FOR ALL USING (true) WITH CHECK (true);
