import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { schema } from "../../validationSchema";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format, { status: 400 });

    //now good to go to save in db
    const task = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })
    console.log("task :", task);



    return NextResponse.json({ message: "task created", task }, { status: 201 })

}

export async function GET(request:NextRequest){
     console.log(await request.json());
     
    return NextResponse.json({m :"working fine"}, {status: 201})
}

