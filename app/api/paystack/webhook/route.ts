import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/prisma/clientfile";

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY!;
  const rawBody = await req.text();
  const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  const signature = req.headers.get("x-paystack-signature");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const data = event.data;
    await prisma.payment.upsert({
      where: { reference: data.reference },
      update: { status: "success" },
      create: {
        reference: data.reference,
        amount: data.amount / 100,
        email: data.customer.email,
        propertyId: data.metadata.propertyId,
        status: "success",
      },
    });
  }

  return NextResponse.json({ received: true });
}
