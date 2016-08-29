# turf-filter-rings
Filter polygon rings to remove slivers from geojson features.

# Example

```javascript
import filterRings from 'turf-filter-rings';
import polygon from 'turf-polygon';
import area from 'turf-area';

// define a polygon
const polygonWithSlivers = polygon(...);

// define your filter function. It will be executed for each ring.
// Here a ring with less than 10000 square meters will be filtered out 
const size = 10000;
const filterFn = (ring) => area(polygon([ring])) > size;

const polygonWithoutSlivers = filterRings(polygonWithSlivers, filterFn);

```




