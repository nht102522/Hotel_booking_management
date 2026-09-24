import { formatCurrency } from "../../utils/helpers";
export const cabinRowClass =
  "grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-x-[2.4rem] px-[2.4rem] py-[1.4rem] not-last:border-b not-last:border-grey-100";

export const cabinImageClass =
  "block aspect-[3/2] w-[6.4rem] -translate-x-[7px] scale-150 object-cover object-center";

export const cabinNameClass =
  "font-['Sono'] text-[1.6rem] font-semibold text-grey-600";

export const cabinPriceClass = "font-['Sono'] font-semibold";
export const cabinDiscountClass = "font-['Sono'] font-medium text-green-700";

function CabinRow({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image } = cabin;
  return (
    <div className={`${cabinRowClass}`}>
      <img className={`${cabinImageClass}`} src={image} />
      <div className={`${cabinNameClass}`}>{name}</div>
      <div>Fits up to {maxCapacity} guests</div>
      <div className={`${cabinPriceClass}`}>{formatCurrency(regularPrice)}</div>
      <div className={`${cabinDiscountClass}`}>{formatCurrency(discount)}</div>
      <button className="bg-grey-500 hover:bg-grey-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
        Detele
      </button>
    </div>
  );
}

export default CabinRow;
