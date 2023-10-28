import Graph from "react-vis-network-graph";
import Operations from "./components/Operations";
import { useEffect, useState } from "react";
import Stats from "./components/Stats";

const graphInitialData = {
  nodes: [
    { id: 0, label: "Node 0", shape: "circle" },
    { id: 1, label: "Node 1", shape: "circle" },
    { id: 2, label: "Node 2", shape: "circle" },
    { id: 3, label: "Node 3", shape: "circle" },
    { id: 4, label: "Node 4", shape: "circle" },
    { id: 5, label: "Node 5", shape: "circle" },
  ],
  edges: [
    { from: 0, to: 1, label: "10" },
    { from: 0, to: 2, label: "10" },
    { from: 2, to: 3, label: "10" },
    { from: 3, to: 4, label: "10" },
    { from: 5, to: 0, label: "10" },
  ],
};

export default function App() {
  const [graphState, setGraphState] = useState<{
    nodes: { id: number; label: string; shape: string }[];
    edges: { from: number; to: number; label: string }[];
  }>({ nodes: [], edges: [] });

  const graph: Map<number, { successeurs: number[]; predecesseurs: number[] }> = new Map();

  for (const edge of graphState.edges) {
    if (!graph.has(edge.from)) {
      graph.set(edge.from, {
        successeurs: [],
        predecesseurs: [],
      });
    }

    if (!graph.has(edge.to)) {
      graph.set(edge.to, {
        successeurs: [],
        predecesseurs: [],
      });
    }

    graph.get(edge.from)!.successeurs.push(edge.to);
    graph.get(edge.to)!.predecesseurs.push(edge.from);
  }

  useEffect(() => {
    setGraphState(graphInitialData);
  }, []);

  var options = {
    nodes: {
      size: 40,
      color: {
        background: "#4B5563",
        border: "#4B5563",
      },
      font: { color: "white" },
    },
    edges: {
      color: "white",
      shadow: true,
      smooth: {
        enabled: true,
      },
    },
    height: "900px",

    // layout: {
    //   hierarchical: {
    //     enabled: true
    //   }
    // }
  };

  return (
    <div className="bg-zinc-950">
      <Graph graph={graphState} options={options} />
      <Operations
        graphState={graphState}
        setGraphState={setGraphState}
        graph={graph}
      />
      <Stats
        graphState={graphState}
        setGraphState={setGraphState}
        graph={graph}
      />
    </div>
  );
}
