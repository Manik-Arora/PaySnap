import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useState } from "react";

export function SendMoney() {
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

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
            {name[0].toUpperCase()}
          </div>
          <div className="text-2xl font-semibold">{name}</div>
        </div>
        <div className="font-medium mt-3">Amount (in Rs)</div>
        <InputBox
          onChange={(e) => setAmount(e.target.value())}
          placeholder="Enter amount"
        />
        <div className="mt-5">
          <Button
            onClick={() => {
              axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: id,
                  amount,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                },
              );
            }}
            label="Initiate transfer"
            color="green"
          />
        </div>
      </div>
    </div>
  );
}
