import { supabase } from "$lib/supabaseClient";
/** @type {import('./$types').PageData} */


export async function load({ route, url }) {
  let table = url.pathname.split('/')[1]
  // console.log(table)
  const { data } = await supabase.from(table).select().order('names', {ascending: true});
  return {
    table: table,
    attendees: data ?? [],
  };
}

// Create a svelte action to flip 'checked_in' status
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const table = data.get("table");
    let checkedIn = data.get("checkedIn");

    // flip the checkedIn status
    checkedIn = checkedIn === "true" ? "false" : "true";
        
    console.log(checkedIn)

    const updateResult = await supabase
      .from(table)
      .update({ checked_in: checkedIn })
      .eq("id", id);

    return {
      status: updateResult.error ? 500 : 200,
      body: updateResult.error ? updateResult.error : updateResult.data,
    };
  }
};