var convertXml = require('xml-js');
let mathUtils = require('./math.js');

function transform(xml) {
  let result = convertXml.xml2js(xml, {compact: true});
  console.log(result);
  let lngLat = [result.building._attributes.lon, result.building._attributes.lat];
  let dirLngLat = [result.building._attributes.direction_lon, result.building._attributes.direction_lat];
  let lngLatMP = mathUtils.mapPointFromLngLat(lngLat);
  let dirLngLatMP = mathUtils.mapPointFromLngLat(dirLngLat);

  let BC = dirLngLatMP[1] - lngLatMP[1];
  let AC = dirLngLatMP[0] - lngLatMP[0];
  let alphaRad = Math.atan2(BC, AC);

  return {
    coordinates: [parseFloat(lngLat[0]), parseFloat(lngLat[1])],
    rotateY: mathUtils.radToDeg(alphaRad), 
    scale: mathUtils.distance(lngLatMP, dirLngLatMP),
    modelURL: result.building.part._attributes.model
  };
};


module.exports = {
  transform: transform
};