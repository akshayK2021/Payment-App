"use server"


import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"


export async function p2pTransfer(to:string,amount:number){
  await new Promise(r=>setTimeout(r,2000))

  
  const session = await getServerSession(authOptions);
  const from=session?.user?.id;
  if(!from){
    return{
      message:"Error while sending"
    }
  }

  const toUser=await prisma.user.findFirst({
    where:{
      number:to
    }
  });

  if(!toUser){
    return{
      message:"User not found"
    }
  }
  const fromBalance=await prisma.balance.findUnique({
    where:{userId:Number(from)}
  });
  if(!fromBalance || fromBalance.amount<amount){
    return {
      message:"Insufficient balance"
    }
  }
 
  

  await prisma.$transaction(async(tx:any)=>{
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`;
   
    const fromBalance=await prisma.balance.findUnique({
      where:{userId:Number(from)}
    });
    if(!fromBalance || fromBalance.amount<amount){
      return {
        message:"Insufficient balance"
      }
    }
      await tx.balance.update({
        where:{userId:Number(from)},
        data:{amount:{decrement:amount}}
      });

      await tx.balance.upsert({
        where:{userId:toUser.id},
        update:{amount:{increment:amount}},
        create:{locked:0,amount:amount,userId:toUser.id}
      })
       
      await tx.p2pTransfer.create({
        data:{
          fromUserId:Number(from),
          toUserId:toUser.id,
          amount,
          timestamp:new Date()
        }
      })
  })

}