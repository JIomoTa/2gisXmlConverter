let transform = require('./transform.js');
let test = require('./test.js');

let button = document.getElementById('convert');
button.addEventListener('click', function () {
    let xml = document.getElementById('inputXML').value;
    let jsonObj = transform.transform(xml);
    document.getElementById('json').value = JSON.stringify(jsonObj, null, 2);  
});

let copyButton = document.getElementById('copyResult');
copyButton.addEventListener('click', function() {
    let copyText = document.getElementById("json");
    copyText.select();
    document.execCommand("copy");
    alert("Результат сохранен в буфер обмена");
});

test.unitTest();