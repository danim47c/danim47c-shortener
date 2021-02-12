import { NextApiRequest, NextApiResponse } from "next"

import getSession from "src/session"
import nextConnect from "next-connect"

export default nextConnect<NextApiRequest, NextApiResponse>().get(
  async (req, res) => {
    const session = await getSession(req)

    res.json({ session, valid: !!session })
  }
)
