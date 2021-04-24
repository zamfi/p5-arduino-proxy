void setup() {
  Serial.begin(115200);
}

void loop() {
  int analogValue = analogRead(A0);
  Serial.println(analogValue);

  delay(100);
}

void serialEvent() {
  String input = Serial.readStringUntil('\n');
  input.trim();

  if (input == "forward") {
    Serial.println("FORWARD!");
    // go forward
  } else if (input == "left") {
    // go left
  } else if (input == "right") {
    // go right
  } else if (input == "reverse") {
    // go back
  }
}
