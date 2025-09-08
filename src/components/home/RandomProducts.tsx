import { getSupabase } from "../../lib/supabaseClient";
import ProductList from "../products/ProductsList";

export default async function RandomProducts() {
  const supabase = getSupabase();

  const {
    data: perfumes,
    error,
    count,
  } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .range(0, 11);

  if (error) {
    console.error(
      "❌ Error fetching products (RandomProducts):",
      error.message
    );
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-500 text-lg font-semibold mb-2">
            خطا در بارگذاری محصولات
          </div>
          <div className="text-gray-600 text-center">
            لطفاً دوباره تلاش کنید.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <ProductList initialPerfumes={perfumes || []} totalCount={count || 0} />
    </section>
  );
}
