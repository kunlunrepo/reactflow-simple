import 'reactflow/dist/style.css';  // reactflow样式
import {ReactFlow} from "reactflow";

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

  return (
    <>
      <div style={{width: '100vw', height: '100vh'}}>
          <ReactFlow nodes={initNodes} edges={initEdges}/>
      </div>
    </>
  )
}

export default App
