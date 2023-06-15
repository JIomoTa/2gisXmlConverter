let cord;
let lngLat;
let dirLngLat;
let lngLatMP;
let dirLngLatMP;

function transform(xml) {
  let result = mantaXML.xml2JSON(xml);
  cord = result;
  lngLat = [result.building._attrs.lon, result.building._attrs.lat];
  dirLngLat = [result.building._attrs.direction_lon, result.building._attrs.direction_lat];
  lngLatMP = mapPointFromLngLat(lngLat);
  dirLngLatMP = mapPointFromLngLat(dirLngLat);
  let jsonObj = {
    coordinates: [parseFloat(lngLat[0]), parseFloat(lngLat[1])],
    rotateY: radians_to_degrees(alphaRad), 
    scale: distance(lngLatMP, dirLngLatMP),
    modelURL: result.building.part._attrs.model
  };
  return jsonObj;
}

let button = document.getElementById('convert');
button.addEventListener('click', function () {
  let xml = document.getElementById('inputXML').value;
  let jsonObj = transform(xml);
  document.getElementById('json').value = JSON.stringify(jsonObj, null, 2);  
});

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

function unitTest(){
  let input = `<building lat="56.134743473834099" lon="47.245286302641034" direction_lat="56.13474113846106" direction_lon="47.245301809161901">
              <part id="70030076555823021" model="zgktechnology1.glb" />
            </building>`;
  let etalon = `{
  "coordinates": [
    47.245286302641034,
    56.1347434738341
  ],
  "rotateY": -15.124007273903898,
  "scale": 191.63767893626522,
  "modelURL": "zgktechnology1.glb"
}`;

  let jsonObj = transform(input);

  if (etalon !== JSON.stringify(jsonObj, null, 2)) {
    console.error("Тест не пройден!");
    console.log(JSON.stringify(jsonObj, null, 2))
  } else {
    console.log('Тест пройден!')
  };
}

unitTest();