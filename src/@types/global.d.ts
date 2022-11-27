/**
 * 单个算子配置
 */
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

/**
 * 算子JSON配置
 */
type OperatorJSON = {
  operatorNames: string[];
  operators: Record<string, Operator>;
};

/**
 * ReactFlow Node节点配置
 */
type NodeData = {
  label: string;
  operator: Operator;
};
