CREATE TABLE users (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);