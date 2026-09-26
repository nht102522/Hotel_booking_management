import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

const formRowClass =
  "grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] py-[1.2rem] first:pt-0 last:pb-0 not-last:border-b not-last:border-grey-100 has-[button]:flex has-[button]:justify-end has-[button]:gap-[1.2rem]";

function CreateCabinForm() {
  const { register, handleSubmit, reset } = useForm();
  function onSubmit(data) {
    console.log(data);
    reset();
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className={formRowClass}>
        <label className="font-medium" htmlFor="name">
          Cabin name
        </label>
        <Input type="text" id="name" {...register("name")} />
      </div>

      <div className={formRowClass}>
        <label className="font-medium" htmlFor="maxCapacity">
          Maximum capacity
        </label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </div>

      <div className={formRowClass}>
        <label className="font-medium" htmlFor="regularPrice">
          Regular price
        </label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </div>

      <div className={formRowClass}>
        <label className="font-medium" htmlFor="discount">
          Discount
        </label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </div>

      <div className={formRowClass}>
        <label className="font-medium" htmlFor="description">
          Description for website
        </label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </div>

      <div className={formRowClass}>
        <label className="font-medium" htmlFor="image">
          Cabin photo
        </label>
        <FileInput id="image" accept="image/*" />
      </div>

      <div className={formRowClass}>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
