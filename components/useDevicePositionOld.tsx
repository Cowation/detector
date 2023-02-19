// Create a React hook that returns the current position of the device using the devicemotion API

import { useEffect, useState } from "react";

const useDevicePosition = () => {
  // Calculate the position of the device using the devicemotion API
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [interval, setInterval] = useState(0);

  useEffect(() => {
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (!event.acceleration) return;
      const { x, y, z } = event.acceleration;

      if (x === null || y === null || z === null) return;

      setInterval(event.interval * 0.001);
      setAcceleration({ x, y, z });
    };

    window.addEventListener("devicemotion", handleDeviceMotion);

    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, []);

  useEffect(() => {
    // Acceleration updates every 0.02 seconds
    setVelocity((prevVelocity) => ({
      x: prevVelocity.x + acceleration.x * interval,
      y: prevVelocity.y + acceleration.y * interval,
      z: prevVelocity.z + acceleration.z * interval,
    }));
  }, [acceleration, interval]);

  useEffect(() => {
    setPosition((prevPosition) => ({
      x: prevPosition.x + velocity.x * interval,
      y: prevPosition.y + velocity.y * interval,
      z: prevPosition.z + velocity.z * interval,
    }));
  }, [velocity, interval]);

  return position;
};

export default useDevicePosition;
