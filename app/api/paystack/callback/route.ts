import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/prisma/clientfile";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const reference = url.searchParams.get("reference");

  if (!reference)
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });

  try {
    // verify payment with Paystack
    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = verifyRes.data.data;

    if (paymentData.status === "success") {
      // Example: Save payment to your DB
      await prisma.payment.create({
        data: {
          reference: paymentData.reference,
          amount: paymentData.amount / 100,
          email: paymentData.customer.email,
          propertyId: paymentData.metadata.propertyId,
          status: "success",
        },
      });

      // redirect to success page
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/booking-success`
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/booking-failed`
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
