import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SkeletonHolder from './SkeletonHolder';
import ProductId from './ProductId';
import ReviewItem from './ReviewItem';
import type { GetReviewsResponse } from '../types';
import Products from './Product';
import { getReviews } from './reviewsAPI';

const ReviewList = () => {
  const [productId, setProductId] = useState(3);
  const {
    data: reviewData,
    isLoading,
    error,
  } = useQuery<GetReviewsResponse>({
    queryKey: ['reviews', productId],
    queryFn: () => getReviews(productId),
  });

  if (isLoading) {
    return (
      <div>
        {[1, 2, 3].map((key) => (
          <SkeletonHolder key={key.toString()} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!reviewData?.reviews.length) {
    return null;
  }

  return (
    <div className="w-full h-full overflow-y-scroll p-3">
      <section className="m-4 flex justify-between">
        <h2 className="font-semibold">Choose a product:</h2>
        {[1, 2, 3, 4, 5].map((id) => (
          <ProductId
            currProductId={id}
            productId={productId}
            setProductId={setProductId}
          />
        ))}
      </section>

      <Products
        productId={productId}
        reviewSummary={reviewData?.summary || ''}
      />

      {reviewData?.reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
