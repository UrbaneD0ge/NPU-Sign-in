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
  // Accept a pasted list of attendees and insert into a new table
  pasted: async ({ request }) => {
    // Create a route that accepts a list of attendees and inserts them into a new table

    // Get the list of attendees from the request
    const { attendees, eventName } = await request.json();

    // Create a new table with the event name
    const { error: createError } = await supabase.rpc("create_table", { name: eventName });

    if (createError) {
      return {
        status: 500,
        body: createError,
      };
    }

    // insert attendees into table
    const { data, error } = await supabase.from(eventName).insert(attendees);

    // redirect to a dynamic page with the table name


    return {
      status: error ? 500 : 200,
      body: error ? error : data,
    };
  },

// Accept uploaded csv file and insert into a new table?
  csv: async ({ request }) => {
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