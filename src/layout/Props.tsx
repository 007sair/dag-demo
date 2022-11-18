import { useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import useStore from "../store";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
// import AutoSave from "./AutoSave";
import { useSnackbar } from "notistack";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const renderField = (obj: Object, parent: string) => {
  return Object.keys(obj).map((k) => {
    return (
      <Box sx={{ mb: 3 }} key={k}>
        <Field component={TextField} name={`${parent}.${k}`} label={k} style={{ width: "100%" }} />
      </Box>
    );
  });
};

export default () => {
  const [value, setValue] = useState(0);
  const { activeNode, updateNodeOperator } = useStore();
  const operator = activeNode?.data.operator;
  const { enqueueSnackbar } = useSnackbar();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!operator) {
    return null;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={operator || {}}
      onSubmit={async (values, actions) => {
        try {
          console.log("submit", values);
          updateNodeOperator(activeNode.id, values);
          actions.setSubmitting(false);
          enqueueSnackbar("保存成功", {
            variant: "success",
            anchorOrigin: {
              horizontal: "center",
              vertical: "top",
            },
          });
        } catch (error) {
          if (error instanceof Error) {
            enqueueSnackbar(error.message, {
              variant: "error",
              anchorOrigin: {
                horizontal: "right",
                vertical: "top",
              },
            });
          }
        }
      }}
    >
      {({ values, handleSubmit }) => {
        return (
          <Form>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="算子配置" {...a11yProps(0)} />
                <Tab label="算子属性" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <Box sx={{ p: 2 }}>
              <TabPanel value={value} index={0}>
                {renderField(values.fixedArgs, "fixedArgs")}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {renderField(values.properties, "properties")}
              </TabPanel>
              <Button variant="contained" onClick={() => handleSubmit()}>
                保存
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
