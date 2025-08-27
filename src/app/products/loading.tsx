export default function Loading() {
  return (
    <div className="min-h-screen w-full">
      {/* TopBar Skeleton */}
      <div className="w-full sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 sm:gap-4">
          <div className="h-6 w-24 bg-gray-300 rounded animate-pulse" />
          <div className="flex-1" />
          <div className="flex items-center gap-2 sm:gap-3 w-full max-w-md">
            <div className="h-10 flex-1 bg-gray-300 rounded-xl animate-pulse" />
            <div className="h-10 w-20 bg-gray-300 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 lg:flex lg:items-start lg:gap-6 pb-24">
        {/* FilterSidebar Skeleton */}
        <div className="hidden lg:block w-64">
          <div className="h-8 w-32 bg-gray-300 rounded animate-pulse mb-4" />
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
                  <div className="space-y-1">
                    {Array(3)
                      .fill(0)
                      .map((_, j) => (
                        <div
                          key={j}
                          className="h-3 w-16 bg-gray-300 rounded animate-pulse"
                        />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <section className="w-full lg:flex-1">
          {/* Mobile Filter Button Skeleton */}
          <div className="lg:hidden w-full h-12 bg-gray-300 rounded-2xl animate-pulse mb-3" />

          {/* Products Grid Skeleton - Show first 12 products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="group bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col relative"
                >
                  {/* Image Skeleton */}
                  <div className="w-full h-64 relative bg-gray-300 animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-400 rounded-full animate-pulse" />
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow gap-4">
                    <div className="flex flex-col gap-3">
                      {/* Title and Brand Skeleton */}
                      <div className="text-center">
                        <div className="h-5 w-32 bg-gray-300 rounded animate-pulse mx-auto mb-1" />
                        <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mx-auto" />
                      </div>

                      {/* Tags Skeleton */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse" />
                        <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse" />
                      </div>

                      {/* Gender and Availability Skeleton */}
                      <div className="flex justify-center gap-2">
                        <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse" />
                        <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse" />
                      </div>
                    </div>

                    {/* Price and Button Skeleton */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex flex-col">
                        <div className="h-5 w-20 bg-gray-300 rounded animate-pulse" />
                        <div className="h-4 w-12 bg-gray-300 rounded animate-pulse mt-1" />
                      </div>
                      <div className="h-10 w-24 bg-gray-300 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Load More Button Skeleton */}
          <div className="flex justify-center items-center mt-8">
            <div className="h-12 w-32 bg-gray-300 rounded-full animate-pulse" />
          </div>
        </section>
      </main>
    </div>
  );
}
