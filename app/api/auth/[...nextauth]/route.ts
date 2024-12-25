import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client"
import { adapter } from "next/dist/server/web/adapter"
const handler = NextAuth({
  adapter:PrismaAdapter(prisma),
providers:[
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET!

  })
],
session:{
  strategy:'jwt'
}
})

export { handler as GET, handler as POST }