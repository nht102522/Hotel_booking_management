
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  const page = Number(searchParams.get("page")) || 1;

  const {
    isPending,
    data: bookingsResult,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const bookings = bookingsResult?.data ?? [];
  const count = bookingsResult?.count ?? 0;
  const pageCount = Math.ceil(count / PAGE_SIZE);

if (page < pageCount) {
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page + 1],
    queryFn: () =>
      getBookings({ filter, sortBy, page: page + 1 }),
  });
}

if (page > 1) {
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page - 1],
    queryFn: () =>
      getBookings({ filter, sortBy, page: page - 1 }),
  });
}


  return { isPending, error, bookings, count };
}

export default useBookings;
