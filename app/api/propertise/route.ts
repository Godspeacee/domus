import prisma from "@/prisma/clientfile";
import { NextRequest, NextResponse } from "next/server";
import {createPropertySchema} from '../../vallidationSchma'
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";




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
    } catch (error:any) {
        
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
    }
 
  }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const state = searchParams.get("state");
  const search = searchParams.get("search");

  const filters: any = {};

  
  if (category) {
    filters.category = category;
  }

  if (state) {
    filters.state = state;
  }

  if (search) {
    filters.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { address: { contains: search, mode: "insensitive" } },
    ];
  }

  const properties = await prisma.property.findMany({
    where:filters,
    include: { images: true },
  });
  return NextResponse.json(properties);
}