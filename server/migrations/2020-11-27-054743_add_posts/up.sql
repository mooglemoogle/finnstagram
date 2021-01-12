CREATE TABLE posts (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  caption TEXT,
  created_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
        REFERENCES users(id)
);

CREATE TABLE media_items (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid NOT NULL,
  media_type TEXT,
  uri TEXT,
  live_uri TEXT,
  index INTEGER,
  created_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_post
      FOREIGN KEY(post_id) 
        REFERENCES posts(id)
);

CREATE TABLE comments (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  post_id uuid NOT NULL,
  body TEXT,
  reply_to_id uuid,
  created_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
        REFERENCES users(id),
  CONSTRAINT fk_post
      FOREIGN KEY(post_id)
        REFERENCES posts(id),
  CONSTRAINT fk_reply
      FOREIGN KEY(reply_to_id)
        REFERENCES comments(id)
);