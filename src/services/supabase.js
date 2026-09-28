import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseUrl = "https://mloumdwlagrikigbhehr.supabase.co";
const supabase = createClient(
  "https://mloumdwlagrikigbhehr.supabase.co",
  "sb_publishable_uagsbJpwsP4brPeOrQ4mAQ_DGTyJFQ5",
);
export default supabase;
