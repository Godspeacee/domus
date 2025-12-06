import prisma from "@/prisma/clientfile";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(req: Request, { params }: any) {
  const { id } = params;
  const { status } = await req.json(); // "RENTED" or "AVAILABLE"
  const session = await getServerSession(authOptions);

 
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    return NextResponse.json(
      { error: "Property not found" },
      { status: 404 }
    );
  }

 
  if (session?.user.id !== property.agentId) {
    return NextResponse.json(
      { error: "Not authorized" },
      { status: 403 }
    );
  }

  const updatedProperty = await prisma.property.update({
    where: { id },
    data: { status },
    include: { images: true },
  });

  return NextResponse.json(updatedProperty);
}
