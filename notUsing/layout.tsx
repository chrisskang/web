import { Panel, PanelGroup } from "react-resizable-panels";
import ColorShader from "../src/pages/ColorShader";

const layout = () => {
  return (
    <div className="flex flex-col">
      <PanelGroup direction="horizontal">
        <Panel className="bg-red-500">
          <ColorShader />
        </Panel>
        <Panel className="bg-blue-500">
          <ColorShader />
        </Panel>
        <Panel className="bg-green-500">
          <ColorShader />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default layout;
