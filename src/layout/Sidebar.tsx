import { Box, Typography, Stack } from "@mui/material";
import useOperatorJSON from "@/components/useOperatorJSON";

export default () => {
  const json = useOperatorJSON();

  if (!json) {
    return null;
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, operatorName: string) => {
    e.dataTransfer.setData("application/reactflow", operatorName);
    e.dataTransfer.effectAllowed = "move";

    const { left, top } = e.currentTarget.getBoundingClientRect();
    // 鼠标与拖拽的元素之间的偏移量，在放下时使用
    const offset = { x: e.clientX - left, y: e.clientY - top };
    e.dataTransfer.setData("offset", `${offset.x},${offset.y}`);
  };

  return (
    <Box
      sx={{
        boxShadow: 5,
        fontSize: 12,
        bgcolor: "#fcfcfc",
      }}
    >
      <Box sx={{ p: 1.3, mb: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle1">算子列表</Typography>
      </Box>
      <Stack alignItems={"center"} spacing={2} sx={{ px: 3 }}>
        {json.operatorNames.map((op) => {
          const { fixedArgs } = json.operators[op];
          return (
            <div key={op} className="node-operator" onDragStart={(event) => onDragStart(event, op)} draggable>
              {fixedArgs.opClass}
            </div>
          );
        })}
      </Stack>
    </Box>
  );
};
