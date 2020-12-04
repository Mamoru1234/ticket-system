CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "password" TEXT
);

CREATE TABLE "studentGroup" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL
);

CREATE TABLE "studentGroupMembers" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "groupId" UUID REFERENCES "studentGroup",
    "studentId" INT REFERENCES users
);

CREATE TABLE "studentGroupTeachers" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "groupId" UUID REFERENCES "studentGroup",
    "teacherId" INT REFERENCES users
);
