import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function createAndEditCabin(newCabin, id) {
  let imageValue = newCabin.image;

  const hasExistingImageUrl =
    typeof imageValue === "string" && imageValue.startsWith(supabaseUrl);

  if (hasExistingImageUrl) {
    imageValue = imageValue;
  } else if (imageValue && imageValue.name) {
    const safeFileName = imageValue.name
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[:/\\?%*|"<>]/g, "-");

    const imageName = `${Date.now()}-${safeFileName}`;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, imageValue, { upsert: true });

    if (storageError) {
      console.log(storageError);
      throw new Error("Cabin image could not be uploaded");
    }

    imageValue = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  } else if (!id) {
    throw new Error("Please select a cabin image");
  }

  let query = supabase.from("cabins");

  if (id) {
    const { data, error } = await query
      .update({ ...newCabin, image: imageValue })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      throw new Error("Cabin could not be updated");
    }

    return data[0];
  }

  const { data, error } = await query
    .insert([{ ...newCabin, image: imageValue }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  return data[0];
}
export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
