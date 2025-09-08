import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controllers.ts';
import { reviewController } from './controllers/review.controllers.ts';
import { productController } from './controllers/product.controllers.ts';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

router.get('/api/hello', (req: Request, res: Response) => {
  res.send({ message: 'Hello World' });
});

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', reviewController.getReviews);
router.post(
  '/api/products/:id/reviews/summarize',
  reviewController.summarizeReviews
);
router.get('/api/products/:id/', productController.getProduct);

export default router;
