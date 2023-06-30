import { xml2js } from 'xml-js';
import {  distance, radToDeg, mapPointFromLngLat } from './math.js';

function transformFromXml(xml) {
  let result = xml2js(xml, {compact: true});
  let lngLat = [result.buildings.building._attributes.lon, result.buildings.building._attributes.lat];
  let dirLngLat = [result.buildings.building._attributes.direction_lon, result.buildings.building._attributes.direction_lat];
  let lngLatMP = mapPointFromLngLat(lngLat);
  let dirLngLatMP = mapPointFromLngLat(dirLngLat);

  let BC = dirLngLatMP[1] - lngLatMP[1];
  let AC = dirLngLatMP[0] - lngLatMP[0];
  let alphaRad = Math.atan2(BC, AC);

  let content = [];

  for (let i = 0; i < result.buildings.building.part.length; i ++){
      let obj = {
        coordinates: [parseFloat(lngLat[0]), parseFloat(lngLat[1])],
        rotateX: 90,
        rotateY: radToDeg(alphaRad),
        scale: distance(lngLatMP, dirLngLatMP),
        modelId: result.buildings.building.part[i]._attributes.id,
        modelUrl: result.buildings.building.part[i]._attributes.model
      };
      content.push(obj)
  }

  return content;
}

function transformFromFields(obj) {
  let lngLat = [obj.lon, obj.lat];
  let dirLngLat = [obj.direction_lon, obj.direction_lat];
  let lngLatMP = mapPointFromLngLat(lngLat);
  let dirLngLatMP = mapPointFromLngLat(dirLngLat);

  let BC = dirLngLatMP[1] - lngLatMP[1];
  let AC = dirLngLatMP[0] - lngLatMP[0];
  let alphaRad = Math.atan2(BC, AC);

  return {
    coordinates: [parseFloat(lngLat[0]), parseFloat(lngLat[1])],
    rotateX: 90,
    rotateY: radToDeg(alphaRad),
    scale: distance(lngLatMP, dirLngLatMP),
  };
}

export { transformFromXml, transformFromFields };