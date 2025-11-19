import prisma from "@/prisma/clientfile";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {
  const { id } = params;
  const { status } = await req.json(); // "RENTED" or "AVAILABLE"

  const property = await prisma.property.update({
    where: { id },
    data: { status },
    include: { images: true },
  });

  return NextResponse.json(property);
}
