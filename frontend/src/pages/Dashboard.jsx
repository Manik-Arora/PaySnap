import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";

export function Dashboard() {
  return (
    <div>
      <Appbar name="Manik Arora" />
      <Balance value="4000" />
    </div>
  );
}
