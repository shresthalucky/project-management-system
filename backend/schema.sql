CREATE TABLE IF NOT EXISTS "role" (
  "id" INT NOT NULL UNIQUE,
  "type" VARCHAR(20) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(30) NOT NULL UNIQUE,
  "password" VARCHAR(256) NOT NULL,
  "role_id" INT REFERENCES "role"("id") ON DELETE CASCADE NOT NULL,
  "active" BOOLEAN DEFAULT true NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "project" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL UNIQUE,
  "description" VARCHAR(500),
  "project_manager_id" INT REFERENCES "user"("id") ON DELETE CASCADE NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "task" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(100) NOT NULL UNIQUE,
  "description" VARCHAR(500) NOT NULL,
  "deadline" TIMESTAMP NOT NULL,
  "project_id" INT REFERENCES "project"("id") ON DELETE CASCADE NOT NULL,
  "prev_assignee_id" INT REFERENCES "user"("id") ON DELETE CASCADE,
  "assignee_id" INT REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "comment" (
  "id" SERIAL PRIMARY KEY,
  "text" VARCHAR(100) NOT NULL UNIQUE,
  "task_id" INT REFERENCES "task"("id") ON DELETE CASCADE NOT NULL,
  "user_id" INT REFERENCES "user"("id"),
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "permission" (
  "id" SERIAL PRIMARY KEY,
  "role_id" INT REFERENCES "role"("id") ON DELETE CASCADE NOT NULL,
  "user" VARCHAR(4),
  "project" VARCHAR(4),
  "task" VARCHAR(4),
  "comment" VARCHAR(4)
);
CREATE TABLE IF NOT EXISTS "project_user" (
  "project_id" INT REFERENCES "project"("id") ON DELETE CASCADE NOT NULL,
  "user_id" INT REFERENCES "user"("id") ON DELETE CASCADE NOT NULL
);
CREATE TABLE IF NOT EXISTS "task_tagged_user" (
  "task_id" INT REFERENCES "task"("id") ON DELETE CASCADE NOT NULL,
  "tagged_user_id" INT REFERENCES "user"("id") ON DELETE CASCADE
);
INSERT INTO "role" ("id", "type")
VALUES
  ('1', 'Admin'),
  ('2', 'Project Manager'),
  ('3', 'Team Lead'),
  ('4', 'Engineer');
INSERT INTO "permission" ("role_id", "user", "project", "task", "comment")
VALUES 
  (1, 'CRUD', 'CRUD', 'CRUD', 'CRUD'),
  (2, 'R', 'RU', 'CRUD', 'CRUD'),
  (3, 'R', 'R', 'CRUD', 'CRUD'),
  (4, 'R', 'R', 'RU', 'CRUD');