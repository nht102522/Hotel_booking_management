import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useCreateCabin from "./useCreateCabin";
import useDeleteCabin from "./useDeleteCabin";

const cabinImageClass =
  "block aspect-[3/2] w-[6.4rem] -translate-x-[7px] scale-150 object-cover object-center";

const cabinNameClass =
  "font-['Sono'] text-[1.6rem] font-semibold text-grey-600";

const cabinPriceClass = "font-['Sono'] font-semibold";

const cabinDiscountClass = "font-['Sono'] font-medium text-green-700";

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

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

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
