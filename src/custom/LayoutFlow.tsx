import React, { useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    useReactFlow, Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { initialNodes, initialEdges } from './NodesEdges.tsx';
import Dagre from '@dagrejs/dagre';


// 创建布局对象
const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

// 布局元素
const getLayoutedElements = (nodes, edges, options) => {
    // 图形
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => g.setNode(node.id, node));

    Dagre.layout(g);

    return {
        nodes: nodes.map((node) => {
            const { x, y } = g.node(node.id);
            return { ...node, position: { x, y } };
        }),
        edges,
    };
};

// 布局流程
const LayoutFlow = () => {
    //
    const { fitView } = useReactFlow();
    // 初始化节点
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // 初始化边
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // 获取布局元素
    const onLayout = useCallback(
        (direction) => {
            const layouted = getLayoutedElements(nodes, edges, {direction});

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            window.requestAnimationFrame(() => {
                fitView();
            });
        },
        [nodes, edges]
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        >
            <Panel position="top-right">
                <button onClick={() => onLayout('TB')}>垂直</button>
                <button onClick={() => onLayout('LR')}>水平</button>
            </Panel>
        </ReactFlow>
    );
};

export default function () {
    return (
        <ReactFlowProvider>
            <LayoutFlow />
        </ReactFlowProvider>
    );
}
