import Skeleton from '@/components/UI/Skeleton';

const CandidateCardSkeleton = () => (
  <div className="flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <Skeleton className="h-16 w-16 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  </div>
);

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-1/3" />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </aside>
        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-3">
          {[...Array(12)].map((_, i) => (
            <CandidateCardSkeleton key={i} />
          ))}
        </main>
      </div>
    </div>
  );
}
