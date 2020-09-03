import { Graph } from '../src';

describe('add graoh', () => {
  const graph = new Graph();

  graph
    .addRoute('AB5')
    .addRoute('BC4')
    .addRoute('CD8')
    .addRoute('DC8')
    .addRoute('DE6')
    .addRoute('AD5')
    .addRoute('CE2')
    .addRoute('EB3')
    .addRoute('AE7');

  it('should add vertices', () => {
    const distance1 = graph.getDistance('ABC');
    const distance2 = graph.getDistance('AD');
    const distance3 = graph.getDistance('ADC');
    const distance4 = graph.getDistance('AEBCD');
    const distance5 = graph.getDistance('AED');
    expect(distance1).toEqual(9);
    expect(distance2).toEqual(5);
    expect(distance3).toEqual(13);
    expect(distance4).toEqual(22);
    expect(distance5).toEqual('NO SUCH ROUTE');
  });

  it('should find number of trips with max stops', () => {
    const maxTrip2 = graph.getNumTripsMax('C', 'C', 3);
    expect(maxTrip2).toEqual(2);
  });

  it('should find number of trips with exact stops', () => {
    const maxTrip2 = graph.getNumTripsExact('A', 'C', 4);
    expect(maxTrip2).toEqual(3);
  });
});
