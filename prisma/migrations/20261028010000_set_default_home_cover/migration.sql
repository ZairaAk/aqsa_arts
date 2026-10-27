UPDATE "HomeContent"
SET "heroImage" = '/front.jpg',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'singleton' AND "heroImage" IS NULL;
