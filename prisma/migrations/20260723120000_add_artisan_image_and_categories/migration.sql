-- AlterTable
ALTER TABLE "AboutContent" ADD COLUMN "artisanImage" TEXT;

-- Seed new product categories
INSERT INTO "Category" ("slug", "name") VALUES
  ('suits', 'Suits'),
  ('kurtis', 'Kurtis')
ON CONFLICT ("slug") DO NOTHING;
