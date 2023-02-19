import { PhoneModel } from "@/components/PhoneModel";
import useChannel from "@/components/realtime/useChannel";
import useEvent from "@/components/realtime/useEvent";
import prisma from "@/lib/db";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { PropsWithChildren, useState } from "react";
import { BiCamera, BiMicrophone } from "react-icons/bi";

const ControlButton = ({
  children,
  onClick,
}: PropsWithChildren<{ onClick?: () => void }>) => {
  return (
    <button
      onClick={onClick}
      className="aspect-square bg-gray-100 border flex flex-row justify-center items-center text-2xl text-gray-500 border-gray-300 shadow-sm w-14 h-14 rounded-md"
    >
      {children}
    </button>
  );
};

const Dashboard = ({
  device,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [moved, setMoved] = useState(false);

  const channel = useChannel(device.id);
  useEvent(channel, "moved", (data) => {
    if ((data as any).moved) {
      setMoved(true);
    }
  });

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100 flex flex-row">
      <div className="w-1/4 h-full p-3">
        <div className="bg-white p-5 w-full h-full shadow-md border border-gray-300 rounded-md">
          <h1 className="text-2xl font-bold">{device.name}</h1>
          <p className="text-gray-600 text-lg">{device.model}</p>
          <hr className="text-gray-200 my-4" />
          <div className="flex flex-row gap-2">
            <ControlButton>
              <BiMicrophone />
            </ControlButton>
            <ControlButton>
              <BiCamera />
            </ControlButton>
          </div>
        </div>
      </div>
      <div className="w-3/4 h-full">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight />
          <PhoneModel />
          {/* Create OrbitControls that look down at an angle */}
          <OrbitControls
            makeDefault
            autoRotate
            autoRotateSpeed={6}
            maxPolarAngle={Math.PI / 2.8}
            minPolarAngle={Math.PI / 2.8}
            // position={[0, 0, 200]}
            enableZoom={false}
            enablePan={false}
          />
          {/* Create a light blue 3d torus surrounding the phone model */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3, 0.01, 16, 100]} />
            <meshStandardMaterial color="#2b75ff" />
          </mesh>
        </Canvas>
      </div>
      {moved && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="p-4 text-lg text-white font-bold absolute bottom-8 right-8 bg-red-500/50 rounded-md border border-red-500"
        >
          <p>Device moved! Please check your device.</p>
        </motion.div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const device = await prisma.device.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!device) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      device,
    }, // will be passed to the page component as props
  };
}

export default Dashboard;
