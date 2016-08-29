'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
        var _ret = function () {
            var rings = [];
            feature.geometry.coordinates.forEach(function (ring) {
                if (filterFn(ring)) rings.push(ring);
            });
            if (rings.length === 0) throw new Error('All rings removed!');
            return {
                v: (0, _turfPolygon2.default)(rings, feature.properties || {})
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else if (feature.geometry.type === 'MultiPolygon') {
        var _ret2 = function () {
            var outerRings = [];
            feature.geometry.coordinates.forEach(function (outerRing) {
                var rings = [];
                outerRing.forEach(function (ring) {
                    if (filterFn(ring)) rings.push(ring);
                });
                outerRings.push(rings);
            });
            return {
                v: (0, _turfMultipolygon2.default)(outerRings, feature.properties || {})
            };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    } else {
        throw new Error('Input feature must be a Polygon or MultiPolygon!');
    }
};

exports.default = filterRings;
