import { supabase } from "$lib/supabaseClient.js";

export async function load() {
  // Get all tables
  const { data, error } = await supabase.rpc("get_tables");

  // console.log(data)

  return {
    tables: data ?? [],
    error: error ?? null,
  };
}

export const actions = {
  // Accept a pasted list of attendees and insert into a new table
  default: async ({ request }) => {
    // Create a route that accepts a list of attendees and inserts them into a new table
    const form = await request.formData();
    const attendees = form.get("attendees");
    const eventName = form.get("eventName");

    // console.log(eventName + ':\n' + attendees)

    // Create a new table with the event name
    const { data, error: createError } = await supabase.rpc("new_table", { eventname: eventName });

    if (createError) {
      console.log(createError)
      return {
        status: 500,
        body: createError,
        message: "Create error: " + createError,
      };
    }

    // return message from create table
    console.log(data)

    // insert attendees into table
    for (let i = 0; i < attendees.length; i++) {
      const { data, error } = await supabase.from(eventName).insert({ name: attendees[i] });

      if (error) {
        return {
          status: 500,
          body: error,
          message: 'Insert error: ' + error,
        };
      }

      console.log("Inserted: " + data)
    };


    console.log("data: " + data, "error: " + error)

    // redirect to a dynamic page with the eventName
    return {
      status: 302,
      headers: {
        location: `/+${eventName}`,
      },
    };
  },
};