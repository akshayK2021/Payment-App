import RecentTransactions from "../../components/RecentTransactions";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

const alltransactions=async()=>{
  const session=await getServerSession(authOptions)
  const transactions=await prisma.p2pTransfer.findMany({
    where:{
      OR:[
     { fromUserId:Number(session?.user?.id)},
     { toUserId:Number(session?.user?.id)}
      ]
    },
    select:{
      fromUser:true,
      timestamp:true,
      toUser:true,
      amount:true
    }

  })
  transactions.sort((a:any, b:any) => {
    if (a.timestamp > b.timestamp) return -1;
    if (a.timestamp < b.timestamp) return 1;
    return 0;
  });
  
return transactions

}
export default async function page() {
  const trnx=await alltransactions();
  console.log("trnx",trnx)
  return (
    <div className="w-[80%]">
    <div className="w-full flex justify-center  ">
      <RecentTransactions trnx={trnx}/>

    </div>
    </div>
  );
}