import AuthOptions from "@/app/auth/authOptions"
import NextAuth from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import {z} from 'zod'
//auth options here 
const handler = NextAuth(
  AuthOptions
)
const loginValidation = z.object({
  email : z.string().email(),
  password : z.string()
})

export { handler as GET, handler as POST }

async function  POST(res :NextRequest) {
  const body =await res.json();
 const validation = await loginValidation.safeParse(body);

 if(!validation.success)
  return NextResponse.json(validation.error.format , {status: 400})

 
  

  return NextResponse.json({m:"login succsess"}, {status:200})
}