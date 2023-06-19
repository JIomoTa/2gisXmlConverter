// transform.js
function transform(xml) {
  let result = mantaXML.xml2JSON(xml);
  let lngLat = [result.building._attrs.lon, result.building._attrs.lat];
  let dirLngLat = [result.building._attrs.direction_lon, result.building._attrs.direction_lat];
  let lngLatMP = mapPointFromLngLat(lngLat);
  let dirLngLatMP = mapPointFromLngLat(dirLngLat);

  let BC = dirLngLatMP[1] - lngLatMP[1];
  let AC = dirLngLatMP[0] - lngLatMP[0];
  let alphaRad = Math.atan2(BC, AC);

  return {
    coordinates: [parseFloat(lngLat[0]), parseFloat(lngLat[1])],
    rotateY: radToDeg(alphaRad), 
    scale: distance(lngLatMP, dirLngLatMP),
    modelURL: result.building.part._attrs.model
  };
}

// ui.js
let button = document.getElementById('convert');
button.addEventListener('click', function () {
  let xml = document.getElementById('inputXML').value;
  let jsonObj = transform(xml);
  document.getElementById('json').value = JSON.stringify(jsonObj, null, 2);  
});

function copyResult() {
  var copyText = document.getElementById("json");
  copyText.select();
  document.execCommand("copy");
  alert("Результат сохранен в буфер обмена");
};

// math.js
function distance(p1, p2){
  let distance = Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
  return distance;
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

function radToDeg(rad){
  return rad * (180 / Math.PI);
};

function mapPointFromLngLat(lngLat) {
  const sin = Math.sin(degToRad(lngLat[1]));

  const x = (lngLat[0] * worldSize) / 360;
  const y = (Math.log((1 + sin) / (1 - sin)) * worldSize) / (4 * Math.PI);

  const worldHalf = worldSize / 2;
  return [clamp(x, -worldHalf, worldHalf), clamp(y, -worldHalf, worldHalf)];
};



// test.js
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