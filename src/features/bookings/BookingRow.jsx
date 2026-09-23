import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <div className="font-['Sono'] text-[1.6rem] font-semibold text-grey-600">{cabinName}</div>

      <div className="flex flex-col gap-[0.2rem] [&_span:first-child]:font-medium [&_span:last-child]:text-[1.2rem] [&_span:last-child]:text-grey-500">
        <span>{guestName}</span>
        <span>{email}</span>
      </div>

      <div className="flex flex-col gap-[0.2rem] [&_span:first-child]:font-medium [&_span:last-child]:text-[1.2rem] [&_span:last-child]:text-grey-500">
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <div className="font-['Sono'] font-medium">{formatCurrency(totalPrice)}</div>
    </Table.Row>
  );
}

export default BookingRow;
