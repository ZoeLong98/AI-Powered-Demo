const ProductId = ({
  currProductId,
  productId,
  setProductId,
}: {
  currProductId: number;
  productId: number;
  setProductId: (id: number) => void;
}) => {
  return (
    <div
      className={` w-8 h-8 text-white flex justify-center items-center transition-all duration-400 ease-in-out transform origin-center hover:rounded-2xl ${
        productId === currProductId
          ? 'rounded-2xl bg-pink-300'
          : 'rounded-lg bg-gray-400'
      }`}
      onClick={() => setProductId(currProductId)}
    >
      {currProductId}
    </div>
  );
};

export default ProductId;
