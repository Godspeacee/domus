import { getServerSession } from "next-auth";
import prisma from "@/prisma/clientfile";
import authOptions from "@/app/auth/authOptions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthoried" }, { status: 401 });
  }

  const updateUser = await prisma.user.update({
    where: { email: session.user.email },
    data: { role: "AGENT" },
  });
  return NextResponse.json(updateUser, { status: 200 });
}
