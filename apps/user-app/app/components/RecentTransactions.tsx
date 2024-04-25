import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { Card } from "@repo/ui/card";

export default  async function RecentTransactions({trnx}: {
  trnx:{fromUser: {
      id: number;
      email: string | null;
      name: string | null;
      number: string;
      password: string;
  };
  amount: number;
  timestamp: Date;
  toUser: {
      id: number;
      email: string | null;
      name: string | null;
      number: string;
      password: string;
  };
}[]}){
  const session = await getServerSession(authOptions)
  const userid=Number(session?.user?.id)

  return (
    <div className="w-[40vw]  rounded-xl border-2 mt-9 h-[60vh] overflow-scroll">
<Card title="Recent Transactions">
  <div>
  {
    trnx.map((t)=>(
      <div className="flex flex-row justify-between items-start border-b pt-3 ">
    <div className="flex flex-col items-start ">
      <div className="text-black  font-bold">
        {userid===t.fromUser.id?t.toUser.name:t.fromUser.name}
      </div>
      <div className=" font-light text-sm font-serif text-violet-500">
      {userid===t.fromUser.id?"Send Money":"Received Money"}

      </div>

    </div>
    <div className="flex flex-col items-end">
      <div className={`pb-1 text-slate-950 font-bold ${userid===t.fromUser.id?'text-orange-600':'text-green-600'}`}> {userid===t.fromUser.id?'-':'+'} {t.amount/100} Rs/-</div>
      <div className="text-xs text-slate-500">{t.timestamp.toLocaleString()}</div>

    </div>
   </div>
    ))
  }
  
  </div>
   </Card>
   </div>
  );
}

