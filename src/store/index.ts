import create from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_NAME } from "@/const";

export type State = {
  activeNodeId: string | null;
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setActiveNodeId: (nodeId: string | null) => void;
  updateNodeOperator: (nodeId: string, operator: Operator) => void;
};

const useStore = create(
  persist<State>(
    (set, get) => ({
      activeNodeId: null,
      nodes: [],
      edges: [],
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      setActiveNodeId: (nodeId) => {
        set({ activeNodeId: nodeId });
      },
      updateNodeOperator: (nodeId: string, operator: Operator) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, operator } };
            }
            return node;
          }),
        });
      },
    }),
    {
      name: LOCAL_STORAGE_NAME,
    }
  )
);

export default useStore;
