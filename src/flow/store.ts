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

type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
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
}));

export default useStore;
