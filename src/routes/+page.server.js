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
  default: async ({ request }) => {
    // Create a route that accepts a list of attendees and inserts them into a new table
    const form = await request.formData();
    const attendees = form.get("attendees");
    const eventName = form.get("eventName");

    console.log(eventName +':\n' + attendees)

    // Create a new table with the event name
    const { error: createError } = await supabase.rpc("create_table", { table: eventName });

    if (createError) {
      return {
        status: 500,
        body: createError,
      };
    }

    // insert attendees into table
    const { data, error } = await supabase.from(eventName).insert(attendees);

    console.log(data, error)

    // redirect to a dynamic page with the eventName
    return {
      status: 302,
      headers: {
        location: `/+${eventName}`,
      },
    };

    // return {
    //   status: error ? 500 : 200,
    //   body: error ? error : data,
    // };
  },

// // Accept uploaded csv file and insert into a new table?
//   csv: async ({ request }) => {
//     const form = await request.formData();
//     const attendees = form.get("attendees");

//       console.log(file)

//       // TODO: Parse the table in the browser and insert into the table

//       // insert attendees into table
//       const { data, error } = await supabase.from(eventName).insert(attendees);

//       // const { data, error } = await supabase.from("attendees").insert(attendees);

//       return {
//         status: error ? 500 : 200,
//         body: error ? error : data,
//       };
//   }

};