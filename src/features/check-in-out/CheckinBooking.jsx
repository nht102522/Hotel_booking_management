import { useState } from "react";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Checkbox from "../../ui/Checkbox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import useBooking from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

import { useMoveBack } from "../../hooks/useMoveBack";

const checkinBoxClass =
  "rounded-[var(--border-radius-md)] border border-grey-100 bg-grey-0 px-[4rem] py-[2.4rem]";

function CheckinBooking() {
  const [paymentConfirmation, setPaymentConfirmation] = useState(null);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { booking, isPending, error } = useBooking();

  const {
    settings,
    isLoading: isLoadingSettings,
    error: settingsError,
  } = useSettings();
  const { checkin, isCheckingIn } = useCheckin();

  if (isPending || isLoadingSettings) return <Spinner />;

  if (error || settingsError) {
    return (
      <p role="alert" className="text-[1.6rem] text-red-700">
        Could not load check-in information:{" "}
        {error?.message || settingsError?.message}
      </p>
    );
  }

  if (!booking) return <Empty resource="booking" />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;
  const confirmPaid = paymentConfirmation ?? isPaid ?? false;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <div className={checkinBoxClass}>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            disabled={isCheckingIn}
            onChange={() => {
              setAddBreakfast((current) => !current);
              setPaymentConfirmation(false);
            }}
          >
            Add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </div>
      )}

      <div className={checkinBoxClass}>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setPaymentConfirmation(true)}
        >
          I confirm that {guests.fullName} has paid{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice,
              )} (${formatCurrency(totalPrice)}  + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </Checkbox>
      </div>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button
          variation="secondary"
          onClick={moveBack}
          disabled={isCheckingIn}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
