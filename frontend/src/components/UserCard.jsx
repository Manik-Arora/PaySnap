import { Button } from "./Button";

export function UserCard({ user, buttonRequired }) {
  return (
    <div className="flex justify-between ">
      <div className="flex items-center ">
        <div className="bg-slate-200 rounded-full w-10 h-10 flex justify-center items-center mt-1 mr-2">
          {user.firstName[0]}
        </div>
        <div className="font-semibold">
          {user.firstName} {user.lastName}
        </div>
      </div>
      {buttonRequired ? (
        <div>
          <Button label="Send Money" />
        </div>
      ) : null}
    </div>
  );
}
