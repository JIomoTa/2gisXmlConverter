import { transformFromFields, transformFromXml } from './transform.js';

function unitTestXml(){
  let input = `    <?xml version="1.0" encoding="UTF-8"?>
  <buildings>
      <building lat="56.134743473834099" lon="47.245286302641034" direction_lat="56.13474113846106" direction_lon="47.245301809161901">
        <part id="70030076555821177" model="zgktechnology1.glb" />    
        <part id="70030076555823021" model="zgktechnology2.glb" />
        <part id="70030076561388553" model="zgktechnology_construction.glb" />
      </building>
  </buildings>`;
  let etalon = [{
    "coordinates": [
      47.245286302641034,
      56.1347434738341
    ],
    "rotateX": 90,
    "rotateY": -15.124007273903898,
    "scale": 191.63767893626522,
    "modelId": "70030076555821177", 
    "modelUrl": "zgktechnology1.glb"
  }, {
    "coordinates": [
      47.245286302641034,
      56.1347434738341
    ],
    "rotateX": 90,
    "rotateY": -15.124007273903898,
    "scale": 191.63767893626522,
    "modelId": "70030076555823021", 
    "modelUrl": "zgktechnology2.glb"
  }, {
    "coordinates": [
      47.245286302641034,
      56.1347434738341
    ],
    "rotateX": 90,
    "rotateY": -15.124007273903898,
    "scale": 191.63767893626522,
    "modelId": "70030076561388553", 
    "modelUrl": "zgktechnology_construction.glb"
  }];

  let jsonObj = transformFromXml(input);
  
  if (JSON.stringify(etalon) === JSON.stringify(jsonObj)) {
    console.log('unitTestXml пройден!');
  } else {
    console.error("unitTestXml не пройден!");
  };
}

function unitTestFields(){
  let input = {
    lat: "56.134743473834099",
    lon: "47.245286302641034",
    direction_lon: "47.245301809161901",
    direction_lat: "56.13474113846106"
  }
  let etalon = {
    "coordinates": [
      47.245286302641034,
      56.1347434738341
    ],
    "rotateX": 90,
    "rotateY": -15.124007273903898,
    "scale": 191.63767893626522
  };

  let jsonObj = transformFromFields(input);

  if (JSON.stringify(etalon) === JSON.stringify(jsonObj)) {
    console.log('unitTestFields пройден!')
  } else {
    console.error("unitTestFields не пройден!");
  };
}

export { unitTestXml, unitTestFields };