import { Link } from "react-router-dom";

import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import CheckoutButton from "./CheckoutButton";
export const todayItemClass =
  "grid grid-cols-[9rem_2rem_1fr_7rem_9rem] items-center gap-[1.2rem] border-b border-grey-100 py-[0.8rem] text-[1.4rem] first:border-t";

export const todayGuestClass = "font-medium";
function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <li className={todayItemClass}>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      {guests.countryFlag ? (
        <Flag src={guests.countryFlag} alt={`Flag of ${guests.nationality}`} />
      ) : (
        <span aria-hidden="true" />
      )}

      <div className={todayGuestClass}>{guests.fullName}</div>

      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}

      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </li>
  );
}

export default TodayItem;
