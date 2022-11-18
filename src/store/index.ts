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

export const LocalStorageName = "dag-demo";

export type State = {
  activeNode: Node<NodeData> | null;
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setActiveNode: (node: Node<NodeData> | null) => void;
  updateNodeOperator: (nodeId: string, operator: Operator) => void;
};

const useStore = create(
  persist<State>(
    (set, get) => ({
      activeNode: null,
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
      setActiveNode: (node) => {
        set({ activeNode: node });
      },
      updateNodeOperator: (nodeId: string, operator: Operator) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return {
                ...node,
                data: {
                  ...node.data,
                  operator,
                },
              };
            }
            return node;
          }),
        });
      },
    }),
    {
      name: LocalStorageName,
    }
  )
);

export default useStore;
