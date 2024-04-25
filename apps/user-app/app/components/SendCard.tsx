"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";
import Loading from "./Loading";


export default function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const router=useRouter()
  const[loading,setLoading]=useState(false)

  const handler = async () => {
    try {
      setLoading(true)
      const res = await p2pTransfer(number, Number(amount) * 100);
      console.log("res",res)
      // If there's an error message in the response, set it as the error state
      if (res?.message) {
        setError(res.message);
      } else {
        // If no error message, clear any previous error
        setError("");
      }
    } catch (error) {
      // If there's an unexpected error, set a generic error message
      setError("An error occurred. Please try again later.");
    }
    finally{
      setLoading(false)
    }
    router.refresh()
  
   
  };
  if(loading){
    return (<Loading/>)
  }

  return (
   
    <div className="h-[90vh] flex justify-center items-center">
      <Center>
        <div className="w-[30vw]">
        <Card title="Send">
          <div className="m-w-72 pt-8">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => setNumber(value)}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => setAmount(value)}
            />
            <div className="pt-4 flex justify-center">
              <Button onClick={handler} >Send</Button>
            </div>
            {error && (
              <div className="text-red-500 text-center mt-4">
                {error === "Error while sending" && "Error while sending. Please try again."}
                {error === "User not found" && "User not found. Please enter a valid recipient."}
                {error === "Insufficient balance" && "Insufficient balance. Please top up your account."}
                
                {error !== "Error while sending" && error !== "User not found" && error !== "Insufficient balance" && error}
              </div>
            )}
          </div>
        </Card>
        </div>
      </Center>
    </div>
  );
}
