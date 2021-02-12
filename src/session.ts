import { Session, User } from "@prisma/client"

import { NextApiRequest } from "next"
import { getSession as gs } from "next-auth/client"
import prisma from "src/prisma"

export type ContextSession =
  | (Session & {
      user: User
    })
  | null

const getSession = async (req: NextApiRequest): Promise<ContextSession> => {
  const rawSession = await gs({ req })

  if (!rawSession?.accessToken) return null

  return await prisma.session.findFirst({
    where: {
      accessToken: rawSession.accessToken,
    },
    include: {
      user: true,
    },
  })
}

export default getSession
