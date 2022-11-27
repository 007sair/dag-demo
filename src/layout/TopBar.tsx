import { Typography, Toolbar, AppBar } from "@mui/material";

export default () => {
  return (
    <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DAG DEMO
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
