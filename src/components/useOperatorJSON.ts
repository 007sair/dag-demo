import { useRequest } from "ahooks";

type OperatorJSON = {
  operatorNames: string[];
  operators: Record<string, Operator>;
};

const fetchJSON = async (): Promise<OperatorJSON> => {
  const res = await fetch("/operators.json");
  return await res.json();
};

const useOperatorJSON = () => {
  const { data } = useRequest(fetchJSON);
  return data;
};

export default useOperatorJSON;
