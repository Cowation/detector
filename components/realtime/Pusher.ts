import Pusher from "pusher";

if (
  !process.env.NEXT_PUBLIC_APP_ID ||
  !process.env.NEXT_PUBLIC_KEY ||
  !process.env.SECRET ||
  !process.env.NEXT_PUBLIC_CLUSTER
) {
  throw new Error(
    "APP_ID, NEXT_PUBLIC_KEY, SECRET, and NEXT_PUBLIC_CLUSTER must be defined in the environment variables."
  );
}

const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_APP_ID,
  key: process.env.NEXT_PUBLIC_KEY,
  secret: process.env.SECRET,
  cluster: process.env.NEXT_PUBLIC_CLUSTER,
  useTLS: true,
});

export default pusher;
