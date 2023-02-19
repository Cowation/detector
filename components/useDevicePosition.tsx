import { useEffect, useState } from "react";

export default function useDevicePosition() {
  const [position, setPosition] = useState<[any, any, number]>([0, 0, 0]);

  useEffect(() => {
    (async () => {
      if (!navigator.xr) return;

      const session = await navigator.xr.requestSession("immersive-ar");
      const referenceSpace = await session.requestReferenceSpace("local");

      const viewerReferenceSpace = referenceSpace.getOffsetReferenceSpace(
        new XRRigidTransform(
          new DOMPointReadOnly(0, 0, 0),
          new DOMPointReadOnly(0, 0, 0, 1)
        )
      );

      const render = (_: number, frame: XRFrame) => {
        // Get the latest frame data
        const pose = frame.getViewerPose(viewerReferenceSpace);

        if (pose) {
          // Get the position and orientation of the device
          const pos = pose.transform.position;

          setPosition([pos.x, pos.y, pos.z]);
        }

        // Render the next frame
        session.requestAnimationFrame(render);
      };

      session.requestAnimationFrame(render);
    })();
  }, []);

  return position;
}
