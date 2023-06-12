const express = require('express');
const app = express();

const fs = require("fs");
fs.readFile("./bacaserialport.js", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  console.log("File data:", jsonString);
});

var { SerialPort } = require('serialport')
var { ReadlineParser } = require('@serialport/parser-readline')
const portexpress = 3000;
// Create a port
var port = new SerialPort({
    path: 'COM5',
    baudRate: 9600,
})

app.get('/', function (req, res) {
    return res.send('Perintah sedang berjalan');
})

app.get('/:action', function (req, res) {
    var action = req.params.action || req.param('action');
    if (action == 'running') {
        port.write("{\"bacadata\":\"running\"");
        return res.send('Lampu menyala bergantian!');
    }
    if (action == 'flipflop') {
        port.write("{\"bacadata\":\"flipflop\"");
        return res.send('Lampu menyala flip flop!');
    }
    if (action == 'modeoff') {
        port.write("{\"bacadata\":\"off\"");
        return res.send("Lampu LED mati!");
    }
    return res.send('Action: ' + action);
});

const lineStream = port.pipe(new ReadlineParser())

lineStream.on('data', function (data) {
    console.log('Data:', data)
})

app.listen(portexpress, () => {
    console.log(`Example app listening on port ${port}`)
})