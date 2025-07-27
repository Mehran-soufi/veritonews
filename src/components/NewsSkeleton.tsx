
export default function NewsSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4 animate-pulse">
      {/* Skeleton for Title */}
      <div className="h-8 bg-gray-200 rounded w-1/3 mt-4"></div>

      {/* Skeleton for NewsDate (if applicable within News component's current structure) */}
      <div className="h-6 bg-gray-200 rounded w-1/6 mt-2"></div>

      {/* Skeleton for NewsItem carousel structure */}
      <div className="flex overflow-hidden space-x-4 h-[50vh] pt-4"> {/* Simulating Swiper area */}
        {[...Array(3)].map((_, i) => ( // Show 3 skeleton cards
          <div key={i} className="flex-shrink-0 w-1/3 bg-gray-100 rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="w-full h-9/12 bg-gray-300"></div> {/* Image skeleton */}
            <div className="p-2 flex flex-col gap-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div> {/* Title line 1 */}
              <div className="h-4 bg-gray-300 rounded w-5/6"></div> {/* Title line 2 */}
              <div className="h-3 bg-gray-300 rounded w-1/2 mt-2"></div> {/* Date/Country */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}