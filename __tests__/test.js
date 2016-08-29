import polygon from 'turf-polygon';
import multiPolygon from 'turf-multipolygon';
import lineString from 'turf-linestring';
import area from 'turf-area';

import filterRings from '../src';

jest.unmock('turf-polygon');
jest.unmock('turf-multipolygon');
jest.unmock('turf-linestring');
jest.unmock('turf-area');
jest.unmock('../src');

describe('Testing different inputs', () => {

    const line = lineString([ [ 6.657543182373047, 49.76992903330545 ], [ 6.656384468078612, 49.76444070939815 ] ])

    const hole = [ [ 6.647157669067383, 49.761640870498354 ], [ 6.649260520935059,
    49.760559701314556 ], [ 6.648659706115723, 49.758785422717665 ], [
    6.6449689865112305, 49.758785422717665 ], [ 6.645140647888183, 49.76089237132352 ], [
    6.647157669067383, 49.761640870498354 ] ];

    const singlePolygon = polygon([ hole, [ [
    6.643853187561035, 49.76455159077848 ], [ 6.637115478515625, 49.76147453834698 ], [
    6.639647483825684, 49.75642885858046 ], [ 6.649775505065918, 49.75470988074122 ], [
    6.654496192932129, 49.758286395164376 ], [ 6.6512346267700195,
    49.763692253447665 ], [ 6.643853187561035, 49.76455159077848 ] ] ]);

    const singlePolygonGoodResult = polygon([ [ [
    6.643853187561035, 49.76455159077848 ], [ 6.637115478515625, 49.76147453834698 ], [
    6.639647483825684, 49.75642885858046 ], [ 6.649775505065918, 49.75470988074122 ], [
    6.654496192932129, 49.758286395164376 ], [ 6.6512346267700195,
    49.763692253447665 ], [ 6.643853187561035, 49.76455159077848 ] ] ]);

    const multipolygon = multiPolygon([ [ hole, [ [
    6.643853187561035, 49.76455159077848 ], [ 6.637115478515625, 49.76147453834698 ], [
    6.639647483825684, 49.75642885858046 ], [ 6.649775505065918, 49.75470988074122 ], [
    6.654496192932129, 49.758286395164376 ], [ 6.6512346267700195,
    49.763692253447665 ], [ 6.643853187561035, 49.76455159077848 ] ] ] ]);

    const multiPolygonGoodResult = multiPolygon([ [ [ [
    6.643853187561035, 49.76455159077848 ], [ 6.637115478515625, 49.76147453834698 ], [
    6.639647483825684, 49.75642885858046 ], [ 6.649775505065918, 49.75470988074122 ], [
    6.654496192932129, 49.758286395164376 ], [ 6.6512346267700195,
    49.763692253447665 ], [ 6.643853187561035, 49.76455159077848 ] ] ] ]);

    const size = area(polygon([hole]));

    const filterFn = (ring) => area(polygon([ring])) > size;

    describe('Polygon', () => {
        it('sould filter hole', () => {
            const resultSingle = filterRings(singlePolygon, filterFn);
            expect(JSON.stringify(resultSingle)).toEqual(JSON.stringify(singlePolygonGoodResult));
        });
    });

    describe('MultiPolygon', () => {
        it('sould filter hole', () => {
            const resultMulti = filterRings(multipolygon, filterFn);
            expect(JSON.stringify(resultMulti)).toEqual(JSON.stringify(multiPolygonGoodResult));
        });
    });

    describe('LineString', () => {
        it('sould fail', () => {
            expect(() => filterRings(line, filterFn)).toThrow(new Error('Input feature must be a Polygon or MultiPolygon!'));
        });
    });
});
