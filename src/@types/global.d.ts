type Operator = {
  type: "input" | "default" | "output";
  fixedArgs: {
    opName: string;
    opType: "INPUT" | "OPERATOR" | "SINK";
    opClass: string;
    input: string;
    output: string;
  };
  properties: object;
};

type NodeData = {
  label: string;
  operator: Operator;
};
