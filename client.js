class ControlComponent extends React.Component {
  constructor(props) {
    super(props);    
    this.socket = new WebSocket(`ws://${window.location.host}/comm`);
    
    this.socket.addEventListener('close', () => {
      alert("Socket connection to server closed.");
    });
    
    this.socket.addEventListener('message', message => {
      this.handleMessage(message);
    })
  }
  
  handleMessage(message) {
    console.log("Message:", message.data);
    // do something with this data?
  }
  
  sendMessage(message) {
    this.socket.send(message);
  }
  
  render() {
    return <div className="wrapper">
        <button onClick={() => this.sendMessage("forward")}>Fwd</button><br />
        <button onClick={() => this.sendMessage("left")}>Left</button> <button onClick={() => this.sendMessage("right")}>Right</button><br />
        <button onClick={() => this.sendMessage("reverse")}>Back</button>
      </div>
  }
}

ReactDOM.render(
  <ControlComponent />,
  document.getElementById('root')
);

