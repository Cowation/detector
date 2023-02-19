import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function PhoneModel() {
  // @ts-ignore
  const gltf = useLoader(GLTFLoader, "/iphone.glb");
  return (
    <Suspense fallback={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={gltf.scene} />
      </group>
    </Suspense>
  );
}
