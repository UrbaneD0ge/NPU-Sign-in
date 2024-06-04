import { supabase } from "$lib/supabaseClient.js";

export async function load() {
  // Get all tables
  const { data, error } = await supabase.rpc("get_tables");

  console.log(data)

  return {
    tables: data ?? [],
    error: error ?? null,
  };
}

export const actions = {
// Accept uploaded csv file and insert into a new table?
  default: async ({ request }) => {
    const form = await request.formData();
    const file = form.get("file");
    // upload csv file to storage
    const { error: uploadError } = await supabase.storage
      .from("csv")
      .upload(file, file);

    if (uploadError) {
      return {
        status: 500,
        body: uploadError,
      };
    }

      console.log(file)

      // TODO: Parse the table in the browser and insert into the table

      // insert attendees into table
      const { data, error } = await supabase.from(eventName).insert(attendees);

      // const { data, error } = await supabase.from("attendees").insert(attendees);

      return {
        status: error ? 500 : 200,
        body: error ? error : data,
      };
  }

};