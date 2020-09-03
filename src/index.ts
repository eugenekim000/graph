export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export class Graph {
  graphDictionary: { [key: string]: Node };

  constructor() {
    this.graphDictionary = {};
  }

  addRoute(input: string): Graph {
    if (!this.graphDictionary[input[0]])
      this.graphDictionary[input[0]] = new Node(input[0]);
    this.graphDictionary[input[0]].addOutbound(input[1], input[2]);
    return this;
  }

  getDistance(input: string): number | string {
    let totalDistance = 0;
    if (!this.graphDictionary[input[0]]) return 'NO SUCH ROUTE';
    let index = 0;

    while (index + 1 < input.length) {
      let nodeDistance = this.graphDictionary[input[index]].findDistance(
        input[index + 1]
      );
      if (nodeDistance === -1) {
        totalDistance = -1;
        break;
      }

      totalDistance += nodeDistance;
      index++;
    }

    return totalDistance === -1 ? 'NO SUCH ROUTE' : totalDistance;
  }

  getNumTripsMax(
    start: string,
    finish: string,
    maxStops: number
  ): number | string {
    if (!this.graphDictionary[start]) return 'NO SUCH ROUTE';
    let numTrips = 0;
    const initialRoutes = Object.keys(this.graphDictionary[start].outbound);

    let queue = initialRoutes;
    let numberOfStops = 0;

    while (queue.length > 0 && numberOfStops < maxStops) {
      let nextQueue: string[] = [];
      console.log(queue);

      for (let i = 0; i < queue.length; i++) {
        if (queue[i] === finish) {
          numTrips++;
          continue;
        }

        const neighbors = Object.keys(this.graphDictionary[queue[i]].outbound);
        nextQueue = [...nextQueue, ...neighbors];
      }
      queue = nextQueue;
      numberOfStops++;
    }

    return numTrips === 0 ? 'NO SUCH ROUTE' : numTrips;
  }

  getNumTripsExact(
    start: string,
    finish: string,
    exactStop: number
  ): number | string {
    if (!this.graphDictionary[start]) return 'NO SUCH ROUTE';
    const initialRoutes = Object.keys(this.graphDictionary[start].outbound);

    let queue = initialRoutes;
    let numberOfStops = 0;

    while (queue.length > 0 && numberOfStops < exactStop) {
      let nextQueue: string[] = [];
      for (let i = 0; i < queue.length; i++) {
        const neighbors = Object.keys(this.graphDictionary[queue[i]].outbound);
        nextQueue = [...nextQueue, ...neighbors];
      }
      queue = nextQueue;
      numberOfStops++;
    }

    return numberOfStops !== exactStop
      ? 'NO SUCH ROUTE'
      : queue.filter(char => char === finish).length;
  }
}

export class Node {
  location: string;
  outbound: { [key: string]: number };

  constructor(name: string) {
    this.location = name;
    this.outbound = {};
  }

  addOutbound(outbound: string, distance: string): Node {
    this.outbound[outbound] = Number(distance);
    return this;
  }

  findDistance(route: string): number {
    if (this.outbound[route[0]]) return this.outbound[route];
    return -1;
  }
}
