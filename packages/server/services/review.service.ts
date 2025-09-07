import type { Review } from '../generated/prisma';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient as client } from '../llm/client';
import template from '../prompts/summarize-reviews.txt';

export const reviewService = {
  getReviews(productId: number): Promise<Review[]> {
    return reviewRepository.getReviews(productId);
  },
  async summarizeReviews(productId: number): Promise<string> {
    // 1. See if we already have a summary
    const existingSummary = await reviewRepository.getReviewSummary(productId);
    if (existingSummary) {
      return existingSummary;
    }
    // 2. Get the last [10] reviews
    const reviews = await reviewRepository.getReviews(productId, 10);
    const joinedReviews = reviews.map((r) => r.content).join('\n\n');
    // 3. Send the reviews to a LLM
    const prompt = template.replace('{{reviews}}', joinedReviews);
    const response = await client.generateText({
      model: 'gpt-4.1',
      prompt,
      temperature: 0.2,
      maxTokens: 500,
    });
    await reviewRepository.storeReviewSummary(productId, response.output_text);
    return response.output_text;
  },
};
