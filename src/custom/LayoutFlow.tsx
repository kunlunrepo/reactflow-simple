import React, { useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { initialNodes, initialEdges } from './NodesEdges.tsx';

// 布局元素
const getLayoutedElements = (nodes, edges) => {
    return { nodes, edges };
};

// 布局流程
const LayoutFlow = () => {
    //
    const { fitView } = useReactFlow();
    // 初始化节点
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // 初始化边
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onLayout = useCallback(() => {
        // 获取布局元素
        const layouted = getLayoutedElements(nodes, edges);

        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);

        window.requestAnimationFrame(() => {
            fitView();
        });
    }, [nodes, edges]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        />
    );
};

export default function () {
    return (
        <ReactFlowProvider>
            <LayoutFlow />
        </ReactFlowProvider>
    );
}
