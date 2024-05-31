import 'reactflow/dist/style.css';  // reactflow样式
import ReactFlow, { applyEdgeChanges, applyNodeChanges, NodeChange, Node, Edge, addEdge } from 'reactflow';
import {useCallback, useState} from "react";
import {initNodes} from "./flow/nodes.tsx";
import {initEdges} from "./flow/edges.tsx";

function App() {
    // 初始化节点  (可以使用 const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); 来代替)
    const [nodes, setNodes] = useState<Node[]>(initNodes);
    // 初始化边缘  (可以使用 const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); 来代替)
    const [edges, setEdges] = useState<Edge[]>(initEdges);
    // 节点变化 (选择、拖动、删除节点时，触发这个函数，然后利用applyNodeChanges函数处理节点变化，主要是坐标等变化)
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            console.log("节点变化 onNodesChange：", changes);
            setNodes((nds) => applyNodeChanges(changes, nds))
        },
        [setNodes]
    );
    // 边缘变化 (删除边缘时，触发这个函数，然后利用applyEdgeChanges函数处理连接变化)
    const onEdgesChange = useCallback(
        (changes) => {
            console.log("边缘变化 onEdgesChange：", changes);
            setEdges((eds) => applyEdgeChanges(changes, eds))
        },
        [setEdges]
    );
    // 连接变化 (从一个句柄连接到另一个句柄时，触发这个函数，然后利用addEdge函数处理连接关系)
    const onConnect = useCallback(
        (connection) => {
            console.log("连接变化 onConnect：", connection);
            setEdges((eds) => addEdge(connection, eds))
        },
        [setEdges]
    );
    // 默认边选项
    const defaultEdgeOptions = {
        type: 'smoothstep',
        style: {stroke: 'red'}
    };

  return (
    <>
      <div style={{width: '100vw', height: '100vh'}}>
          {/*画布*/}
          <ReactFlow nodes={nodes}
                     edges={edges}
                     onNodesChange={onNodesChange}
                     onEdgesChange={onEdgesChange}
                     onConnect={onConnect}
                     defaultEdgeOptions={defaultEdgeOptions}
                     fitView={true}>
          </ReactFlow>
      </div>
    </>
  )
}

export default App
