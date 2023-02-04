import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {prisma} from '../../../lib/prismaDB'; 
import { compare } from 'bcryptjs';

export default NextAuth({
  session: {
    strategy: 'jwt'
  }, 
  adapter: PrismaAdapter(prisma), 
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'email and password',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        await prisma.$connect(); 
        const {email, password} = credentials as {email: string, password: string}
                
        const user = await prisma.user.findUnique({where: {email}})
        
        if (!user) {
          throw new Error(`There is no user with this email ${email}`); 
        }
                
        const isValid = await compare(password as string, user.password!); 
        
        if (!isValid) {
          throw new Error(`password is not valid`); 
        }
        
        await prisma.$disconnect(); 
        return {email: user.email, id:user.id}
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,   
  pages: {
    signIn: '/login'
  }
});
