import { useState } from "react";
import { UserCard } from "./UserCard";

export function Users() {
  const [users, setUsers] = useState([
    {
      firstName: "Manik",
      lastName: "Arora",
      _id: 1,
    },
    {
      firstName: "Rahul",
      lastName: "Sharma",
      _id: 2,
    },
  ]);
  return (
    <div>
      <div className="font-bold text-lg mt-6">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users.."
          className="border border-slate-300 rounded px-2 py-1 w-full"
        />
      </div>
      <div className="flex flex-col space-y-2 pt-2">
        {users.map((user) => (
          <UserCard user={user} buttonRequired={true} />
        ))}
      </div>
    </div>
  );
}
