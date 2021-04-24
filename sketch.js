var socket;

function setup() {
  createCanvas(400, 200);
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

var shade = 220;

function handleMessage(message) {
  console.log("Message:", message.data);

  // check if the message is a number
  var num = Number(message.data);
  
  if (! isNaN(num)) {
    // if it *isn't* NaN ("Not a Number"), set the shade:
    shade = num;
  }
}
  
function sendMessage(message) {
  // send the message to the server over the websocket.
  socket.send(message);
}

const BUTTON_SIZE = 35;
const TEXT_SIZE = 13;

function draw() {
  // draw the button borders
  fill(220);
  stroke(0);
  ellipse(width/2, BUTTON_SIZE, BUTTON_SIZE);
  ellipse(width/2 - BUTTON_SIZE, BUTTON_SIZE*2, BUTTON_SIZE);
  ellipse(width/2 + BUTTON_SIZE, BUTTON_SIZE*2, BUTTON_SIZE);
  ellipse(width/2, BUTTON_SIZE*3, BUTTON_SIZE);

  // draw the button text
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(TEXT_SIZE);
  text("FWD", width/2, BUTTON_SIZE);
  text("LFT", width/2 - BUTTON_SIZE, BUTTON_SIZE*2);
  text("RHT", width/2 + BUTTON_SIZE, BUTTON_SIZE*2);
  text("BCK", width/2, BUTTON_SIZE*3);

  // draw the shaded rectangle
  rectMode(CENTER);
  fill(shade);
  stroke(shade);
  rect(width/2, height*3/4, width/2, BUTTON_SIZE);
}

function mousePressed() {
  // is the click within BUTTON_SIZE pixels of the center of the FWD button?
  if (dist(mouseX, mouseY, width/2, BUTTON_SIZE) < BUTTON_SIZE) {
    sendMessage("forward");
  }
  // ...center of the LFT button
  if (dist(mouseX, mouseY, width/2 - BUTTON_SIZE, BUTTON_SIZE*2) < BUTTON_SIZE) {
    // ... etc
  }
  // other buttons here!
}
