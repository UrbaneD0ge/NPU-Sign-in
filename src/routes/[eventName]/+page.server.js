import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("attendees").select();
  return {
    attendees: data ?? [],
  };
}

// Create a svelte action to flip 'checked_in' status
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    let checkedIn = data.get("checkedIn");

    if (checkedIn === "true") {
      checkedIn = "false";
    } else {
      checkedIn = "true";
    }

    console.log(id, checkedIn)

    const updateResult = await supabase
      .from("attendees")
      .update({ checked_in: checkedIn })
      .eq("id", id);

    return {
      status: updateResult.error ? 500 : 200,
      body: updateResult.error ? updateResult.error : updateResult.data,
    };
  }
};