import { BaseEdge, getStraightPath } from 'reactflow';

// 自定义边
function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    // 直线
    /**
     * getBezierPath 曲线
     * getSimpleBezierPath 简单曲线
     * getSmoothStepPath 光滑步骤
     * getStraightPath 直线
     */
    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
        </>
    );
}

export default CustomEdge;
