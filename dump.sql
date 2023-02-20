CREATE TABLE sessions
(
  id serial PRIMARY KEY,
  token text NOT NULL,
  user_id integer REFERENCES users(id)
);
CREATE TABLE shortens
(
  id serial PRIMARY KEY,
  short_url text NOT NULL,
  url text NOT NULL,
  user_id integer REFERENCES users(id)
);