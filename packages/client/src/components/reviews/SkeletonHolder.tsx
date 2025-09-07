import Skeleton from 'react-loading-skeleton';

interface SkeletonHolderProps {
  key?: string;
}

const SkeletonHolder = ({ key }: SkeletonHolderProps) => {
  return (
    <div key={key}>
      <Skeleton width={150} />
      <Skeleton width={100} />
      <Skeleton count={2} />
    </div>
  );
};

export default SkeletonHolder;
