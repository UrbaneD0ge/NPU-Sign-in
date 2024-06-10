import { supabase } from "$lib/supabaseClient.js";
import { redirect } from "@sveltejs/kit";

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
  newTable: async ({ request }) => {
    // Create a route that accepts a list of attendees and inserts them into a new table
    const form = await request.formData();
    const attendees = form.get("attendees");
    const eventName = form.get("eventName");

    // Create a new table with the event name
    const { data, error: createError } = await supabase.rpc("create_new_table", { eventname: eventName });

      if (createError) {
        console.log(createError)
        return {
          status: 500,
          body: createError,
          message: "Create error: ", createError,
        };
      } else {

    // return message from create table
    console.log(data)

    // insert attendees into table
    const { data: insertData, error } = await supabase.from(eventName).insert(attendees.split(',').map(name => ({ names: name })));

    // console.log(attendees)

        if (error) {
          return {
            status: 500,
            body: error,
            message: 'Insert error: ' + JSON.stringify(error),
          };
        } else {
          console.log("Inserted: " + insertData)
          // return message from insert
          redirect(303, `/${eventName}`)
            }
      }
  },
  dropTable: async ({ request }) => {
    // Create a route that accepts a list of attendees and inserts them into a new table
    const form = await request.formData();
    const eventName = form.get("eventName");

    // Create a new table with the event name
    const { data: dropData, error: dropError } = await supabase.rpc("drop_table", { eventname: eventName });

    if (dropError) {
      console.log(dropError)
      return {
        status: 500,
        body: dropError,
        message: "Drop error: ", dropError,
      };
    } else {
      console.log(dropData)
    }
  }
};