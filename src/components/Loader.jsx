
import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html>
      <div className="flex justify-center items-center h-full w-full">
        <div className="relative">
          {/* Spinner */}
          <div className="w-20 h-20 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin" />

          {/* Glass effect inner circle */}
          <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-md" />
        </div>
      </div>
    </Html>
  );
};

export default Loader;
