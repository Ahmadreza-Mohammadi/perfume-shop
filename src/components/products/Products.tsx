import { supabase } from "../../../lib/supabaseClient";
import ProductList from "./ProductsList";
import TopBar from "./TopBar";
import FilterSidebar from "./FilterSidebar";
import Footer from "./ProductsFooter";
import MobileFilterWrapper from "./MobileFilterWrapper";

export default async function Products() {
  // اولین ۱۲ محصول + گرفتن تعداد کل
  const {
    data: perfumes,
    error,
    count,
  } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .range(0, 11);

  if (error) {
    console.error("❌ Error fetching products:", error.message);
    return (
      <div className="min-h-screen w-full">
        <TopBar />
        <main className="max-w-7xl mx-auto px-4 py-6 lg:flex lg:items-start lg:gap-6 pb-24">
          <FilterSidebar />
          <section className="w-full lg:flex-1">
            <MobileFilterWrapper />
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-red-500 text-xl font-semibold mb-4">
                خطا در بارگذاری محصولات
              </div>
              <div className="text-gray-600 text-center">
                متأسفانه مشکلی در بارگذاری محصولات پیش آمده است.
                <br />
                لطفاً دوباره تلاش کنید.
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <TopBar />

      <main className="max-w-7xl mx-auto px-4 py-6 lg:flex lg:items-start lg:gap-6 pb-24">
        <FilterSidebar />

        <section className="w-full lg:flex-1">
          <MobileFilterWrapper />

          <ProductList
            initialPerfumes={perfumes || []}
            totalCount={count || 0}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
