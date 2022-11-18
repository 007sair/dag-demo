import { memo } from "react";
import { Box, Avatar, Tooltip } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";

export default memo(({ data, isConnectable, selected }: NodeProps<NodeData>) => {
  const { operator } = data;
  if (!operator) return null;
  const { opClass, opName } = operator.fixedArgs;

  return (
    <Box className="node-operator" sx={{ borderColor: selected ? "#1a192b" : "none" }}>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
      <Tooltip title={opClass} placement="top">
        <Avatar sx={{ width: 24, height: 24, fontSize: 14 }}>{opClass.slice(0, 1)}</Avatar>
      </Tooltip>
      <div className="name">{opName}</div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
    </Box>
  );
});
