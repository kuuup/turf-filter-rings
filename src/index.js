import polygon from 'turf-polygon';
import multiPolygon from 'turf-multipolygon';

/**
 * Takes a Polygon or MultiPolygon feature and removes Rings not matched by a given filter function
 * @param {Feature<(Polygon|MultiPolygon)>} geom geometry to be filtered
 * @param {Function} filterFn filter function (takes ring as parameter)
 * @return {(Polygon|MultiPolygon)} filtered geometry
 */
const filterRings = (feature, filterFn) => {
    if(feature.geometry.type === 'Polygon') {
        let rings = [];
        feature.geometry.coordinates.forEach(ring => {
            if(filterFn(ring)) rings.push(ring);
        });
        if(rings.length === 0) throw new Error('All rings removed!')
        return polygon(rings, feature.properties || {});
    } else if(feature.geometry.type === 'MultiPolygon') {
        let outerRings = [];
        feature.geometry.coordinates.forEach(outerRing => {
            let rings = [];
            outerRing.forEach(ring => {
                if(filterFn(ring)) rings.push(ring);
            });
            outerRings.push(rings);
        });
        return multiPolygon(outerRings, feature.properties || {});
    } else {
        throw new Error('Input feature must be a Polygon or MultiPolygon!');
    }
};

export default filterRings;
