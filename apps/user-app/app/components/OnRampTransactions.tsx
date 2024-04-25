import { Card } from "@repo/ui/card";

export const OnRampTransaction = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2 ">
        {transactions.map((t) => (
          <div className="flex justify-between pt-3 border-b border-slate-200 ">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col items-end ">
            <div className="flex flex-col justify-center text-sm">
              + Rs {t.amount / 100}
            </div>
            <div className=" text-slate-400 text-xs">{t.status}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
