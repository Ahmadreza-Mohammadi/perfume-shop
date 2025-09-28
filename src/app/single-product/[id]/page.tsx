import TopBar from "@/components/products/TopBar";
import { getSupabase } from "../../../lib/supabaseClient";
import Product from "@/components/single-product/Product";

async function page({ params }: { params: { id: string | number } }) {
  const { id } = params;

  async function getProduct(productId: string | number) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("products")
       .select(`
      *,
      product_variants (
        id,
        volume,
        price
      )
    `, { count: "exact" })
      .eq("id", productId)
      .limit(1);
    if (error) {
      console.error("Failed to fetch product", error);
      return null;
    }
    return Array.isArray(data) ? data[0] : data;
  }

  const product = await getProduct(id);

  return (
    <>
      <TopBar />
      <div className="mt-10">
        <Product id={id} product={product} />
      </div>
    </>
  );
}
export default page;
