import 'reactflow/dist/style.css';  // reactflow样式
import {
    addEdge,
    ReactFlow,
    useEdgesState,
    useNodesState,
    Edge,
    Connection,
    Controls,
    MiniMap,
    Background, BackgroundVariant
} from "reactflow";
import {useCallback, useState} from "react";

function App() {
    // 初始化节点
    const initNodes = [
        {
            id: '1',
            type: 'input',
            data: { label: 'Input Node' },
            position: { x: 250, y: 25 },
        },
        {
            id: '2',
            // 也可以使用ReactComponent作为标签
            data: { label: <div>Default Node</div> },
            position: { x: 100, y: 125 },
        },
        {
            id: '3',
            type: 'output',
            data: { label: 'Output Node' },
            position: { x: 250, y: 250 },
        },
    ];
    // 初始化边
    const initEdges = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3', animated: true },
    ];
    // 节点变化
    const [nodes, setNodes] = useState(initNodes)
    // 边缘变化
    const [edges, setEdges] = useState(initEdges);

  return (
    <>
      <div style={{width: '100vw', height: '100vh'}}>
          {/*画布*/}
          <ReactFlow nodes={nodes} edges={edges} fitView={true}>
          </ReactFlow>
      </div>
    </>
  )
}

export default App
