import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-80 text-center justify-center p-2 h-max px-4">
        <Heading label="Sign Up" />
        <SubHeading label="Enter your information to create an account" />
        <InputBox
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          placeholder="John"
        />
        <InputBox
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          placeholder="Doe"
        />
        <InputBox
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="abc@gmail.com"
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="12345"
        />
        <div className="pt-4">
          <Button
            label="Sign Up"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  email,
                  firstName,
                  lastName,
                  password,
                },
              );
              localStorage.setItem("token", response.data.token);
            }}
          />
        </div>
        <BottomWarning
          label="Already have an account?"
          buttonText={"Sign In"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}
