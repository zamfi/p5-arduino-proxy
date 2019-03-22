const fs = require('fs');
const mime = require('mime');
const url = require('url');
const util = require('util');
const SerialPort = require("serialport");
const WebSocketServer = require('websocket').server;

const PORT = 8000;

let server = require('http').createServer(async (req, res) => {
  console.log("Got request!", req.method, req.url);
  
  let path = url.parse(req.url, true).pathname
  
  switch (path) {
  case '/': 
  case '/client.js': 
  case '/index.html':
    let safePath = path.split('/').filter(e => ! e.startsWith('.')).join('/')
    if (safePath === '/') {
      safePath = '/index.html';
    }
    try {
      let fullPath = '.' + safePath;
      if ((await util.promisify(fs.stat)(fullPath)).isFile()) {
        res.writeHead(200, {'Content-Type': mime.getType(safePath)});
        fs.createReadStream(fullPath).pipe(res);
      } else {
        console.log("unknown request", path);
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("Couldn't find your URL...");
      }
    } catch (err) {
      console.log("Error reading static file?", err);
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end("Failed to load something...try again later?");
    }
    break;
  default:
    console.log("unknown request", path);
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end("Couldn't find your URL...");
    break;
  }
});
server.listen(PORT);

let allConnections = new Set();
let serial = new SerialPort('/dev/ttyACM0', {baudRate: 115200});
serial.on('error', () => {
  console.log("Failed to connect to Arduino...please try again.");
  process.exit();
});
let parser = new SerialPort.parsers.Readline();
serial.pipe(parser);
parser.on('data', data => {
  console.log("->", data);
  for (let connection of allConnections) {
    connection.send(data);
  }
});

let wsServer = new WebSocketServer({
  httpServer: server
});
wsServer.on('request', request => {
  var connection = request.accept(null, request.origin);
  allConnections.add(connection);
    
  connection.on('message', message => {
    if (message.type !== 'utf8') {
      return;
    }
    let messageString = message.utf8Data;
    
    if (serial) {
      console.log("<-", messageString);
      serial.write(messageString+'\n');
    }
  });
  
  connection.on('close', connection => {
    allConnections.delete(connection);
  });
});

console.log("Listening on port", PORT);
