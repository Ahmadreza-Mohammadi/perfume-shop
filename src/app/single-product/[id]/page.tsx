import TopBar from "@/components/products/TopBar";
import { getSupabase } from "../../../../lib/supabaseClient";

function page({ params }: { params: { id: string | number } }) {
  const { id } = params;
  async function getProduct(id: string | number) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id);
    console.log(data);
    return data;
  }
  getProduct(id);
  return (
    <>
      <TopBar />
      <div className="m-auto max-w-[1440px] min-h-screen">
      
      </div>
    </>
  );
}
export default page;
