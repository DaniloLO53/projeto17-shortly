CREATE TABLE sessions
(
  id serial PRIMARY KEY,
  token text NOT NULL,
  user_id integer REFERENCES users(id)
);