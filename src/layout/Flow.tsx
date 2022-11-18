import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import type { ReactFlowInstance, Node } from "reactflow";
import useStore from "@/store/index";
import { nanoid } from "nanoid";
import { Drawer } from "@mui/material";
import OperatorProps from "@/layout/Props";
import { Box, Toolbar } from "@mui/material";
import useOperatorJSON from "@/components/useOperatorJSON";

const drawerWidth = 400;

export default () => {
  const json = useOperatorJSON();
  const ref = useRef<HTMLDivElement>(null);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const { activeNode, nodes, edges, onConnect, onNodesChange, onEdgesChange, setActiveNode } = useStore();

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!ref.current || !rfInstance || !json) return;

      const rfBounds = ref.current.getBoundingClientRect();
      const operatorName = e.dataTransfer.getData("application/reactflow") as string;
      const operator = json.operators[operatorName];
      const { type } = operator;
      const [offsetX, offsetY] = e.dataTransfer.getData("offset").split(",");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type || !rfBounds) {
        return;
      }

      const position = rfInstance.project({
        x: e.clientX - rfBounds.left - Number(offsetX),
        y: e.clientY - rfBounds.top - Number(offsetY),
      });

      const newNode: Node = {
        id: `node_${nanoid(10)}`,
        type,
        position,
        data: { label: operator.fixedArgs.opClass, operator },
        className: "node-operator",
      };

      rfInstance?.addNodes(newNode);
    },
    [json]
  );

  return (
    <Box ref={ref} sx={{ flex: 1 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDoubleClick={(_, node) => {
          setActiveNode(node);
        }}
        onPaneClick={() => {
          if (activeNode) {
            setActiveNode(null);
          }
        }}
        proOptions={{
          hideAttribution: true,
        }}
        zoomOnDoubleClick={false}
      >
        <Background />
        <Controls />
        <MiniMap />

        <Drawer
          open={!!activeNode}
          anchor="right"
          variant="persistent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxShadow: 3,
            },
          }}
        >
          <Toolbar />
          <OperatorProps />
        </Drawer>
      </ReactFlow>
    </Box>
  );
};
