import { Box, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { commonTheme } from "./theme";

import TopBar from "./layout/TopBar";
import Sidebar from "./layout/Sidebar";
import Flow from "./layout/Flow";
import ToolBar from "./layout/ToolBar";

// styles
import "reactflow/dist/style.css";
import "./index.scss";

const App = () => {
  const theme = createTheme(commonTheme);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider autoHideDuration={3000}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100vw", height: "100vh" }}>
          <TopBar></TopBar>
          <Box sx={{ flex: 1, display: "flex" }}>
            <Sidebar />
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <ToolBar />
              <Flow />
            </Box>
          </Box>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
