CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "email" TEXT UNIQUE,
  "lastForgotPassRequest" BIGINT NOT NULL DEFAULT 0,
  "password" TEXT
);

CREATE TABLE "studentGroup" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner INT REFERENCES users
);

CREATE TABLE lesson(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "groupId" UUID REFERENCES "studentGroup",
  "timestamp" BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE "lessonVisit" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "lessonId" UUID REFERENCES "lesson",
  "studentId" INT REFERENCES users
);

CREATE TABLE "studentGroupTeachers" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "groupId" UUID REFERENCES "studentGroup",
  "teacherId" INT REFERENCES users
);
