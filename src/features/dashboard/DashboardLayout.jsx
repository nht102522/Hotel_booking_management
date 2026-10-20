import Spinner from "../../ui/Spinner";
import useCabins from "../cabins/useCabins";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import TodayActivity from "../check-in-out/TodayActivity";
export const dashboardLayoutClass =
  "grid grid-cols-4 grid-rows-[auto_34rem_auto] gap-[2.4rem]";
function DashboardLayout() {
  const {
    bookings,
    isLoading: isLoadingBookings,
    error: bookingsError,
  } = useRecentBookings();

  const {
    confirmedStays,
    numDays,
    isLoading: isLoadingStays,
    error: staysError,
  } = useRecentStays();

  const { cabins, isPending: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) {
    return <Spinner />;
  }

  if (bookingsError || staysError) {
    return (
      <p role="alert" className="text-[1.6rem] text-red-700">
        Dashboard data could not be loaded.
      </p>
    );
  }

  return (
    <div className={dashboardLayoutClass}>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
    </div>
  );
}

export default DashboardLayout;
