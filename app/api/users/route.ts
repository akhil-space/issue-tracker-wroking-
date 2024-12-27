import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
try{

    console.log("User Fetching");
     
    const users  = await  prisma.user.findMany({
         orderBy:{
             name:"asc"
         }
     })
  
     return NextResponse.json(users,{status: 201})
}catch(err){

    console.log("error :", err);
    
}
}