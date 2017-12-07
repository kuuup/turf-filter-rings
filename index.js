'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _turfPolygon = require('turf-polygon');

var _turfPolygon2 = _interopRequireDefault(_turfPolygon);

var _turfMultipolygon = require('turf-multipolygon');

var _turfMultipolygon2 = _interopRequireDefault(_turfMultipolygon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a Polygon or MultiPolygon feature and removes Rings not matched by a given filter function
 * @param {Feature<(Polygon|MultiPolygon)>} geom geometry to be filtered
 * @param {Function} filterFn filter function (takes ring as parameter)
 * @return {(Polygon|MultiPolygon)} filtered geometry
 */
var filterRings = function filterRings(feature, filterFn) {
    if (feature.geometry.type === 'Polygon') {
        var rings = [];
        feature.geometry.coordinates.forEach(function (ring) {
            if (filterFn(ring)) rings.push(ring);
        });
        if (rings.length === 0) throw new Error('All rings removed!');
        return (0, _turfPolygon2.default)(rings, feature.properties || {});
    } else if (feature.geometry.type === 'MultiPolygon') {
        var outerRings = [];
        feature.geometry.coordinates.forEach(function (outerRing) {
            var rings = [];
            outerRing.forEach(function (ring) {
                if (filterFn(ring)) rings.push(ring);
            });
            if (rings.length > 0) outerRings.push(rings);
        });
        if (outerRings.length < 1) {
            throw new Error('All rings removed!');
        }
        return (0, _turfMultipolygon2.default)(outerRings, feature.properties || {});
    } else {
        throw new Error('Input feature must be a Polygon or MultiPolygon!');
    }
};

exports.default = filterRings;
