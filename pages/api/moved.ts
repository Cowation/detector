import pusher from "@/components/realtime/Pusher";
import { NextApiRequest, NextApiResponse } from "next";

// localhost:3000/api/createBoundry?radius=5&id=10293480

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  pusher.trigger(id as string, "moved", { moved: true });

  res.send("Moved");
}
