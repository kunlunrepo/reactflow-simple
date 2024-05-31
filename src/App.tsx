import 'reactflow/dist/style.css';  // reactflow样式
import {
    ReactFlow,
} from "reactflow";
import {useShallow} from 'zustand/react/shallow';
import useStore from './flow/store';
import ColorChooserNode from './flow/ColorChooserNode';

const nodeTypes = { colorChooser: ColorChooserNode };

const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

function App() {
    // 获取store
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
        useShallow(selector),
    );

    return (
        <div style={{ height: '100vh', width: '100vw'}}>
            <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            />
        </div>
    );
}

export default App
