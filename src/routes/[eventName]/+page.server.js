import { supabase } from "$lib/supabaseClient";
/** @type {import('./$types').PageData} */


export async function load({ route, url }) {
  let table = url.pathname.split('/')[1]
  console.log(table)
  const { data } = await supabase.from(table).select();
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
    let checkedIn = data.get("checkedIn");
    let table = data.get("table");

    if (checkedIn === "true") {
      checkedIn = "false";
    } else {
      checkedIn = "true";
    }

    console.log(id, checkedIn)

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