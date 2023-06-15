let lngLat;
let dirLngLat;
let lngLatMP;
let dirLngLatMP;
let inputObj = {
};

// $("#convert").on("click",function() {
//   inputObj.lon = $("#inputLon").val();
//   inputObj.lat = $("#inputLat").val();
//   inputObj.direction_lon = $("#inputDirLon").val();
//   inputObj.direction_lat = $("#inputDirLat").val();
//   lngLat = [inputObj.lon, inputObj.lat];
//   dirLngLat = [inputObj.direction_lon, inputObj.direction_lat];
//   lngLatMP = mapPointFromLngLat(lngLat);
//   dirLngLatMP = mapPointFromLngLat(dirLngLat);
//   let jsonObj = {coordinates: lngLatMP, rotateY: radians_to_degrees(alphaRad), scale: distance(lngLatMP, dirLngLatMP), modelURL: "zgktechnology1.glb"};
//   $("#json").val(JSON.stringify(jsonObj, null, 2));
// });

function distance(p1, p2){
  let distance = Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
  return distance;
};

function BC(){
  let hight = dirLngLatMP[1] - lngLatMP[1];
  return hight;
};

function AC(){
  let hight = dirLngLatMP[0] - lngLatMP[0];
  return hight;
};

function alphaRad(){
  let alphaRad = Math.atan2(BC(), AC());
  return alphaRad;
};

function radians_to_degrees(alphaRad){
  var pi = Math.PI;
  let degrees = alphaRad() * (180/pi);
  return degrees;
};

function copyResult() {
  var copyText = document.getElementById("json");
  copyText.select();
  document.execCommand("copy");
  alert("Результат сохранен в буфер обмена");
};

const worldSize = 2 ** 32;

function clamp(value, min, max) {
  value = Math.max(value, min);
  value = Math.min(value, max);
  return value;
};

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
};

function mapPointFromLngLat(lngLat) {
  const sin = Math.sin(degToRad(lngLat[1]));

  const x = (lngLat[0] * worldSize) / 360;
  const y = (Math.log((1 + sin) / (1 - sin)) * worldSize) / (4 * Math.PI);

  const worldHalf = worldSize / 2;
  return [clamp(x, -worldHalf, worldHalf), clamp(y, -worldHalf, worldHalf)];
};