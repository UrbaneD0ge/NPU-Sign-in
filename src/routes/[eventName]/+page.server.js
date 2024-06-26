import { supabase } from "$lib/supabaseClient";
/** @type {import('./$types').PageData} */


export async function load({ url }) {
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
  add_attendee: async ({ request }) => {
    const data = await request.formData();
    const table = data.get("table");
    const name = data.get("name");

    console.log('add',table, name)

    const { data: insertData, error: insertError } = await supabase.from(table).insert({ names: name });

    return {
      status: insertError ? 500 : 200,
      body: insertError ? insertError : insertData,
      message: insertError ? "Insert error: " + JSON.stringify(insertError) : "Inserted: " + name,
    };
  },
  checkIn: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const table = data.get("table");
    let checkedIn = data.get("checkedIn");

    checkedIn = checkedIn === "true" ? false : true;

    // console.log(checkedIn)
    console.log(id, table, checkedIn)

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