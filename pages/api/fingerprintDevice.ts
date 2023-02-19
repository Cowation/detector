import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// localhost:3000/api/createBoundry?radius=5&id=10293480

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, model } = req.body;
  await prisma.device.create({
    data: {
      name,
      model,
    },
  });

  res.status(200).json({ message: "Device added to db" });
}
