import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin Name" error={errors.name}>
        {" "}
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity}>
        <input
          type="number"
          id="maxCapacity"
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
          {...register("image", { required: "Please choose a cabin photo" })}
        />
      </FormRow>

      <div className="flex justify-end gap-[1.2rem] pt-[1.2rem]">
        <Button variation="secondary" type="reset">
          Cancel
        </Button>

        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Add cabin"}
        </Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
