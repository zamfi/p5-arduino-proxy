// in setup: Serial.begin(115200);

void serialEvent() {
  String input = Serial.readStringUntil('\n');
  input.trim();

  if (input == "forward") {
    // go forward
  } else if (input == "left") {
    // go left
  } else if (input == "right") {
    // go right
  } else if (input == "backwards") {
    // go back
  }
}