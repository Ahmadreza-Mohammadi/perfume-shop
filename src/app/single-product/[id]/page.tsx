import { getSupabase } from "../../../../lib/supabaseClient";

function page({params}: {params: {id: string | number}}) {
  const {id} = params;
async function getProduct(id: string | number) {
  const supabase = getSupabase();
  const {data, error} = await supabase.from("products").select("*").eq("id", id);
  console.log(data);
  return data;
}
getProduct(id)
  return <>
    <div>
      <h1>Single Product</h1>
      <p>{id}</p>
    </div>
  </>;
}

export default page;
