import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("attendees").select();
  return {
    attendees: data ?? [],
  };
}