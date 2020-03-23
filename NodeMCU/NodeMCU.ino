#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <DHT.h>
#include <TridentTD_LineNotify.h>

// WIFI Config
#define WIFI_SSID "xxxxxxxxx"
#define WIFI_PASSWORD "xxxxxxxxx"
// Firebase config
#define FIREBASE_HOST "xxxxxxxxx"
#define FIREBASE_AUTH "xxxxxxxxx"
// DHT setup
#define DHTPIN D5
#define DHTTYPE DHT22 // DHT 22 (AM2302)
DHT dht(DHTPIN, DHTTYPE);
// Pin
#define LIGHT_SENSOR D6
#define MIC_SENSOR A0
// RGB
#define RED_PIN D1
#define GREEN_PIN D2
#define BLUE_PIN D3
// Light
#define LIGHT D4
// relay
#define RELAY D0

// Sensor variables
float humidity;  // humidity value
float temperature; // temperature celsius value
int light; // light status
int sound; // sound value
int max_sound; // max sound
int loud;
// Time variables
int delay_time; // delay time
// Line
String token; // Line token
int send_time = 0; // Notify Loop time
int set_token = 0; // check set token
int check_time = 0; // check time to send
int tempAlert; // High Temp alert
// Temperature Range
int bottom_range;
int top_range;
// Notify Setting
int notify; // enable or disable notify
int temp; //enable or disable temp
// High Temp
int temp_count = 0; // check time to send
int temp_delay; // wait time to resend temp alert
// relay
int relay1; // relay status
// delay check
int delay_check = 0;
// fristrun
int fristRun = 1;

// Setup
void setup() {
  Serial.begin(9600);
  // pinMode
  pinMode(DHTPIN, INPUT);
  pinMode(LIGHT_SENSOR, INPUT);
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  pinMode(LIGHT, OUTPUT);
  pinMode(RELAY, OUTPUT);
  // Connect WIFI
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("WIFI Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Connected IP: ");
  Serial.println(WiFi.localIP());
  // DHT
  dht.begin();
  // Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  firebaseStatus();
  // Load setting
  loadSetting();
  digitalWrite(LIGHT, HIGH);
}

// Sensor loop
void loop() {
  // Check Update
  checkUpdate();
  if (delay_check >= delay_time) {
    // Read Sensor Data
    DHTread();
    LightRead();
    SoundRead();
    // RGB Display
    RGBdisplay();
    // Firebase update
    firebaseUpdate();
    // Line Notify
    checkLine();
    checkTemp();
    delay_check = 0;
  }
  // Relay
  checkRelay();
  // Delay
  delay_check += 2000;
  delay(2000);
}

void checkUpdate() {
  if (fristRun == 1) {
    loadSetting();
    alertSetting();
    fristRun = 0;
  }
  if (Firebase.getInt("setting/general/update")) {
    loadSetting();
    Firebase.setInt("setting/general/update", 0);
  }
  if (Firebase.getInt("setting/alert/update")) {
    alertSetting();
    Firebase.setInt("setting/alert/update", 0);
  }
}

void loadSetting() {
  // Load delay time
  delay_time = Firebase.getInt("setting/general/delay_time");
  max_sound = Firebase.getInt("setting/general/max_sound");
}

void alertSetting() {
  notify = Firebase.getInt("setting/alert/notify");
  temp = Firebase.getInt("setting/alert/temp");
}

void DHTread() {
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Error Reading DHT!");
  } else {
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C");
    Serial.print(", ");
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.print(" %, ");
  }
}

void LightRead() {
  Serial.print("Light: ");
  if (digitalRead(LIGHT_SENSOR) == 1) {
    Serial.print("Dark");
    light = 0;
  } else {
    Serial.print("Bright");
    light = 1;
  }
}

void SoundRead() {
  long sum = 0;
  for (int i=0; i<100; i++) {
    sum += analogRead(MIC_SENSOR);
  }
  sum = 1024 - (sum/100);
  sound = sum;
  Serial.print(", Sound: ");
  Serial.print(sound);
  if (sound >= max_sound) {
    loud = 1;
    Firebase.setInt("realtime/loud", 1);
    Serial.println(" (loud)");
  } else if (sound <= max_sound) {
    loud = 0;
    Firebase.setInt("realtime/loud", 0);
    Serial.println(" (silent)");
  }
}

void lineSend() {
  String msg = "Status\nTemperature: ";
  // FirstTime
  if (set_token == 0) {
    token = Firebase.getString("setting/line/token");
    send_time = Firebase.getInt("setting/line/send_time");
    LINE.setToken(token);
    set_token = 1;
  }
  // Check update
  if (Firebase.getInt("setting/line/update")) {
    token = Firebase.getString("setting/line/token");
    send_time = Firebase.getInt("setting/line/send_time");
    LINE.setToken(token);
    Firebase.setInt("setting/line/update", 0);
  }
  msg += String(temperature);
  msg += " °C\nHumidity: ";
  msg += String(humidity);
  msg += " %\nLight: ";
  if (LIGHT_SENSOR == 1) {
    msg += "Bright";
  } else {
    msg += "Dark";
  }
  msg += "\nSound: ";
  if (loud == 1) {
    msg += " Loud";
  } else {
    msg += " Slient";
  }
  check_time += delay_time;
  Serial.print("check_time: ");
  Serial.println(check_time);
  if (check_time >= send_time) {
    LINE.notify(msg);
    check_time = 0;
  }
}

void temp_Alert() {
  tempAlert = Firebase.getInt("setting/temp/alert");
  temp_delay = Firebase.getInt("setting/alert/delay");
  temp_count += delay_time;
  Serial.print("temp_count: ");
  Serial.println(temp_count);
  if (temperature >= tempAlert && temp_count >= temp_delay) {
    String msg = "WARNING\n";
    msg += "High Temperature\n";
    msg += "Temperature: ";
    msg += temperature;
    msg += " °C";
    LINE.notify(msg);
    temp_count = 0;
  }
}

void firebaseStatus() {
  if (Firebase.failed()) {
    Serial.print("Firebase Connect Failed : ");
    Serial.println(Firebase.error());
  } else if (Firebase.success()) {
    Serial.println("Firebase Connected");
  }
}

void firebaseUpdate() {
  Firebase.setFloat("realtime/temperature", temperature);
  Firebase.setFloat("realtime/humidity", humidity);
  Firebase.setInt("realtime/light", light);
  Firebase.setInt("realtime/sound", sound);
}

void RGBdisplay() {
  bottom_range = Firebase.getInt("setting/temp/bottom_range");
  top_range = Firebase.getInt("setting/temp/top_range");
  if (temperature > top_range) {
    setRGB(1, 0, 0); // RED Color
  } else if (temperature <= top_range && temperature >= bottom_range) {
    setRGB(0, 1, 0); // GREEN Color
  } else if (temperature < bottom_range) {
    setRGB(0, 0, 1); // BLUE Color
  }
}

void setRGB(int red, int green, int blue) {
  digitalWrite(RED_PIN, red);
  digitalWrite(GREEN_PIN, green);
  digitalWrite(BLUE_PIN, blue);
}

void checkLine() {
  Serial.print("checkLine: ");
  Serial.println(notify);
  if (notify) {
    lineSend();
  }
}

void checkTemp() {
  Serial.print("checkTemp: ");
  Serial.println(temp);
  if (temp) {
    temp_Alert();
  }
}

void checkRelay() {
  relay1 = Firebase.getInt("relay/relay1");
  if (relay1) {
    digitalWrite(RELAY, HIGH);
  } else {
    digitalWrite(RELAY, LOW);
  }
}
