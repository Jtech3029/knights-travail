import { Node } from "./node.js";

/**
 * takes a two coordinate locations on a chessboard and returns
 * the (hopefully) shortest path between the two points
 * @param {array} moveOne
 * @param {array} moveTwo
 * @returns travelPath
 */
function knightMoves(moveOne, moveTwo) {
  //declares root and needed variables
  const root = Node(moveOne);
  const possibleMoves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];
  let travelPath = [];

  //calls find path to find the path
  travelPath = findPath(root, moveTwo, possibleMoves);

  if(travelPath == null) {
    travelPath = [];
  }
  travelPath = travelPath.map((node) => node.value);

  return travelPath;
}

/**
 * Using Breadth First Search, it scans the path from the node
 * to the final destination
 * @param {object} node
 * @param {array} finalDestination
 * @param {array} possibleMoves
 * @returns path
 */
function findPath(node, finalDestination, possibleMoves) {
  let queue = [node];
  let path = [];
  if (
    node.value.some((value) => value > 8 || value < 0) ||
    finalDestination.some((value) => value > 8 || value < 0)
  ) {
    return null;
  }
  //until the first entry of queue is equal to the final destination,
  //make children, remove the first entry and scan again until
  //a valid entry is found

  while (areEqual(queue[0].value, finalDestination) == false) {
    let children = makeChildren(queue[0], possibleMoves);
    queue = queue.concat(children);
    queue.splice(0, 1);
  }

  //scan through the path made by the valid entry until the root node
  //has been found
  let pathTraveler = queue[0];
  while (pathTraveler.parentNode != undefined) {
    path.push(pathTraveler);
    pathTraveler = pathTraveler.parentNode;
    if (pathTraveler.parentNode == undefined) {
      path.push(pathTraveler);
    }
  }
  //reverse the path and return it
  path = path.reverse();
  return path;
}

/**
 * uses a parent value and a set of possible moves
 * and returns a set of possible moves from the parent
 * value
 * @param {object} parent
 * @param {array} possibleMoves
 * @returns children
 */
function makeChildren(parent, possibleMoves) {
  let children = [];
  let value = [];

  //create every possible move that the knight can make
  for (let i = 0; i < possibleMoves.length; i++) {
    value.push(parent.value[0] + possibleMoves[i][0]);
    value.push(parent.value[1] + possibleMoves[i][1]);

    let childNode = Node(value, parent);
    children.push(childNode);
    value = [];
  }

  //scan and remove any illegal moves
  for (let i = 0; i < children.length; i++) {
    if (children[i].value.some((value) => value > 8 || value < 0)) {
      children.splice(i, 1);
      i--;
    }
  }

  //return children
  return children;
}

function areEqual(array1, array2) {
  let N = array1.length;
  let M = array2.length;
  if (N != M) return false;

  // Linearly compare elements
  for (let i = 0; i < N; i++) if (array1[i] != array2[i]) return false;

  // If all elements were same.
  return true;
}
let x = knightMoves([1, 1], [8, 1]);
console.log(`You made it in ${x.length} moves! Here's your path: `);
x.forEach((entry) => console.log(entry));

export { knightMoves };