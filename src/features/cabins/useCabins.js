import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const { data: cabins, isPending } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isPending, cabins };
}

export default useCabins;
