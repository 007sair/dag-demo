import { Box, Typography, Toolbar, AppBar, Button } from "@mui/material";

export default () => {
  return (
    <Box>
      <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DAG DEMO
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
