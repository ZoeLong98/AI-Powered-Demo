import axios from 'axios';
import type { GetReviewsResponse, Product, SummarizeResponse } from '../types';
import { API_ENDPOINTS } from '../../config/api';

export function getReviews(productId: number): Promise<GetReviewsResponse> {
  return axios
    .get<GetReviewsResponse>(API_ENDPOINTS.reviews(productId))
    .then((res) => res.data);
}

export function getProduct(productId: number): Promise<Product> {
  return axios
    .get<Product>(API_ENDPOINTS.products(productId))
    .then((res) => res.data);
}

export function summarizeResponse(
  productId: number
): Promise<SummarizeResponse> {
  return axios
    .post<SummarizeResponse>(API_ENDPOINTS.summarize(productId))
    .then((res) => res.data);
}
