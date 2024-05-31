import 'reactflow/dist/style.css';  // reactflow样式
import ReactFlow, { applyEdgeChanges, applyNodeChanges, NodeChange, Node, Edge, addEdge } from 'reactflow';
import {useCallback, useState} from "react";
import './custom/text-updater-node.css'
import TextUpdaterNode from "./custom/TextUpdaterNode.tsx";

// 自定义节点类型 在组件外部定义nodeType以防止重新渲染，也可以在组件内部使用useMemo 【注意位置】
const nodeTypes = { textUpdater: TextUpdaterNode };

function App() {
    // 画背景图布样式
    const rfStyle = {
        backgroundColor: '#B8CEFF',
    };
    // 初始化节点
    const initialNodes = [
        { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } },
    ];
    // 初始化节点
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    // 初始化边缘
    const [edges, setEdges] = useState<Edge[]>([]);
    // 节点变化 (选择、拖动、删除节点时，触发这个函数，然后利用applyNodeChanges函数处理节点变化，主要是坐标等变化)
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            console.log("节点变化 onNodesChange：", changes);
            return setNodes((nds) => applyNodeChanges(changes, nds))
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
                     fitView={true}
                     nodeTypes={nodeTypes}
                     style={rfStyle}
          >
          </ReactFlow>
      </div>
    </>
  )
}

export default App
