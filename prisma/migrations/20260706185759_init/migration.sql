-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('INTERVIEW', 'ARTICLE', 'VIDEO');

-- CreateTable
CREATE TABLE "Category" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categorySlug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "material" TEXT,
    "dimensions" TEXT,
    "images" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Award" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaFeature" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "outlet" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "url" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "heroEyebrow" TEXT NOT NULL,
    "heroName" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "heroCtaLabel" TEXT NOT NULL,
    "heroCtaHref" TEXT NOT NULL,
    "heroImage" TEXT,
    "aboutPreviewEyebrow" TEXT NOT NULL,
    "aboutPreviewHeading" TEXT NOT NULL,
    "aboutPreviewBody" TEXT NOT NULL,
    "aboutPreviewCtaLabel" TEXT NOT NULL,
    "aboutPreviewCtaHref" TEXT NOT NULL,
    "featuredEyebrow" TEXT NOT NULL,
    "featuredTitle" TEXT NOT NULL,
    "featuredDescription" TEXT NOT NULL,
    "featuredCtaLabel" TEXT NOT NULL,
    "featuredCtaHref" TEXT NOT NULL,
    "craftsmanshipEyebrow" TEXT NOT NULL,
    "craftsmanshipTitle" TEXT NOT NULL,
    "craftsmanshipValues" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "heroEyebrow" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "journeyEyebrow" TEXT NOT NULL,
    "journeyHeading" TEXT NOT NULL,
    "journeyParagraphs" TEXT[],
    "craftsmanshipEyebrow" TEXT NOT NULL,
    "craftsmanshipTitle" TEXT NOT NULL,
    "craftsmanshipDescription" TEXT NOT NULL,
    "craftsmanshipParagraphs" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "phoneDisplay" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "addressLine3" TEXT NOT NULL,
    "footerDescription" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_categorySlug_idx" ON "Product"("categorySlug");

-- CreateIndex
CREATE INDEX "Product_featured_idx" ON "Product"("featured");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "Category"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
