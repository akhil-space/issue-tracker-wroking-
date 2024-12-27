import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { schema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
try{

   const session = await getServerSession(AuthOptions)
   if(!session) 
    return NextResponse.json({}, {status: 401})

console.log("Post method working");
   
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

}catch(err){
    console.log( "error in post method :", err);
    console.error( "error in post method2  :", err);
    return NextResponse.json({error : err} , {status:400})
}
}

export async function GET(request:NextRequest){
     console.log(await request.json());
     
    return NextResponse.json({m :"working fine"}, {status: 201})
}

