import {
  Environment,
  Grid,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const ThreeBody = () => {
  //   const body1ref = useRef();
  //   const body2ref = useRef();
  //   const body3ref = useRef();
  //   const trail1Ref = useRef();
  //   const trail2Ref = useRef();
  //   const trail3Ref = useRef();

  //   const b1Mass = 7; //kg
  //   const b2Mass = 7; //kg
  //   const b3Mass = 7; //kg

  //   const G = 1; //6.6743 * Math.pow(10, -2); //m^3 kg^-1 s^-2
  //   //   const gravity = { x: 0, y: -9.81, z: 0 };

  //   const trailLength = 100;

  //   const initVelocity = { x: 0, y: 0, z: 0 };

  //   // const previousInputValue = useRef();
  //   const [hovered, hover] = useState(false);
  //   const [clicked, click] = useState(false);

  //   const refList = [body1ref, body2ref, body3ref];
  //   const massList = [b1Mass, b2Mass, b3Mass];
  //   const trailRefs = [trail1Ref, trail2Ref, trail3Ref];

  //   useEffect(() => {
  //     refList.forEach((ref, index) => {
  //       if (ref.current) {
  //         if (!ref.current.velocity) {
  //           ref.current.velocity = { ...initVelocity };
  //         }
  //         if (!ref.current.acceleration) {
  //           ref.current.acceleration = { x: 0, y: 0, z: 0 };
  //         }
  //         if (!ref.current.mass) {
  //           ref.current.mass = massList[index];
  //         }
  //       }
  //     });
  //   }, []);

  //   useFrame((state, delta) => {
  //     for (let i = 0; i < refList.length; i++) {
  //       for (let j = i + 1; j < refList.length; j++) {
  //         // Apply attraction between refList[i] and refList[j]
  //         if (i !== j) {
  //           attract(refList[i], refList[j]);
  //         }
  //       }
  //     }

  //     refList.forEach((ref, index) => {
  //       update(ref, delta);

  //       const trailRef = trailRefs[index];
  //       if (trailRef.current) {
  //         const trailPositions = trailRef.current.position;
  //         // Shift the trail positions to the left
  //         for (let i = 3; i < trailPositions.length; i++) {
  //           trailPositions[i - 3] = trailPositions[i];
  //         }
  //         // Add the new position at the end
  //         trailPositions[trailPositions.length - 3] = ref.current.position.x;
  //         trailPositions[trailPositions.length - 2] = ref.current.position.y;
  //         trailPositions[trailPositions.length - 1] = ref.current.position.z;

  //         // Update the line geometry
  //         // trailRef.current.geometry.attributes.position.needsUpdate = true;
  //       }
  //     });
  //   });

  //   const update = (ref, delta) => {
  //     //euler integration
  //     ref.current.velocity.x += ref.current.acceleration.x * delta;
  //     ref.current.velocity.y += ref.current.acceleration.y * delta;
  //     ref.current.velocity.z += ref.current.acceleration.z * delta;

  //     ref.current.position.x += ref.current.velocity.x * delta;
  //     ref.current.position.y += ref.current.velocity.y * delta;
  //     ref.current.position.z += ref.current.velocity.z * delta;

  //     ref.current.acceleration.x = 0;
  //     ref.current.acceleration.y = 0;
  //     ref.current.acceleration.z = 0;
  //   };
  //   const applyforce = (ref, force) => {
  //     ref.current.acceleration.x += force.x / ref.current.mass;
  //     ref.current.acceleration.y += force.y / ref.current.mass;
  //     ref.current.acceleration.z += force.z / ref.current.mass;
  //   };

  //   const attract = (refA, refB) => {
  //     const force = {
  //       x: refB.current.position.x - refA.current.position.x,
  //       y: refB.current.position.y - refA.current.position.y,
  //       z: refB.current.position.z - refA.current.position.z,
  //     };
  //     let distance = Math.sqrt(
  //       Math.pow(force.x, 2) + Math.pow(force.y, 2) + Math.pow(force.z, 2)
  //     );
  //     if (distance < 0.2) {
  //       distance = 0.2;
  //     }

  //     const unitVector = {
  //       x: force.x / distance,
  //       y: force.y / distance,
  //       z: force.z / distance,
  //     };

  //     const strength =
  //       (G * refA.current.mass * refB.current.mass) / Math.pow(distance, 2);
  //     const forceB = {
  //       x: unitVector.x * strength,
  //       y: unitVector.y * strength,
  //       z: unitVector.z * strength,
  //     };
  //     const forceA = {
  //       x: -unitVector.x * strength,
  //       y: -unitVector.y * strength,
  //       z: -unitVector.z * strength,
  //     };
  //     applyforce(refA, forceB);
  //     applyforce(refB, forceA);
  //   };
  return (
    <div className="container relative flex items-center justify-center">
      <div className="lg:w-[1000px] lg:h-[1000px] w-[500px] h-[500px] p-4 z-0 ">
        <Canvas shadows>
          <ambientLight intensity={Math.PI / 1.5} />
          <spotLight
            position={[0, 40, 0]}
            decay={0}
            distance={45}
            penumbra={1}
            intensity={100}
          />
          <spotLight
            position={[-20, 0, 10]}
            color="red"
            angle={0.15}
            decay={0}
            penumbra={-1}
            intensity={30}
          />
          <spotLight
            position={[20, -10, 10]}
            color="red"
            angle={0.2}
            decay={0}
            penumbra={-1}
            intensity={20}
          />
          <Environment background preset="night" />
          <PerspectiveCamera makeDefault position={[3, 10, 8]} />

          <directionalLight
            position={[0, 5, 5]}
            castShadow
            intensity={5}
            shadow-mapSize={2048}
            shadow-bias={-0.001}
          >
            <orthographicCamera
              attach="shadow-camera"
              args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
            />
          </directionalLight>

          {/* <mesh receiveShadow position={[0, 1, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[50, 50]} />
          <meshLambertMaterial color={"#636363"} />
        </mesh>

        <mesh
          ref={body1ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => (event.stopPropagation(), hover(true))}
          onPointerOut={(event) => hover(false)}
          position={[-1, 3, 2]}
          castShadow
        >
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshLambertMaterial color={hovered ? "green" : "tomato"} />
        </mesh>

        <mesh
          ref={body2ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => (event.stopPropagation(), hover(true))}
          onPointerOut={(event) => hover(false)}
          position={[3, 4, 4]}
          castShadow
        >
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshLambertMaterial color={hovered ? "green" : "yellow"} />
        </mesh>

        <mesh
          ref={body3ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => (event.stopPropagation(), hover(true))}
          onPointerOut={(event) => hover(false)}
          position={[1, 2, 5]}
          castShadow
        >
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshLambertMaterial color={hovered ? "green" : "pink"} />
        </mesh> */}

          <Grid
            position={[0, -1, 0]}
            infiniteGrid
            cellSize={1}
            cellThickness={1.5}
            sectionSize={0.1}
            sectionThickness={1}
            fadeDistance={25}
            sectionColor={"white"}
            cellColor={"white"}
          />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeBody;
