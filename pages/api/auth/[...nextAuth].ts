import NextAuth, { User as BaseUser, InitOptions } from "next-auth"

import Adapters from "next-auth/adapters"
import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"
import Providers from "next-auth/providers"
import { SessionBase } from "next-auth/_utils"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // @ts-expect-error Global
  if (!global.prisma) {
    // @ts-expect-error Global
    global.prisma = new PrismaClient()
  }
  // @ts-expect-error Global
  prisma = global.prisma
}

export interface Session extends SessionBase {
  user: {
    id: string
    name: string
    image: string
  }
}

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    session: async (
      session,
      { id }: BaseUser & { id: string }
    ): Promise<Session> => ({
      ...session,
      user: await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          image: true,
        },
      }),
    }),
  },

  adapter: Adapters.Prisma.Adapter({ prisma }),
}

const handler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default handler
