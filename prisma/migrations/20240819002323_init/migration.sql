/*
  Warnings:

  - The primary key for the `ProductsComments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `categoryId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductsComments" DROP CONSTRAINT "ProductsComments_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "score" DROP DEFAULT,
ADD CONSTRAINT "ProductsComments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductsComments_score_seq";

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
