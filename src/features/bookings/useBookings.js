import { useQuery } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";

function useBookings() {
  const {
    isPending,
    data: bookingsResult,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  const bookings = bookingsResult?.data ?? [];
  const count = bookingsResult?.count ?? 0;

  return {
    isPending,
    error,
    bookings,
    count,
  };
}

export default useBookings;
