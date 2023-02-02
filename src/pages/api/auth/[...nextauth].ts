import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient(); 

export default NextAuth({
  adapter: PrismaAdapter(client), 
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, 
  // pages: {
  //   signIn: '/signin'
  // }
  
});
