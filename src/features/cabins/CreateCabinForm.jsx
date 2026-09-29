import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  //-----
  const { isCreating, createCabin } = useCreateCabin();

  //-----
  //-----
  const { isEditing, editCabin } = useEditCabin();
  //--------
  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  function handleNumberInputWheel(event) {
    event.currentTarget.blur();
  }

  function onSubmit(data) {
    const rawImage = data.image;
    const image =
      typeof rawImage === "string"
        ? rawImage
        : rawImage instanceof File
          ? rawImage
          : (rawImage?.[0] ?? cabinToEdit.image);

    const normalizedData = {
      ...data,
      maxCapacity: Number(data.maxCapacity ?? 0),
      regularPrice: Number(data.regularPrice ?? 0),
      discount: Number(data.discount ?? 0),
    };

    if (isEditSession) {
      editCabin(
        {
          newCabinData: {
            ...normalizedData,
            image: image ?? cabinToEdit.image,
          },
          id: editId,
        },
        { onSuccess: (data) => reset() },
      );
      return;
    }

    if (!image) {
      toast.error("Please choose a cabin photo");
      return;
    }

    createCabin({ ...normalizedData, image }, { onSuccess: (data) => reset() });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin Name" error={errors.name}>
        {" "}
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity}>
        <input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          onWheel={handleNumberInputWheel}
          className="rounded-md border border-grey-200 px-3 py-2"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice}>
        <input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          onWheel={handleNumberInputWheel}
          className="rounded-md border border-grey-200 px-3 py-2"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount}>
        <input
          type="number"
          id="discount"
          disabled={isWorking}
          onWheel={handleNumberInputWheel}
          defaultValue={0}
          className="rounded-md border border-grey-200 px-3 py-2"
          {...register("discount", {
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors.description}>
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Please choose a cabin photo",
          })}
        />
      </FormRow>

      <div className="flex justify-end gap-[1.2rem] pt-[1.2rem]">
        <Button variation="secondary" type="reset">
          Cancel
        </Button>

        <Button type="submit" disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
