import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import useBooking from "../bookings/useBooking";

import { useMoveBack } from "../../hooks/useMoveBack";

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isPending, error } = useBooking();

  if (isPending) return <Spinner />;

  if (error) {
    return (
      <p role="alert" className="text-[1.6rem] text-red-700">
        Could not load booking: {error.message}
      </p>
    );
  }

  if (!booking) return <Empty resource="booking" />;

  const { id: bookingId } = booking;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button disabled>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
