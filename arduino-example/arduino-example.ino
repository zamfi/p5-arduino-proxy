bool ledState = false;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);

  Serial.begin(115200);
}

void loop() {
  int analogValue = analogRead(A0);
  Serial.println(analogValue);

  digitalWrite(LED_BUILTIN, ledState);

  delay(100);
}

void serialEvent() {
  String input = Serial.readStringUntil('\n');
  input.trim();

  if (input == "on") {
    ledState = true;
  } else if (input == "off") {
    ledState = false;
  }
}
