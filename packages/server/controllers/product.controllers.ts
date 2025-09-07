import type { Request, Response } from 'express';
import { productRepository } from '../repositories/product.repository';

export const productController = {
  async getProduct(req: Request, res: Response) {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product ID' });
      return;
    }
    try {
      const productInfo = await productRepository.getProduct(productId);
      res.json(productInfo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the product info.' });
    }
  },
};
