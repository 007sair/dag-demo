import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      // @see: https://mui.com/zh/material-ui/guides/styled-engine/
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
});
