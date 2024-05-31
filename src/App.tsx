import 'reactflow/dist/style.css';  // reactflow样式
import ReactFlow, {
    applyEdgeChanges,
    applyNodeChanges,
    NodeChange,
    Node,
    Edge,
    addEdge,
    SelectionMode,
    MiniMap, Controls, Background, BackgroundVariant, Panel
} from 'reactflow';
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

    const nodeColor = (node) => {
        switch (node.type) {
            case 'input':
                return '#6ede87';
            case 'output':
                return '#6865A5';
            default:
                return '#ff0072';
        }
    };

    const [variant, setVariant] = useState(BackgroundVariant.Cross);

    return (
        <>
            <div style={{width: '100vw', height: '100vh'}}>
                {/*画布*/}
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                >
                    {/*小地图*/}
                    <MiniMap
                        nodeColor={nodeColor}
                        nodeStrokeWidth={3}
                        zoomable pannable />
                    {/*缩放控制栏*/}
                    <Controls />
                    {/*背景图*/}
                    <Background color="#ccc" variant={variant} />
                    {/*控制板*/}
                    <Panel position={"top-left"}>
                        <div>背景图:</div>
                        <button onClick={() => setVariant(BackgroundVariant.Dots)}>*</button>
                        <button onClick={() => setVariant(BackgroundVariant.Lines)}>-</button>
                        <button onClick={() => setVariant(BackgroundVariant.Cross)}>+</button>
                    </Panel>
                    {/*各个位置控制板*/}
                    <Panel position="top-left">top-left</Panel>
                    <Panel position="top-center">top-center</Panel>
                    <Panel position="top-right">top-right</Panel>
                    <Panel position="bottom-left">bottom-left</Panel>
                    <Panel position="bottom-center">bottom-center</Panel>
                    <Panel position="bottom-right">bottom-right</Panel>
                </ReactFlow>
            </div>
        </>
    )
}

export default App
