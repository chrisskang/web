import { useMemo, useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Color, Mesh } from "three";
import fragmentShader from "./shaders/color/colorFrag.glsl";
import vertexShader from "./shaders/color/colorVert.glsl";

const ColorShader = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>(null);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },

      u_bg: {
        value: new Color("#A1A3F7"),
      },
      u_colorA: { value: new Color("#9FBAF9") },
      u_colorB: { value: new Color("#FEB3D9") },
      u_colorC: { value: new Color("#DAF7A6") },

      u_offset1: {
        value: 0.9,
      },
      u_offset2: {
        value: 0.3,
      },
      u_offset3: {
        value: 0.2,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1}
    >
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0.0, 1.0, 0.0] }}>
      <ColorShader />
    </Canvas>
  );
};

export default Scene;
