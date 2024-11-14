import { Box } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo } from "react";

//TODO FIX SHADER INPUT

const Particle = () => {
  const planePositions = useMemo(() => {
    const planeGeometry = new THREE.PlaneGeometry(6, 6, 128, 128);
    const positions = planeGeometry.attributes.position.array;

    return positions;
  }, []);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    }),
    []
  );

  useFrame(() => {
    shaderArgs.uniforms.uTime.value++;
  });

  return (
    <div className="container relative flex items-center justify-center">
      <div className="lg:w-[1000px] lg:h-[1000px] w-[500px] h-[500px] p-4 z-0  outline outline-gray-500 outline-1">
        <Canvas camera={{ position: [0.0, 1.0, 0.0] }}>
          <Box args={[1, 1, 1]} />

          <points rotation={[-Math.PI / 2, 0, 0]}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attach="attributes-position"
                array={planePositions}
                itemSize={3}
                count={planePositions.length / 3}
              />
            </bufferGeometry>
            <shaderMaterial
              args={[shaderArgs]}
              transparent
              depthTest={false}
              depthWrite={false}
            />
          </points>
        </Canvas>
      </div>
    </div>
  );
};

export default Particle;
