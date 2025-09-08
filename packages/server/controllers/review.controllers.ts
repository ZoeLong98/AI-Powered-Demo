import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service.ts';
import { productRepository } from '../repositories/product.repository.ts';
import { reviewRepository } from '../repositories/review.repository.ts';

export const reviewController = {
  async getReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product ID' });
      return;
    }
    try {
      const reviews = await reviewService.getReviews(productId);
      const summary = await reviewRepository.getReviewSummary(productId);
      res.json({ summary, reviews });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
  },
  async summarizeReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product ID' });
      return;
    }
    const product = productRepository.getProduct(productId);
    if (!product) {
      res.status(400).json({ error: 'Invalid product' });
    }

    const reviews = await reviewRepository.getReviews(productId, 10);
    if (!reviews.length) {
      res.status(400).json({ error: 'There are no reviews to summarize' });
    }
    const summary = await reviewService.summarizeReviews(productId);
    res.json({ summary });
  },
};
