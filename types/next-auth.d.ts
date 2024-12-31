import { Session, User } from "next-auth";

// Augment the next-auth types
declare module "next-auth" {
  interface User {
    id?:string,
    email?:string
    access_token?: string,
    refresh_token?: string
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}
