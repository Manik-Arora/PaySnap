import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export function SendMoney() {
  const friend = {
    firstName: "Alex",
    lastName: "Joanes",
    _id: 3,
  };
  return (
    <div className="bg-slate-50 h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-md shadow-slate-300 w-96 p-8">
        <div>
          <h2 className="font-bold text-4xl text-center mb-10">Send Money</h2>
        </div>
        <div className="flex items-center pt-3">
          <div className="bg-green-500 rounded-full h-10 w-10 flex justify-center items-center text-white text-xl mr-4">
            {friend["firstName"][0]}
          </div>
          <div className="text-2xl font-semibold">
            {friend["firstName"]} {friend["lastName"]}
          </div>
        </div>
        <div className="font-medium mt-3">Amount (in Rs)</div>
        <InputBox placeholder="Enter amount" />
        <div className="mt-5">
          <Button label="Initiate transfer" color="green" />
        </div>
      </div>
    </div>
  );
}
