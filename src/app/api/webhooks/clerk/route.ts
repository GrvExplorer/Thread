import { headers } from "next/headers"

export const POST = async (req:Request) => {
  const payload = await req.json()
  const header = headers()


}