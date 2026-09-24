import prisma from "@/prisma/clientfile";
import { NextRequest, NextResponse } from "next/server";
import { createPropertySchema } from "../../vallidationSchma";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { Prisma, PropertyCategory } from "@/app/generated/prisma";





export async function POST(request:NextRequest){
    try {
       const session = await getServerSession(authOptions)
       if (!session || !session.user) {
        return NextResponse.json({error: "Unauthoried"}, {status:401})
       }
           const body = await request.json()
    const validation = createPropertySchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(),{status:400})
    const newProperty = await prisma.property.create({
        data: {title:body.title,
            description:body.description,
            price:body.price,
            address:body.address,
            images:{create: body.images.map((url:string) => ({url}))},
            currency:body.currency,
            category:body.category,
            area:body.area,
            state:body.state,
            agent: {
          connect: { id:(session.user.id ) }
           }
        },
         include: {
        images: true,
      },
    })
    return NextResponse.json(newProperty,{status:201},   )
    }  catch (error: unknown) {
  const message =
    error instanceof Error ? error.message : "Internal Server Error";

  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
}
 
}



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const state = searchParams.get("state");
  const search = searchParams.get("search");

const filters: Prisma.PropertyWhereInput = {};

  
 if (category) {
  if (Object.values(PropertyCategory).includes(category as PropertyCategory)) {
    filters.category = category as PropertyCategory;
  }
}

  if (state) {
   filters.state = state;
  }

  if (search) {
    filters.OR = [
      { title: { contains: search,} },
      { address: { contains: search,  } },
   ];
  }

  const properties = await prisma.property.findMany({
   where:filters,
   include: { images: true },
  });
  return NextResponse.json(properties);
} 

