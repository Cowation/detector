// Create a React hook that returns the current position of the device using the devicemotion API

import { useEffect, useState } from "react";

import { useInterval } from "usehooks-ts";

const useDeviceGPSPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [initGPSpos, setInitGPSpos] = useState({ lat: 0, lon: 0 });
  const [GPSPos, setGPSPos] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setInitGPSpos({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  useInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGPSPos({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, 500);

  useEffect(() => {
    const y = (GPSPos.lat - initGPSpos.lat) * 110574;
    const x =
      (GPSPos.lon - initGPSpos.lon) *
      111320 *
      Math.cos((GPSPos.lat * Math.PI) / 180);
    setPosition({ x, y, z: 0 });
  }, [GPSPos]);

  return position;
};

export default useDeviceGPSPosition;
