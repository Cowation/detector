import useDevicePosition from "@/components/useDevicePosition";
import { AiOutlinePlus } from "react-icons/ai";

const RadiusScreen = () => {
  const [x, y, z] = useDevicePosition();

  return (
    <div className="w-screen h-[100dvh] relative flex flex-col items-center justify-center">
      <div className="absolute invisible top-0 bottom-0 left-0 right-0"></div>
      <div className="relative z-10 text-center font-mono">
        <h1 className="text-4xl font-bold">Set radius</h1>
        {/* <p className="text-xl">
          Radius:{" "}
          {Math.sqrt(
            Math.pow(position.x, 2) +
              Math.pow(position.y, 2) +
              Math.pow(position.z, 2)
          ).toFixed(3)}
        </p> */}
        <p>{x}</p>
        <p>{y}</p>
        <p>{z}</p>
      </div>
      <button className="aspect-square absolute w-16 h-16 bottom-12 flex justify-center items-center text-3xl bg-black rounded-full text-white p-2">
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default RadiusScreen;
