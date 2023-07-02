import { transformFromXml, transformFromFields } from './transform.js';

let btnConvertPage1 = document.getElementById('convert');
let btnConvertPage2 = document.getElementById('convertData');

if (btnConvertPage1 !== null) {
    btnConvertPage1.addEventListener('click', function () {
        let xml = document.getElementById('inputXML').value;
        if (document.getElementById('inputXML').value === null) {}
        let obj = transformFromXml(xml);
        document.getElementById('json').value = JSON.stringify(obj, null, 2);  
    });
} else {
    btnConvertPage2.addEventListener('click', function () {
        let obj = {};
        obj.lat = document.getElementById('inputLat').value;
        obj.lon = document.getElementById('inputLon').value;
        obj.direction_lat = document.getElementById('inputDirLat').value;
        obj.direction_lon = document.getElementById('inputDirLon').value;
        obj = transformFromFields(obj);
        document.getElementById('json').value = JSON.stringify(obj, null, 2);  
    });
}

let copyButton = document.getElementById('copyResult');
copyButton.addEventListener('click', function() {
    let copyText = document.getElementById("json");
    copyText.select();
    document.execCommand("copy");
    alert("Результат сохранен в буфер обмена");
});