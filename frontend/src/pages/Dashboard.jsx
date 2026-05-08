import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard() {
  return (
    <div className="px-5 space-y-5">
      <Appbar name="Manik Arora" />
      <Balance value="4000" />
      <Users />
    </div>
  );
}
