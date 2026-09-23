import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

function StyledBookingDataBox(props) {
  return <section className="overflow-hidden rounded-[var(--border-radius-md)] border border-grey-100 bg-grey-0" {...props} />;
}

function Header(props) {
  return <header className="flex items-center justify-between bg-brand-500 px-[4rem] py-[2rem] text-[1.8rem] font-medium text-indigo-100 [&>div:first-child]:flex [&>div:first-child]:items-center [&>div:first-child]:gap-[1.6rem] [&>div:first-child]:text-[1.8rem] [&>div:first-child]:font-semibold [&_span]:ml-[4px] [&_span]:font-['Sono'] [&_span]:text-[2rem] [&_svg]:h-[3.2rem] [&_svg]:w-[3.2rem]" {...props} />;
}

function Section(props) {
  return <section className="px-[4rem] pb-[1.2rem] pt-[3.2rem]" {...props} />;
}

function Guest(props) {
  return <div className="mb-[1.6rem] flex items-center gap-[1.2rem] text-grey-500 [&_p:first-of-type]:font-medium [&_p:first-of-type]:text-grey-700" {...props} />;
}

function Price({ isPaid, ...props }) {
  return (
    <div
      className={`mt-[2.4rem] flex items-center justify-between rounded-[var(--border-radius-sm)] px-[3.2rem] py-[1.6rem] [&_p:last-child]:text-[1.4rem] [&_p:last-child]:font-semibold [&_p:last-child]:uppercase [&_svg]:h-[2.4rem] [&_svg]:w-[2.4rem] [&_svg]:text-current ${isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
      {...props}
    />
  );
}

function Footer(props) {
  return <footer className="px-[4rem] py-[1.6rem] text-right text-[1.2rem] text-grey-500" {...props} />;
}

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
