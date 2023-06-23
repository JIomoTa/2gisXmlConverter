let mantaXML = require('../script/manta_xml.umd');
let mathUtils = require('./math.js');

function transform(xml) {
  let result = mantaXML.xml2JSON(xml);
  let lngLat = [result.building._attrs.lon, result.building._attrs.lat];
  let dirLngLat = [result.building._attrs.direction_lon, result.building._attrs.direction_lat];
  let lngLatMP = mathUtils.mapPointFromLngLat(lngLat);
  let dirLngLatMP = mathUtils.mapPointFromLngLat(dirLngLat);

  let BC = dirLngLatMP[1] - lngLatMP[1];
  let AC = dirLngLatMP[0] - lngLatMP[0];
  let alphaRad = Math.atan2(BC, AC);

  return {
    coordinates: [parseFloat(lngLat[0]), parseFloat(lngLat[1])],
    rotateY: mathUtils.radToDeg(alphaRad), 
    scale: mathUtils.distance(lngLatMP, dirLngLatMP),
    modelURL: result.building.part._attrs.model
  };
}

module.exports = {
  transform: transform
};