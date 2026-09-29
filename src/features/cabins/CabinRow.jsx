import { formatCurrency } from "../../utils/helpers";

import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";

export const cabinRowClass =
  "grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-x-[2.4rem] border-t border-grey-100 px-[2.4rem] py-[1.4rem] transition-none";

export const cabinImageClass =
  "block aspect-[3/2] w-[6.4rem] -translate-x-[7px] scale-150 object-cover object-center";

export const cabinNameClass =
  "font-['Sono'] text-[1.6rem] font-semibold text-grey-600";

export const cabinPriceClass = "font-['Sono'] font-semibold";
export const cabinDiscountClass = "font-['Sono'] font-medium text-green-700";

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    id: cabinId,
  } = cabin;

  return (
    <>
      <div className={`${cabinRowClass}`}>
        <img className={`${cabinImageClass}`} src={image} />
        <div className={`${cabinNameClass}`}>{name}</div>
        <div>Fits up to {maxCapacity} guests</div>
        <div className={`${cabinPriceClass}`}>
          {formatCurrency(regularPrice)}
        </div>
        {discount ? (
          <div className={`${cabinDiscountClass}`}>
            {formatCurrency(discount)}
          </div>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <button
            className="bg-grey-500 hover:bg-grey-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={() => setShowForm((show) => !show)}
          >
            Edit
          </button>
          <button
            className="bg-grey-500 hover:bg-grey-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </div>
      </div>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
