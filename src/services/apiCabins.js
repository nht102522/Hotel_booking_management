import superbase from "./superbase";
export async function getCabins() {
  const { data, error } = await superbase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function createCabin(newCabin) {
  const { data, error } = await superbase.from("cabins").insert([newCabin]);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }
  return data;
}
export async function deleteCabins(id) {
  const { data, error } = await superbase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
