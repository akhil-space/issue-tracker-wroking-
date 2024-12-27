import prisma from "@/prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface Props{
 
}
const AuthOptions : NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
  providers:[
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Username", type: "text", placeholder: "email" },
        pass: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {

         console.log( "Print credential :", credentials);
        
          const res = await axios(`${process.env.LOGIN_URL}`, {
              method: 'POST',
              data: credentials
              // headers: { "Content-Type": "application/json" }
          });
          const user = await res.data
          console.log("printing user info : ", user);
          if (!user) {
              throw new Error(user.message || "Authentication Failed!!");
          }
          console.log("printing user info : ", user);

            // // Check if the user already exists in the database
            const existingUser = await prisma.user.findUnique({
              where: { email: 'testorganiser@yopmail.com' }
            });
  
            if (!existingUser) {
              // If the user does not exist, create a new user
              await prisma.user.create({
                data: {
                  email: user.email,
                  name: user.name || 'Anonymous', // Example fields, adjust as per your schema
                  // Add other fields you may want to store (e.g., user role, profile data)
                }
              });
            }
          
          return user;
      }
  }),
    
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET!
  
    })
  ],
  session:{
    strategy:'jwt'
  },
  pages: {
    signIn: "/auth/login",
}

// pages: {
//   signIn: '/auth/signin',
//   signOut: '/auth/signout',
//   error: '/auth/error', // Error code passed in query string as ?error=
//   verifyRequest: '/auth/verify-request', // (used for check email message)
//   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
// }
  }

  export default AuthOptions;