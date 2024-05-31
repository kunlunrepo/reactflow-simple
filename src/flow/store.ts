import { create } from 'zustand';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';

import initialNodes from './nodes';
import initialEdges from './edges';

export type NodeData = {
    color: string;
};

type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    updateNodeColor: (nodeId: string, color: string) => void;
};

// 获取存储的部分并调用操作
const useStore = create<RFState>((set, get) => ({
    // 初始化节点
    nodes: initialNodes,
    // 初始化边
    edges: initialEdges,
    // 节点变化
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    // 边变化
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    // 连接变化
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    // 设置节点
    setNodes: (nodes: Node[]) => {
        set({ nodes });
    },
    // 设置边
    setEdges: (edges: Edge[]) => {
        set({ edges });
    },
    // 更新颜色
    updateNodeColor: (nodeId: string, color: string) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    // it's important to create a new object here, to inform React Flow about the changes
                    node.data = { ...node.data, color };
                }
                return node;
            }),
        });
    },
}));

export default useStore;
