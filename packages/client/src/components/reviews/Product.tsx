import { Button } from '../ui/button';
import { HiSparkles } from 'react-icons/hi';
import SkeletonHolder from './SkeletonHolder';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProduct, summarizeResponse } from './reviewsAPI';
import type { Product, SummarizeResponse } from '../types';
import { useEffect } from 'react';

const choseProduct = ({
  productId,
  reviewSummary,
}: {
  productId: number;
  reviewSummary: string;
}) => {
  const summaryMutation = useMutation<SummarizeResponse>({
    mutationFn: () => summarizeResponse(productId),
  });
  const { data: productData, isLoading: isProductLoading } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
  });

  // Reset mutation state when productId changes
  useEffect(() => {
    summaryMutation.reset();
  }, [productId, summaryMutation.reset]);

  const summaryData = summaryMutation?.data?.summary || reviewSummary || '';
  return (
    <>
      <section className="p-4 flex flex-col border-[1px] rounded-lg border-black">
        <h2 className="text-xl font-bold my-1">Product Overview</h2>
        {isProductLoading ? (
          <SkeletonHolder />
        ) : (
          <>
            <div className="font-semibold flex justify-between">
              {productData?.name} <span>${productData?.price}</span>
            </div>
            <div>{productData?.description}</div>
          </>
        )}
      </section>
      <div className="my-5 flex flex-col">
        {summaryData ? (
          <section className="border p-4 rounded-lg border-black">
            <h2 className="text-xl font-bold ">AI Summary</h2>
            <p>{summaryData}</p>
          </section>
        ) : (
          <>{summaryMutation.isPending && <SkeletonHolder />}</>
        )}
        <Button
          onClick={() => summaryMutation.mutate()}
          disabled={summaryMutation.isPending}
          className="my-3 self-end"
        >
          <HiSparkles />
          Summarize
        </Button>
      </div>
    </>
  );
};

export default choseProduct;
