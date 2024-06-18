BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

DROP TABLE IF EXISTS "user", "role", "comment", "recipe", "ingredient", "work", "tag","score", "favorite", "recipe_has_ingredient", "recipe_has_tag" CASCADE;


CREATE TABLE "ingredient" (
   "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" TEXT NOT NULL,
   "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "work" (
   "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "title" TEXT NOT NULL UNIQUE,
   "synopsis" TEXT NOT NULL,
   "quote" TEXT,
   "picture" TEXT,
   "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "role" (
   "id"  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" TEXT NOT NULL,
   "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   "updatedAt" TIMESTAMPTZ
);


CREATE TABLE "tag" (
   "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" TEXT NOT NULL UNIQUE,
   "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "user" (
   "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" TEXT NOT NULL,
   "firstname" TEXT NOT NULL,
   "avatar" TEXT,
   "email" TEXT UNIQUE NOT NULL,
   "password" TEXT NOT NULL,
   "role_id" INTEGER REFERENCES "role"("id") NOT NULL DEFAULT 1,
   "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "recipe" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "total_time" TIME NOT NULL ,
    "servings" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "work_id" INTEGER REFERENCES "work"("id") NOT NULL,
    "user_id" INTEGER REFERENCES "user"("id") NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "comment" (
   "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "description" TEXT NOT NULL,
   "recipe_id" INTEGER REFERENCES "recipe"("id") NOT NULL,
   "user_id" INTEGER REFERENCES "user"("id") NOT NULL,
   "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "score" (
   "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "rating" NUMERIC(3,2) NOT NULL CHECK ("rating" BETWEEN 0.5 AND 5),
   "recipe_id" INTEGER REFERENCES "recipe"("id") NOT NULL,
   "user_id" INTEGER REFERENCES "user"("id") NOT NULL,
   "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   "updatedAt" TIMESTAMPTZ,
   UNIQUE ("user_id", "recipe_id")
);

CREATE TABLE "recipe_has_ingredient" (
   "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "ingredient_id" INTEGER REFERENCES "ingredient"("id") NOT NULL,
   "recipe_id" INTEGER REFERENCES "recipe"("id") NOT NULL,
   "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "favorite"(
   "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "user_id" INTEGER REFERENCES "user"("id") NOT NULL,
   "recipe_id" INTEGER REFERENCES "recipe"("id") NOT NULL,
   "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   "updatedAt" TIMESTAMPTZ
);


CREATE TABLE "recipe_has_tag" (
   "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "recipe_id" INTEGER REFERENCES "recipe"("id") NOT NULL,
   "tag_id" INTEGER REFERENCES "tag"("id") NOT NULL,
   "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   "updatedAt" TIMESTAMPTZ
);

COMMIT;