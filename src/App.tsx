import 'reactflow/dist/style.css';  // reactflow样式
import {
    ReactFlow, Edge, Node, useNodesState, Connection, addEdge, useEdgesState
} from "reactflow";

import DevTools from './devtools/Devtools';
import './devtools/style.css';
import {useCallback} from "react";

const initNodes: Node[] = [
    {
        id: '1a',
        type: 'input',
        data: { label: 'Node 1' },
        position: { x: 250, y: 5 },
    },
    {
        id: '2a',
        data: { label: 'Node 2' },
        position: { x: 100, y: 120 },
    },
    {
        id: '3a',
        data: { label: 'Node 3' },
        position: { x: 400, y: 120 },
    },
];

const initEdges: Edge[] = [
    { id: 'e1-2', source: '1a', target: '2a' },
    { id: 'e1-3', source: '1a', target: '3a' },
];

const fitViewOptions = { padding: 0.5 };

function App() {
    const [nodes, , onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div style={{ height: '100vh', width: '100vw'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                fitViewOptions={fitViewOptions}
            >
                <DevTools />
            </ReactFlow>
        </div>
    );
}

export default App
