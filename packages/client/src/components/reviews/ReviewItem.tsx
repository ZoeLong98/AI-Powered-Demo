import StarRating from './StarRating';
import { useInView } from './useInView';
import type { Review } from '../types';

type ReviewItemProps = {
  review: Review;
};

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <div
      key={review.id}
      ref={ref}
      className={`mb-4 m-2 pb-4 border-b-[2px] border-gray-200 
        transform transition-all duration-700 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="font-semibold font-sans">{review.author}</div>
      <StarRating value={Number(review.rating)} />
      <p>{review.content}</p>
    </div>
  );
};

export default ReviewItem;
