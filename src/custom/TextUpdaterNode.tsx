import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

// 自定义节点
function TextUpdaterNode({ data, isConnectable }) {

    // 输入框值改变
    const onChange = useCallback((evt) => {
        console.log("节点输入值", evt.target.value);
    }, []);

    const handleStyle = { left: 10 };

    return (
        <div className="text-updater-node">
            {/*句柄 (流入)*/}
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag" />
            </div>
            {/*句柄 (流出、底部)*/}
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
            {/*句柄 (流出、底部)*/}
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}

export default TextUpdaterNode;
