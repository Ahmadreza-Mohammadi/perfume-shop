export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Loading spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            در حال بارگذاری محصول...
          </h2>
          <p className="text-gray-600">لطفاً صبر کنید</p>
        </div>

        {/* Loading dots animation */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
