import { useState } from "react";
import { Box, Button, Modal, Stack } from "@mui/material";
import useStore, { LocalStorageName } from "@/store";
import ReactJson from "react-json-view";
import { useSnackbar } from "notistack";
import DataObjectIcon from "@mui/icons-material/DataObject";
import ExportIcon from "@mui/icons-material/GetApp";
import RemoveIcon from "@mui/icons-material/DoNotDisturb";

export default () => {
  const store = useStore();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const result = { nodes: store.nodes, edges: store.edges };

  const export2json = () => {
    let link = document.createElement("a");
    link.download = "dag.json";
    link.href = "data:text/plain," + JSON.stringify(result);
    link.click();
  };

  return (
    <>
      <Stack
        direction={"row"}
        spacing={1.5}
        sx={{ py: 1, px: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Button size="small" onClick={() => setOpen(true)} startIcon={<DataObjectIcon />}>
          预览
        </Button>
        <Button size="small" onClick={export2json} startIcon={<ExportIcon />}>
          JSON
        </Button>
        <Button
          size="small"
          startIcon={<RemoveIcon />}
          onClick={() => {
            localStorage.removeItem(LocalStorageName);
            enqueueSnackbar("本地存储已清除，请重新刷新浏览器。", {
              variant: "success",
              anchorOrigin: {
                horizontal: "center",
                vertical: "top",
              },
            });
          }}
        >
          Clear
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            height: "75%",
            overflow: "auto",
          }}
        >
          <ReactJson src={result} displayDataTypes={false}></ReactJson>
        </Box>
      </Modal>
    </>
  );
};
