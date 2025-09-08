import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

export const productRepository = {
  getProduct(productId: number) {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  },
};
