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
      id:'eventably',
      name: 'eventably',
      credentials: {
        email: { label: "Username", type: "text", placeholder: "email" },
        pass: { label: "Password", type: "password" }
      },

      async authorize(credentials: any): Promise<any>  {
        console.log("Inside eventably ....");
        
     const  {email}=credentials;
         console.log( "Print credential :", credentials);
        
          const res = await axios(`${process.env.LOGIN_URL}`, {
              method: 'POST',
              data: credentials
              // headers: { "Content-Type": "application/json" }
          });
          const user = await res.data
          console.log("printing user info : ", user);

          if(!user.accessToken || !user.refreshToken){
     return null;
          }
  // // Check if the user already exists in the database
        //  'testorganiser@yopmail.com' 'testorganiser@yopmail.com' 
         const existingUser = await prisma.user.findUnique({
          where: { email:email }
        });
         console.log("existingUser :",existingUser);
         
        if (!existingUser) {
          // If the user does not exist, create a new user
      const newUser =    await prisma.user.create({
            data: {
              email: email,
             name : email.substring(0, email.indexOf('@')) // Example fields, adjust as per your schema
              // Add other fields you may want to store (e.g., user role, profile data)
            }
          });
          console.log("printing user info : ", newUser);
          await prisma.account.create({
            data:{
              userId :newUser.id,
              provider :'eventably',
              providerAccountId :'eventably',
              refresh_token :user.refreshToken,
              access_token :user.accessToken,
              type:'oauth'
              
            }
          })
          return {
            id: newUser.id,
            email: newUser.email,
            access_token: user.accessToken,
            refresh_token: user.refreshToken
          };
        }


        return {
          id: existingUser.id,
          email: existingUser.email,
          access_token: user.accessToken,
          refresh_token: user.refreshToken
        };
      }
  }),
  CredentialsProvider({
    id:'Credentials',
    name: 'Credentials',
    credentials: {
      email: { label: "Username", type: "text", placeholder: "email" },
      password: { label: "Password", type: "password" }
    },

    async authorize(credentials: any): Promise<any>  {
      console.log("Inside Credentials ....");
   const  {email}=credentials;
       console.log( "Print credential :", credentials);
      
        const res = await axios(`${process.env.LOGIN_URL}`, {
            method: 'POST',
            data: credentials
            // headers: { "Content-Type": "application/json" }
        });
        const user = await res.data
        console.log("printing user info : ", user);

        if(!user.accessToken || !user.refreshToken){
   return null;
        }



       // // Check if the user already exists in the database
      //  'testorganiser@yopmail.com' 'testorganiser@yopmail.com' 
       const existingUser = await prisma.user.findUnique({
        where: { email:email }
      });
       console.log("existingUser :",existingUser);
       
      if (!existingUser) {
        // If the user does not exist, create a new user
    const newUser =    await prisma.user.create({
          data: {
            email: email,
           name : email.substring(0, email.indexOf('@')) // Example fields, adjust as per your schema
            // Add other fields you may want to store (e.g., user role, profile data)
          }
        });
        console.log("printing user info : ", newUser);
        return newUser;
      }


        return existingUser;
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
},

callbacks:{
  async jwt({ token, user }) {
    // If user is logged in, add user data to the JWT token
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.accessToken = user.access_token;
      token.refreshToken = user.refresh_token;
    }
    return token;
  },
  
  async session({ session, token }) {
    // Here, you can merge the token data into the session object
    if (token) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
    }
    return session;
  },
  async redirect({ url, baseUrl }) {
    // Check if the user is logged in and ensure proper redirection
    console.log("url :", url, " baseUrl", baseUrl);
    
    return baseUrl; // Or define your custom URL
  },
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