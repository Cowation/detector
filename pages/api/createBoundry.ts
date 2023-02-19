import { NextApiRequest, NextApiResponse } from "next";

// localhost:3000/api/createBoundry?radius=5&id=10293480

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { radius, id } = req.query;
}
