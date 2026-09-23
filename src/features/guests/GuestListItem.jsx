import { Flag } from 'ui/Flag';

function GuestListItem({ guest, onClick }) {
  return (
    <li
      className="grid cursor-pointer grid-cols-[2rem_2fr_1fr] items-center gap-[0.8rem] px-[1.6rem] py-[0.6rem] transition-colors not-last:border-b not-last:border-grey-100 hover:bg-grey-50"
      onClick={() => onClick(guest)}
      role='button'
    >
      <Flag src={guest.countryFlag} alt={`Flag of ${guest.nationality}`} />
      <div>{guest.fullName}</div>
      <div className="justify-self-end text-[1.2rem] text-grey-500">
        ID: {guest.nationalID}
      </div>
    </li>
  );
}

export default GuestListItem;
