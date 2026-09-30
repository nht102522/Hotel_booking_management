import useUser from "./useUser";

function UserAvatar() {
  const { user } = useUser();

  const fullName =
    user?.user_metadata?.fullName || user?.email?.split("@")[0] || "User";

  const avatar = user?.user_metadata?.avatar;
  return (
    <div className="flex items-center gap-[1.2rem] text-[1.4rem] font-medium text-grey-600">
      <img
        className="block aspect-square w-[3.6rem] rounded-full object-cover object-center outline-2 outline-grey-100"
        src={avatar || "/default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
