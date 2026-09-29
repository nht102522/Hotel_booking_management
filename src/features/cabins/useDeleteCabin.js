import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabins as deleteCabinApi } from "../../services/apiCabins";
const TOAST_ID = "app-notification";

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
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
  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
