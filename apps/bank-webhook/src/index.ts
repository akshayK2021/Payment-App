import express from 'express';
import prisma from '@repo/db/client'

const app=express();
app.use(express.json())

app.post("/hdfcWebhook",async(req,res)=>{

  const paymentInformation={
    token:req.body.token,
    userId:req.body.user_identifier,
    amount:req.body.amount
  };

  try{
    await prisma.$transaction([
      prisma.balance.updateMany({
        where:{
          userId:Number(paymentInformation.userId)
        },
        data:{
          amount:{
            increment:Number(paymentInformation.amount)
          }
        }
      }),
      prisma.onRampTransaction.updateMany({
        where:{
          token:paymentInformation.token
        },
        data:{
          status:"Success"
        }
      })
    ])

    res.json({
      message:"Captured"
    })
  }
  catch(e){
    console.error(e);

    res.status(411).json({
      message:"Error while processing the webhook"
    })

  }
 

})

app.listen(3003);