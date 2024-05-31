import React, { useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    useReactFlow, Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { initialNodes, initialEdges } from './NodesEdges.tsx';
import ELK from 'elkjs/lib/elk.bundled.js';
import {ELK as ELKBak, ElkNode} from "elkjs/lib/elk-api";


const elk: ELKBak = new ELK();

const useLayoutedElements = () => {
    const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
    const defaultOptions = {
        'elk.algorithm': 'layered',
        'elk.layered.spacing.nodeNodeBetweenLayers': 100,
        'elk.spacing.nodeNode': 80,
    };

    const getLayoutedElements = useCallback((options) => {
        const layoutOptions = { ...defaultOptions, ...options };
        const graph = {
            id: 'root',
            layoutOptions: layoutOptions,
            children: getNodes(),
            edges: getEdges(),
        };

        elk.layout(graph)
            .then(({ children }) => {
            // By mutating the children in-place we saves ourselves from creating a
            // needless copy of the nodes array.
            children.forEach((node) => {
                node.position = { x: node.x, y: node.y };
            });

            setNodes(children);
            window.requestAnimationFrame(() => {
                fitView();
            });
        });
    }, []);

    return { getLayoutedElements };
};

// 布局流程
const LayoutFlow = () => {
    //
    const { fitView } = useReactFlow();
    // 初始化节点
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // 初始化边
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const { getLayoutedElements } = useLayoutedElements();

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        >
            <Panel position="top-right">
                <button
                    onClick={() =>
                        getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'DOWN' })
                    }
                >
                    vertical layout
                </button>
                <button
                    onClick={() =>
                        getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' })
                    }
                >
                    horizontal layout
                </button>
                <button
                    onClick={() =>
                        getLayoutedElements({
                            'elk.algorithm': 'org.eclipse.elk.radial',
                        })
                    }
                >
                    radial layout
                </button>
                <button
                    onClick={() =>
                        getLayoutedElements({
                            'elk.algorithm': 'org.eclipse.elk.force',
                        })
                    }
                >
                    force layout
                </button>
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
