import FilterSidebar from "@/components/filters/FilterSidebar";
import MobileFilterWrapper from "@/components/filters/MobileFilterWrapper";
import ProductsFooter from "@/components/products/ProductsFooter";
import ProductList from "@/components/products/ProductsList";
import TopBar from "@/components/products/TopBar";
import { getSupabase } from "@/lib/supabaseClient";

export default async function page({ searchParams }: any) {
  const { brand, gender, price, perfumeType } = searchParams;

  const supabase = getSupabase();
  let query = supabase.from("products").select(
    `
      *,
      product_variants (
        id,
        volume,
        price
      )
    `,
    { count: "exact" }
  );

  if (brand) {
    if (Array.isArray(brand)) {
      query = query.in("brand", brand);
    } else if (brand.includes(",")) {
      query = query.in("brand", brand.split(","));
    } else {
      query = query.eq("brand", brand);
    }
  }

  if (gender) {
    if (gender.includes(",")) {
      query = query.in("gender", gender.split(","));
    } else {
      query = query.eq("gender", gender);
    }
  }
  if (perfumeType) {
    if (Array.isArray(perfumeType)) {
      query = query.in("perfumeType", perfumeType);
    } else {
      query = query.eq("perfumeType", perfumeType);
    }
  }

  if (price) {
    const [min, max] = price.split("-").map(Number);
    if (!isNaN(min)) query = query.gte("price", min);
    if (!isNaN(max)) query = query.lte("price", max);
  }

  const { data: perfumes, error, count } = await query.range(0, 11);

  if (error) {
    console.error("❌ Error fetching products:", error.message);
    return (
      <div className="min-h-screen w-full">
        <TopBar />
        <main className="max-w-7xl mx-auto px-4 py-6 lg:flex lg:items-start lg:gap-6 pb-24">
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
        <ProductsFooter />
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
            filters={{ brand, gender, perfumeType, price }}
          />
        </section>
      </main>

      <ProductsFooter />
    </div>
  );
}
