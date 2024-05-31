import 'reactflow/dist/style.css';  // reactflow样式
import ReactFlow, {
    applyEdgeChanges,
    applyNodeChanges,
    NodeChange,
    Node,
    Edge,
    addEdge,
    Position,
    ReactFlowProvider
} from 'reactflow';
import {useCallback, useState} from "react";
import './custom/text-updater-node.css'
import TextUpdaterNode from "./custom/TextUpdaterNode.tsx";
import CustomEdge from "./custom/CustomEdge.tsx";
import LayoutFlow from "./custom/LayoutFlow.tsx";

// 自定义节点类型 在组件外部定义nodeType以防止重新渲染，也可以在组件内部使用useMemo 【注意位置】
const nodeTypes = { textUpdater: TextUpdaterNode };

// 自定义边类型
const edgeTypes = {
    'custom-edge': CustomEdge,
};
function App() {

  return (
    <>
      <div style={{width: '100vw', height: '100vh'}}>
          {/*画布*/}
          <ReactFlowProvider>
              <LayoutFlow />
          </ReactFlowProvider>
      </div>
    </>
  )
}

export default App
