import AuthOptions from "@/app/auth/authOptions";
import { schema, patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // getServerSession(AuthOptions)
        const  session = await getServerSession(AuthOptions);
        if(!session) return NextResponse.json({},{status:401})

        console.log("api working fine");
        const body = await request.json();
        const validation = patchIssueSchema.safeParse(body);
        if (!validation.success)
            return NextResponse.json(validation.error.format(), { status: 400 });

        const { assignedToUserId, title, description } = body;
        if (assignedToUserId) {
            const user = await prisma.user.findUnique({
                where: { id: assignedToUserId }
            })
            console.log("user : ", user);
            if (!user)
                return NextResponse.json({
                    error: "Invalid User. "
                },
                    { status: 400 })
        }
        const paramsID = await params;
        console.log("Params Id :", paramsID);
        
        const issue = await prisma.issue.findUnique({
            where: {
                id: parseInt(paramsID.id)
            }
        })

        if (!issue) return NextResponse.json({ message: "No Issue Found" }, { status: 404 })

        const updatedIssue = await prisma.issue.update({
            where: {
                id: issue.id
            },
            data: {
                title,
                description,
                assignedToUserId
            }
        })
        return NextResponse.json(updatedIssue, { status: 201 })
    } catch (er) {
        console.error("some error occuer", er)
    }
}

export async function DELETE(req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await getServerSession(AuthOptions);
    if (!session) {

        return NextResponse.json({}, { status: 401 })
    }
    console.log("Delete work");
    const paramsID = await params;

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(paramsID.id)
        }
    })

    if (!issue)
        return NextResponse.json({ m: "not found" }, { status: 404 })

    const deletedIssue = await prisma.issue.delete({
        where: {
            id: parseInt(paramsID.id)
        }
    })

    return NextResponse.json(deletedIssue, { status: 202 })
}

