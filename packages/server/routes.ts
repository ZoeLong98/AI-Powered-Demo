import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controllers';
import { reviewController } from './controllers/review.controllers';
import { productController } from './controllers/product.controllers';

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
