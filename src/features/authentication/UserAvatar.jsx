function UserAvatar({ avatar, name }) {
  return (
    <div className="flex items-center gap-[1.2rem] text-[1.4rem] font-medium text-grey-600">
      <img
        className="block aspect-square w-[3.6rem] rounded-full object-cover object-center outline-2 outline-grey-100"
        src={avatar}
        alt={`Avatar of ${name}`}
      />
      <span>{name}</span>
    </div>
  );
}

export default UserAvatar;
