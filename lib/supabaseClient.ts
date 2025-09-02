// lib/supabaseClient.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const STORAGE_KEY = "sb:perfume-shop:auth";
const PREF_KEY = "auth:storage"; // "local" | "session"

let client: SupabaseClient | null = null;
let lastPref: "local" | "session" | null = null;

function resolveStorage() {
  if (typeof window === "undefined") return undefined as any;
  const pref =
    (window.localStorage.getItem(PREF_KEY) as "local" | "session") || "local";
  lastPref = pref;
  return pref === "session" ? window.sessionStorage : window.localStorage;
}

export function getSupabase(): SupabaseClient {
  if (typeof window !== "undefined" && client && lastPref) {
    const currentPref =
      (window.localStorage.getItem(PREF_KEY) as "local" | "session") || "local";
    if (currentPref !== lastPref) {
      client = null;
    }
  }

  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: typeof window !== "undefined" ? resolveStorage() : undefined,
        storageKey: STORAGE_KEY,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return client;
}
