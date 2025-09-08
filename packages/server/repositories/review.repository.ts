import dayjs from 'dayjs';
import { type Review } from '../generated/prisma/client.js';
import { PrismaClient } from '../generated/prisma/client.js';

// PrismaClient gets regenerated every time we modify our Prisma schema and create a new migration
const prisma = new PrismaClient();
export const reviewRepository = {
  async getReviews(productId: number, limit?: number): Promise<Review[]> {
    // SELECT * FROM review WHERE productId = ? ORDER BY createdAt DESC
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return reviews;
  },

  storeReviewSummary(productId: number, summary: string) {
    const now = new Date();
    const expiresAt = dayjs().add(7, 'days').toDate();
    const data = {
      content: summary,
      expiresAt,
      generatedAt: now,
      productId,
    };
    return prisma.summary.upsert({
      where: { productId },
      create: data,
      update: data,
    });
  },
  async getReviewSummary(productId: number): Promise<string | null> {
    const summary = await prisma.summary.findFirst({
      where: { AND: [{ productId }, { expiresAt: { gt: new Date() } }] },
    });

    return summary ? summary.content : null;
  },
};
