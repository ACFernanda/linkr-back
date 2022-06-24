CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"pictureURL" TEXT NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"active" BOOLEAN NOT NULL DEFAULT 'true',
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"url" TEXT NOT NULL,
	"description" TEXT,
	"urlTitle" TEXT,
	"urlDescription" TEXT,
	"urlImage" TEXT,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "shares" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "likes" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"userId" INTEGER NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "hashtags" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "post_hashtag" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"hashtagId" INTEGER NOT NULL REFERENCES "hashtags"("id")
);

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"text" TEXT NOT NULL
);

CREATE TABLE "follows" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"following" INTEGER NOT NULL REFERENCES "users"("id")
);

