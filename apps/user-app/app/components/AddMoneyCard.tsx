"use client"

import { Button } from "@repo/ui/button"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/text-input"
import { Card } from "@repo/ui/card"
import { useState } from "react"
import { createOnRampTransaction } from "../lib/actions/createOnrampTransaction"


const SUPPORTED_BANKS=[{
  name:"HDFC Bank",
  redirectedUrl:"https://netbanking.hdfcbank.com"
},{
  name:"Axis Bank",
  redirectedUrl:"https://www.axisbank.com/"
}];


export const AddMoney=()=>{
  const [redirectedUrl,setRedirectedUrl]=useState(SUPPORTED_BANKS[0]?.redirectedUrl || "")
  const [provider,setProvider]=useState(SUPPORTED_BANKS[0]?.name || "")
  const [value,setValue]=useState(0)

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val:any)=>{
            setValue(Number(val))
        }}/>
        <div className="py-4 text-left">
          Bank
        </div>
        <Select onSelect={(value:any)=>{
          setRedirectedUrl(SUPPORTED_BANKS.find(x=>x.name===value)?.redirectedUrl || "")
          setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
        }} options={SUPPORTED_BANKS.map((x:any)=>({
          key:x.name,
          value:x.name
        }))}/>
        <div className="flex justify-center pt-4">
          <Button onClick={async()=>{
            await createOnRampTransaction(provider,value)
            window.location.href=redirectedUrl || ""
          }}>Add Money</Button>
        </div>
      </div>

    </Card>
  )
}