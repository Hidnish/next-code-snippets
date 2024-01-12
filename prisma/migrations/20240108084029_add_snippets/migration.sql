/*
  Warnings:

  - Added the required column `code` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Snippet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL
);
INSERT INTO "new_Snippet" ("id") SELECT "id" FROM "Snippet";
DROP TABLE "Snippet";
ALTER TABLE "new_Snippet" RENAME TO "Snippet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
