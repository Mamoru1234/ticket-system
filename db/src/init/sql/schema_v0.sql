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

CREATE TABLE ticket(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "createdTimestamp" BIGINT NOT NULL DEFAULT 0,
  "validFromTimestamp" BIGINT NOT NULL DEFAULT 0,
  "validToTimestamp" BIGINT NOT NULL DEFAULT 0,
  "visitsLeft" INT NOT NULL DEFAULT 0,
  "visitsTotal" INT NOT NULL DEFAULT 0,
  "createdById" INT REFERENCES users,
  "studentId" INT REFERENCES users
);

CREATE TABLE "lessonVisit" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "lessonId" UUID REFERENCES "lesson",
  "ticketId" UUID REFERENCES "ticket",
  "studentId" INT REFERENCES users,
  "markedById" INT REFERENCES users
);

CREATE TABLE "studentGroupTeachers" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "groupId" UUID REFERENCES "studentGroup",
  "teacherId" INT REFERENCES users
);
