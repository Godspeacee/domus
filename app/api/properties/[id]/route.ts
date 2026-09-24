import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/clientfile";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const property = await prisma.property.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    return NextResponse.json(
      { error: "Property not found" },
      { status: 404 }
    );
  }

  await prisma.property.delete({
    where: { id },
  });

  return NextResponse.json({});
}