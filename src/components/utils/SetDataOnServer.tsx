import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { perfumes } from "../constants/ProductsData";
import { variants } from "../constants/variants";

// Load and validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Missing Supabase URL or Anon Key in .env.local");
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function SetDataOnServer() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInsert = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("product_variants").insert(variants);

      if (error) {
        console.error("❌ Error inserting perfumes:", error.message);
      } else {
        console.log("✅ Perfumes inserted:", data);
        setSuccess(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleInsert}
        disabled={loading || success} // Disable if uploading or already done
        style={{
          padding: "10px 20px",
          backgroundColor: success ? "green" : "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading || success ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Uploading..." : success ? "Uploaded ✅" : "Upload Perfumes"}
      </button>
    </div>
  );
}

export default SetDataOnServer;
