function distance(p1, p2){
  let distance = Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
  return distance;
};

function clamp(value, min, max) {
  value = Math.max(value, min);
  value = Math.min(value, max);
  return value;
};
  
function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
};

function radToDeg(rad){
  return rad * (180 / Math.PI);
};

const worldSize = 2 ** 32;

function mapPointFromLngLat(lngLat) {
  const sin = Math.sin(degToRad(lngLat[1]));

  const x = (lngLat[0] * worldSize) / 360;
  const y = (Math.log((1 + sin) / (1 - sin)) * worldSize) / (4 * Math.PI);

  const worldHalf = worldSize / 2;
  return [clamp(x, -worldHalf, worldHalf), clamp(y, -worldHalf, worldHalf)];
};

export { distance, clamp, degToRad, radToDeg, mapPointFromLngLat };

// module.exports = {
//   distance: distance,
//   clamp: clamp,
//   degToRad: degToRad,
//   radToDeg: radToDeg,
//   mapPointFromLngLat: mapPointFromLngLat
// }