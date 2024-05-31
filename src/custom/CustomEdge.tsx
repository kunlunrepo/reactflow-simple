import { BaseEdge, getStraightPath, useReactFlow, EdgeLabelRenderer } from 'reactflow';

// 自定义边
function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    // 直线
    /**
     * getBezierPath 曲线
     * getSimpleBezierPath 简单曲线
     * getSmoothStepPath 光滑步骤
     * getStraightPath 直线
     */
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    // 删除边
    const { setEdges } = useReactFlow();

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <EdgeLabelRenderer>
                <button
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                    onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
                >
                    删除
                </button>
            </EdgeLabelRenderer>
        </>
    );
}

export default CustomEdge;
