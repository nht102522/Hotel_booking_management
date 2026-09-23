import { useGuests } from 'features/guests/useGuests';
import Pagination from 'ui/Pagination';
import Spinner from 'ui/Spinner';
import GuestListItem from './GuestListItem';

function GuestList({ onClick }) {
  const { isLoading, guests, count } = useGuests();

  if (isLoading) return <Spinner />;
  if (count === undefined) return null;
  if (count === 0) return <p>No guests found...</p>;

  return (
    <div className="-translate-y-[4px] overflow-hidden rounded-b-[var(--border-radius-md)] border border-t-0 border-grey-200 pt-[0.8rem]">
      <ul>
        {guests.map((guest) => (
          <GuestListItem
            key={guest.id}
            guest={guest}
            // For case where GuestList was used without the onClick function
            onClick={onClick ? onClick : () => {}}
          />
        ))}
      </ul>

      <div className="flex justify-center border-t border-grey-100 bg-grey-50 p-[0.8rem] empty:hidden">
        <Pagination count={count} />
      </div>
    </div>
  );
}

export default GuestList;
