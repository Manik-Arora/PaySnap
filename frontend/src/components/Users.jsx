import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import axios from "axios";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  // Need to add debouncing
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUsers(response.data.users));
  }, [filter]);

  return (
    <div>
      <div className="font-bold text-lg mt-6">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users.."
          className="border border-slate-300 rounded px-2 py-1 w-full"
        />
      </div>
      <div className="flex flex-col space-y-2 pt-2">
        {users.map((user) => (
          <UserCard key={user._id} user={user} buttonRequired={true} />
        ))}
      </div>
    </div>
  );
}
