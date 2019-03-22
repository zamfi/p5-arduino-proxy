# boxbot-controller
A basic controller app for the Remote Control Cardboard Box

To run the boxbot-controller, first fork this repository, and then clone your copy:

`git clone https://github.com/<your-username>/boxbot-controller`

Then, `cd` into the directory and install the dependencies:

`cd boxbot-controller`

`npm install`

Lastly, run the server with:

`npm start`

The server will try to connect to your Arduino using the `/dev/ttyACM0` name, but if this is incorrect you will need to change this value in `server.js`. Make sure your Arduino is connected before running the server.

Lastly, in [`arduino-snippet.ino`](./arduino-snippet.ino) you will find a `serialEvent` function you can use to handle messages from the browser. Include this in your Arduino sketch!

