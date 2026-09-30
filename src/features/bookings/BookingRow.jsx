import { format, isToday } from "date-fns";
import { HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import useDeleteBooking from "./useDeleteBooking";

function BookingRow({
  booking: {
    id: bookingId,

    startDate,
    endDate,
    numNights,

    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <div className="font-['Sono'] text-[1.6rem] font-semibold text-grey-600">
        {cabinName}
      </div>

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

      <div className="font-['Sono'] font-medium">
        {formatCurrency(totalPrice)}
      </div>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => deleteBooking(bookingId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
