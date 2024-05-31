import 'reactflow/dist/style.css';  // reactflow样式
import ReactFlow, { applyEdgeChanges, applyNodeChanges, NodeChange, Node, Edge } from 'reactflow';
import {useCallback, useState} from "react";
import {initNodes} from "./flow/nodes.tsx";
import {initEdges} from "./flow/edges.tsx";

function App() {
    // 初始化节点
    const [nodes, setNodes] = useState<Node[]>(initNodes)
    // 初始化边缘
    const [edges, setEdges] = useState<Edge[]>(initEdges);
    // 节点变化
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    // 边缘变化
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

  return (
    <>
      <div style={{width: '100vw', height: '100vh'}}>
          {/*画布*/}
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView={true}>
          </ReactFlow>
      </div>
    </>
  )
}

export default App
