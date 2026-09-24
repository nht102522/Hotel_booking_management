import { useQuery } from "@tanstack/react-query";
import { getCabins } from "./../../services/apiCabins";
import Spinner from "./../../ui/Spinner";
import CabinRow from "./CabinRow";

export const cabinTableClass =
  "overflow-hidden rounded-[7px] border border-grey-200 bg-grey-0 text-[1.4rem]";

export const cabinTableHeaderClass =
  "grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-x-[2.4rem] bg-grey-50 px-[2.4rem] py-[1.6rem] font-semibold uppercase tracking-[0.4px] text-grey-600";
function CabinTable() {
  const { data: cabins, isPending } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isPending) return <Spinner />;

  return (
    <div className={`${cabinTableClass}`}>
      <div className={`${cabinTableHeaderClass}`}>
        <div></div>
        <div>Cabin</div>
        <div>Cabacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </div>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinTable;
