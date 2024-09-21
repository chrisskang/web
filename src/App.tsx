import { MasterLayout } from "./component/MasterLayout";
import ColorShader from "./pages/ColorShader";
import ThreeBody from "./pages/ThreeBody";

function App() {
  return (
    <>
      <MasterLayout />
      <ThreeBody />
      <ColorShader />
      {/* <ParticleShader /> */}
    </>
  );
}

export default App;
