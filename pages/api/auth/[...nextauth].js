import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/utils/dbConnect";
import User from '@/Models/User'
import bcrypt from "bcryptjs";
import DiscordProvider from "next-auth/providers/discord";


export default NextAuth({
    providers: [
        GitHubProvider({
          clientId: 'e82493d57e55eb9f53d1',
          clientSecret: 'cd0480840bb79877668d6c4e83cca6b4961b292e'
        }),
        CredentialsProvider({
          id: 'credential',
          name: 'Credential',
          credentials: {
            email: {label: 'Email', type: 'text'},
            password: {label: 'Password', type: 'password'}
          },
          async authorize(credentials){
              await dbConnect();

             const user = await User.findOne({email: credentials.email})

             if(!user){
              throw new Error('This Email is not in our records')
             }

             const isPasswordMatch = await bcrypt.compare(credentials.password, user.password)

             if(!isPasswordMatch){
              throw new Error('Password does not match')
             }

             
             return user

          },


        }),
        DiscordProvider({
          clientId: '1087435204085424191',
          clientSecret: 'ilkkFbyWJLxMHRwJu0-nf3BuHaY3Q1dn',
    
        })
      ],


      session: {
        strategy: 'jwt'
      },

      callbacks: {

        async redirect({ url, baseUrl }) {
          return url
        },
      },
      pages: {
        signIn: '/',
        signOut: '/'
      },
      jwt: {
        secret: process.env.JWT_SECRET
      },
      secret: process.env.JWT_SECRET
})