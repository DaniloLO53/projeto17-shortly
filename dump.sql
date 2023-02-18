CREATE TABLE tokens
(
  id serial PRIMARY KEY,
  value text NOT NULL,
  user_id integer NOT NULL REFERENCES users(id)
);