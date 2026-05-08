import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signup() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-80 text-center justify-center p-2 h-max px-4">
        <Heading label="Sign Up" />
        <SubHeading label="Enter your information to create an account" />
        <InputBox label="First Name" placeholder="John" />
        <InputBox label="Last Name" placeholder="Doe" />
        <InputBox label="Email" placeholder="abc@gmail.com" />
        <InputBox label="Password" placeholder="12345" />
        <div className="pt-4">
          <Button label="Sign Up" />
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
