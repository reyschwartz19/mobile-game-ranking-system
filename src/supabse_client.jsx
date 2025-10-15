import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANONKEY;

if(!supabaseKey || !supabaseUrl){
    console.error('Supabase env vars missing or undefined', { supabaseUrl, supabaseKey });
}

export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '');