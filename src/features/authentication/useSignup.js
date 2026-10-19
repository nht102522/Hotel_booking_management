import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupApi } from "../../services/apiAuth";

function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success("New user created successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isPending };
}

export default useSignup;
