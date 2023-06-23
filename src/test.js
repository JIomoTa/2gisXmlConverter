let imported_transform = require('./transform.js');

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

  let jsonObj = imported_transform.transform(input);

  if (etalon !== JSON.stringify(jsonObj, null, 2)) {
    console.error("Тест не пройден!");
    console.log(JSON.stringify(jsonObj, null, 2))
  } else {
    console.log('Тест пройден!')
  };
}

module.exports = {
  unitTest: unitTest
};