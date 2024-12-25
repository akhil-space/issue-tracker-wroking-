import { schema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    console.log("api working fine");

    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format());


    const paramsID = await params;
    console.log("console id : ", paramsID.id);
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(paramsID.id)
        }
    })

    if (!issue) return NextResponse.json({ message: " not found" }, { status: 404 })

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(updatedIssue, { status: 201 })
}

export async function DELETE(req: NextRequest ,
{params }: {params : Promise<{ id: string}>}
){
  console.log( "Delete work");
const paramsID=await params;

 const issue =await prisma.issue.findUnique({
    where:{
        id: parseInt(paramsID.id)
    }
})

if(!issue)
    return NextResponse.json({m:"not found"}, {status: 404})
    
const deletedIssue = await prisma.issue.delete({
    where:{
        id: parseInt(paramsID.id)
    }
})

    return NextResponse.json(deletedIssue , {status : 202})
}