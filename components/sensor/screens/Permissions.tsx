import { AiOutlinePlus } from "react-icons/ai";

const Permissions = () => {
  return (
    <div className="w-screen h-screen relative flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Grant Sensor Permissions</h1>
      <p>Tap to allow access to device motion sensors</p>
      <button
        onClick={() => {
          if (typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceMotionEvent.requestPermission()
              .then((permissionState) => {
                if (permissionState === "granted") {
                  window.addEventListener("devicemotion", () => {});
                }
              })
              .catch(console.error);
          } else {
            // handle regular non iOS 13+ devices
          }
        }}
        className="aspect-square absolute w-16 h-16 bottom-12 flex justify-center items-center text-3xl bg-black rounded-full text-white p-2"
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Permissions;
