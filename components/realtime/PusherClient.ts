import Pusher from "pusher-js";

if (!process.env.NEXT_PUBLIC_KEY || !process.env.NEXT_PUBLIC_CLUSTER) {
  throw new Error("Pusher key and cluster are required.");
}

const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
  cluster: process.env.NEXT_PUBLIC_CLUSTER,
});

export default pusher;
