import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { slugify } from "../src/lib/utils/slug";
import {
  seedCategories,
  seedProducts,
  seedAwards,
  seedMediaFeatures,
  seedHomeContent,
  seedAboutContent,
  seedSiteConfig,
} from "../src/lib/db/seed-data";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding categories...");
  for (const category of seedCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      create: category,
      update: { name: category.name },
    });
  }

  console.log("Seeding products...");
  for (const product of seedProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      create: product,
      update: {},
    });
  }

  console.log("Seeding awards...");
  for (let i = 0; i < seedAwards.length; i++) {
    const award = seedAwards[i];
    const id = `seed-award-${slugify(`${award.year}-${award.title}`)}`;
    await prisma.award.upsert({
      where: { id },
      create: { id, ...award, sortOrder: i },
      update: {},
    });
  }

  console.log("Seeding media features...");
  for (let i = 0; i < seedMediaFeatures.length; i++) {
    const feature = seedMediaFeatures[i];
    const id = `seed-media-${slugify(`${feature.year}-${feature.title}`)}`;
    await prisma.mediaFeature.upsert({
      where: { id },
      create: { id, ...feature, sortOrder: i },
      update: {},
    });
  }

  console.log("Seeding homepage content...");
  await prisma.homeContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...seedHomeContent },
    update: {},
  });

  console.log("Seeding about content...");
  await prisma.aboutContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...seedAboutContent },
    update: {},
  });

  console.log("Seeding site config...");
  await prisma.siteConfig.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...seedSiteConfig },
    update: {},
  });

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
