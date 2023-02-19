import { useXR } from "@react-three/xr";
import { useEffect, useState } from "react";

export default function useDevicePosition(): [number, number, number] {
  const { session, referenceSpace } = useXR();
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    if (!session) return;

    const xrFrameCallback = async (time: number, frame: XRFrame) => {
      const pose = frame.getViewerPose(
        await session.requestReferenceSpace(referenceSpace)
      );
      if (pose) {
        const position = pose.transform.position;
        setPosition([position.x, position.y, position.z]);
      }
    };

    const id = session.requestAnimationFrame(xrFrameCallback);

    return () => {
      session.cancelAnimationFrame(id);
    };
  }, [session, referenceSpace]);

  return position;
}
