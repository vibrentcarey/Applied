import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/mongodb";

async function verifyPassword(password, hashedPassword) {
  const match = await compare(password, hashedPassword)
  return match
}
export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { db } = await connectToDatabase()
        const users = db.collection('users');
        const user = await users.findOne({ email: credentials.email })

        if (!user) {
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Password does not match')
        }

        return {email: user.email}
      }
    })
  ]
})

