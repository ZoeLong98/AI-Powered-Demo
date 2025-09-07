// API base URL configuration
export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.VITE_API_URL || 'https://your-server-domain.railway.app'
    : 'http://localhost:3000';

export const API_ENDPOINTS = {
  chat: `${API_BASE_URL}/api/chat`,
  products: (id: number) => `${API_BASE_URL}/api/products/${id}`,
  reviews: (id: number) => `${API_BASE_URL}/api/products/${id}/reviews`,
  summarize: (id: number) =>
    `${API_BASE_URL}/api/products/${id}/reviews/summarize`,
};
