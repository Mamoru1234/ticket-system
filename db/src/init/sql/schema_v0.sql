CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "password" TEXT
);

CREATE TABLE "studentGroup" (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE "studentGroupMembers" (
    "groupId" UUID REFERENCES "studentGroup",
    "studentId" INT REFERENCES users,
    PRIMARY KEY ("groupId", "studentId")
);

CREATE TABLE "studentGroupTeachers" (
   "groupId" UUID REFERENCES "studentGroup",
   "teacherId" INT REFERENCES users,
   PRIMARY KEY ("groupId", "teacherId")
);
