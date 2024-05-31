import 'reactflow/dist/style.css';  // reactflow样式
import {addEdge, ReactFlow, useEdgesState, useNodesState, Edge, Connection} from "reactflow";
import {useCallback} from "react";

function App() {
    // 初始化节点
    const initNodes = [
        {id: '1', position: {x: 0, y: 0}, data: {label: 'Node 1'}},
        {id: '2', position: {x: 0, y: 100}, data: {label: 'Node 2'}}
    ]
    // 初始化边
    const initEdges = [
        {id: 'e1-2', source: '1', target: '2'}
    ]
    // 节点变化
    const [nodes, setNodes, onNodesChange] = useNodesState(initNodes)
    // 边缘变化
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
    // 连线变化
    const onConnect = useCallback((params: Connection) => {
        console.log("reactflow 画布连线变化 onConnect：", params);
        setEdges((eds) => addEdge(params, eds))
    }, [setEdges]);

  return (
    <>
      <div style={{width: '100vw', height: '100vh'}}>
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}/>
      </div>
    </>
  )
}

export default App
