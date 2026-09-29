import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";

const cabinImageClass =
  "block aspect-[3/2] w-[6.4rem] -translate-x-[7px] scale-150 object-cover object-center";

const cabinNameClass =
  "font-['Sono'] text-[1.6rem] font-semibold text-grey-600";

const cabinPriceClass = "font-['Sono'] font-semibold";

const cabinDiscountClass = "font-['Sono'] font-medium text-green-700";

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  return (
    <Table.Row>
      <img className={cabinImageClass} src={image} alt={`Cabin ${name}`} />

      <div className={cabinNameClass}>{name}</div>

      <div>Fits up to {maxCapacity} guests</div>

      <div className={cabinPriceClass}>{formatCurrency(regularPrice)}</div>

      {discount ? (
        <div className={cabinDiscountClass}>{formatCurrency(discount)}</div>
      ) : (
        <span>&mdash;</span>
      )}

      <div className="flex gap-[0.8rem]">
        <Modal>
          <Modal.Open opens="edit">
            <button
              type="button"
              className="rounded-lg bg-grey-500 px-4 py-2 font-medium text-white transition-colors hover:bg-grey-700"
            >
              Edit
            </button>
          </Modal.Open>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>

        <button
          type="button"
          className="rounded-lg bg-grey-500 px-4 py-2 font-medium text-white transition-colors hover:bg-grey-700 disabled:cursor-not-allowed"
          onClick={() => deleteCabin(cabinId)}
          disabled={isDeleting}
        >
          Delete
        </button>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
