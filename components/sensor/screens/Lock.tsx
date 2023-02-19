import { useEffect, useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

const THRESHOLD = 0.5;

const Lock = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [moved, setMoved] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (!event.acceleration) return;

      const { x, y, z } = event.acceleration;
      if (x === null || y === null || z === null) return;

      setAcceleration({ x, y, z });
    };

    window.addEventListener("devicemotion", handleDeviceMotion);
    return () => window.removeEventListener("devicemotion", handleDeviceMotion);
  }, []);

  useEffect(() => {
    if (
      (acceleration.x > THRESHOLD ||
        acceleration.y > THRESHOLD ||
        acceleration.z > THRESHOLD) &&
      locked
    ) {
      setMoved(true);
    }
  }, [acceleration, locked]);

  useEffect(() => {
    if (moved) {
      fetch("/api/moved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "71003531-7b91-4787-b4f7-8f9b42e3584a",
        }),
      });
    }
  }, [moved]);

  return (
    <div className={moved ? "bg-red-500" : "bg-green-500"}>
      <div className=" bg-blue w-screen h-[100dvh] relative flex flex-col items-center justify-center ">
        <div className="absolute invisible top-0 bottom-0 left-0 right-0"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold">Lock Device Position</h1>
        </div>
        <div className="flex items-stretch space-x-4 absolute bottom-12">
          <button
            className="aspect-square w-16 h-16 flex justify-center items-center text-3xl bg-black rounded-full text-white p-2"
            onClick={() => {
              setLocked(!locked);
              if (locked) {
                setMoved(false);
              }
            }}
          >
            {locked ? <AiFillLock /> : <AiFillUnlock />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lock;
