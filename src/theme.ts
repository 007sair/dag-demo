import type { ThemeOptions } from "@mui/material";

export const commonTheme: ThemeOptions = {
  typography: {
    fontSize: 12,
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
};
