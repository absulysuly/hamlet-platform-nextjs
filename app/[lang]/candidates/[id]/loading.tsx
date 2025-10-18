import Skeleton from '@/components/UI/Skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
          <div className="p-6 md:flex md:items-start md:space-x-8">
            <Skeleton className="mx-auto h-32 w-32 flex-shrink-0 rounded-full md:mx-0" />
            <div className="mt-4 flex-grow text-center md:mt-0 md:text-start">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="mt-2 h-5 w-1/2" />
              <Skeleton className="mt-1 h-5 w-1/3" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="mt-1 h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Skeleton className="h-8 w-1/3" />
          <div className="mt-6 space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
