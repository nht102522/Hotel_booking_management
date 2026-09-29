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
  const hasId = id !== undefined && id !== null;

  if (hasId && typeof id === "object") {
    throw new Error("Invalid cabin id");
  }

  const rawImage = newCabin.image;
  const imageFile =
    rawImage instanceof File
      ? rawImage
      : rawImage && rawImage[0] instanceof File
        ? rawImage[0]
        : null;

  let imageValue = typeof rawImage === "string" ? rawImage : imageFile;

  const hasExistingImageUrl =
    typeof imageValue === "string" && imageValue.startsWith(supabaseUrl);

  if (!hasExistingImageUrl && imageValue && imageValue.name) {
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
  } else if (!hasExistingImageUrl && !hasId) {
    throw new Error("Please select a cabin image");
  }

  const safeCabinData = {
    ...newCabin,
    maxCapacity: Number(newCabin.maxCapacity ?? 0),
    regularPrice: Number(newCabin.regularPrice ?? 0),
    discount: Number(newCabin.discount ?? 0),
    image: typeof rawImage === "string" ? rawImage : imageValue,
  };

  let query = supabase.from("cabins");

  if (hasId) {
    const { data, error } = await query
      .update(safeCabinData)
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      throw new Error("Cabin could not be updated");
    }

    return data[0];
  }

  const { data, error } = await query.insert([safeCabinData]).select();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  return data[0];
}
export async function deleteCabins(id) {
  if (
    (typeof id !== "number" && typeof id !== "string") ||
    String(id).trim() === ""
  ) {
    throw new Error("Invalid cabin id");
  }

  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
