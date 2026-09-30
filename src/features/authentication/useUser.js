import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const {
    isPending,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === "authenticated";

  return { isPending, error, user, isAuthenticated };
}

export default useUser;
