var socket;

var y = 10;
var x = 0;
var led = false;

function setup() {
  createCanvas(400, 200);
  background(255);
  // make a websocket connection to the server we loaded this page from.
  socket = new WebSocket(`ws://${window.location.host}/comm`);
    
  // when the socket closes, issue an alert.
  socket.addEventListener('close', () => {
    alert("Socket connection to server closed.");
  });
    
  // when there's a message from the server, use the handleMessage function
  // to handle it.
  socket.addEventListener('message', message => {
    handleMessage(message);
  }); 
}

function handleMessage(message) {
  console.log("Message:", message.data);

  // check if the message is a number
  var num = Number(message.data);
  
  if (! isNaN(num)) {
    // if it *isn't* NaN ("Not a Number"), set the shade:
    y = num;
  }
}
  
function sendMessage(message) {
  // send the message to the server over the websocket.
  socket.send(message);
}


function draw() {
  // draw the increasing y axis value as a line
  set(x, y, color(0));
  updatePixels();
  
  x += 1;
  if (x > width) {
    x = 0;
  }
}

function mousePressed() {
  if (led) {
    sendMessage("off");
    led = false;
  } else {
    sendMessage("on");
    led = true;
  }
}
