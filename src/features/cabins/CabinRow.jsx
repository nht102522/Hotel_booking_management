import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

const TOAST_ID = "app-notification";

export const cabinRowClass =
  "grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-x-[2.4rem] border-t border-grey-100 px-[2.4rem] py-[1.4rem] transition-none";

export const cabinImageClass =
  "block aspect-[3/2] w-[6.4rem] -translate-x-[7px] scale-150 object-cover object-center";

export const cabinNameClass =
  "font-['Sono'] text-[1.6rem] font-semibold text-grey-600";

export const cabinPriceClass = "font-['Sono'] font-semibold";
export const cabinDiscountClass = "font-['Sono'] font-medium text-green-700";

function CabinRow({ cabin }) {
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    id: cabinId,
  } = cabin;
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabins,
    networkMode: "always",
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["cabins"] });

      const previousCabins = queryClient.getQueryData(["cabins"]);

      queryClient.setQueryData(["cabins"], (cabins = []) =>
        cabins.filter((cabin) => cabin.id !== id),
      );

      return { previousCabins };
    },
    onSuccess: () => {
      toast.success("Cabin successfully deleted", { id: TOAST_ID });
    },
    onError: (error, _id, context) => {
      queryClient.setQueryData(["cabins"], context?.previousCabins);
      toast.error(error.message, { id: TOAST_ID });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
  });
  return (
    <div className={`${cabinRowClass}`}>
      <img className={`${cabinImageClass}`} src={image} />
      <div className={`${cabinNameClass}`}>{name}</div>
      <div>Fits up to {maxCapacity} guests</div>
      <div className={`${cabinPriceClass}`}>{formatCurrency(regularPrice)}</div>
      <div className={`${cabinDiscountClass}`}>{formatCurrency(discount)}</div>
      <button
        className="bg-grey-500 hover:bg-grey-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        onClick={() => mutate(cabinId)}
        disabled={isDeleting}
      >
        Delete
      </button>
    </div>
  );
}

export default CabinRow;
