const graph = {
  start: { A: 50, B: 20 },
  A: { C: 40, D: 20 },
  B: { A: 90, D: 90 },
  C: { D: 160, finish: 50 },
  D: { finish: 20 },
  finish: {}
};

const start = 'start';
const finish = 'finish';

const findLowestCostNode = (costs, processed) => {
  const knownNodes = Object.keys(costs)
  
  const lowestCostNode = knownNodes.reduce((lowest, node) => {
      if (lowest === null && !processed.includes(node)) {
        lowest = node;
      }
      if (costs[node] < costs[lowest] && !processed.includes(node)) {
        lowest = node;
      }
      return lowest;
  }, null);

  return lowestCostNode
};

const dijkstra = (graph, start, finish) => {

  const trackedCosts = Object.assign({finish: Infinity}, graph.start);
 

  const trackedParents = {finish: null};
  for (let child in graph.start) {
    trackedParents[child] = start;
  }
  
  const processedNodes = [];

  
  let node = findLowestCostNode(trackedCosts, processedNodes);

  while (node) {
    let costToReachNode = trackedCosts[node];
    let childrenOfNode = graph[node];
  
    for (let child in childrenOfNode) {
      let costFromNodetoChild = childrenOfNode[child]
      let costToChild = costToReachNode + costFromNodetoChild;
  
      if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
        trackedCosts[child] = costToChild;
        trackedParents[child] = node;
      }
    }
  
    processedNodes.push(node);

    node = findLowestCostNode(trackedCosts, processedNodes);
  }

  let optimalPath = [finish];
  let parent = trackedParents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = trackedParents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: trackedCosts.finish,
    path: optimalPath
  };

  return results;
};

console.log('dijkstra', dijkstra(graph, start, finish));
