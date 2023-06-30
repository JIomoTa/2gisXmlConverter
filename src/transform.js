import * as convertXml from 'xml-js';
import {  distance, radToDeg, mapPointFromLngLat } from './math.js';

function transform(xml) {
  let result = convertXml.xml2js(xml, {compact: true});
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

export { transform };