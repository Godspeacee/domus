import { NextResponse } from "next/server";
import prisma from "@/prisma/clientfile";
import axios from "axios";

export async function POST(req: Request) {
  const { reference } = await req.json();

  // Verify payment with Paystack
  const verifyResponse = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = verifyResponse.data.data;

  if (data.status !== "success") {
    return NextResponse.json({ error: "Payment not verified" }, { status: 400 });
  }

  // 🚀 SAVE PAYMENT IN DATABASE
  const payment = await prisma.payment.create({
    data: {
      reference: data.reference,
      amount: data.amount / 100, // convert kobo to naira
      email: data.customer.email,
      status: data.status,
      propertyId: data.metadata.propertyId, // 👈 THIS IS IMPORTANT
    },
  });

  return NextResponse.json({ message: "Payment saved", payment });
}
