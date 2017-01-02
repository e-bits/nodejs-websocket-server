#include <Adafruit_NeoPixel.h>
#include <ArduinoJson.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#define SOCKETIOCLIENT_USE_SSL
#include <SocketIoClient.h>

#define USE_SERIAL Serial
#define PIN            D2
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(1, PIN, NEO_GRB + NEO_KHZ800);

ESP8266WiFiMulti WiFiMulti;
SocketIoClient webSocket;
int _ledID = 2;

void setup()
{
  USE_SERIAL.begin(115200);

  for (uint8_t t = 4; t > 0; t--)
  {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  pixels.begin();
  pixels.setPixelColor(0, 0);
  pixels.setBrightness(50);
  pixels.show();

  WiFiMulti.addAP("Olymp", "crux896#seat");

  while (WiFiMulti.run() != WL_CONNECTED)
  {
    delay(100);
  }

  webSocket.on("ledon", ledOnEvent);
  webSocket.on("ledoff", ledOffEvent);
  webSocket.on("connect", connectEvent);

  webSocket.begin("esp8266-websocket.apps.inderbitzin.io", 80, "/socket.io/?transport=websocket");
}

void loop()
{
  webSocket.loop();
}

void ledOnEvent(const char * payload, size_t length)
{
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(payload);

  int ledID = root["ledid"];
  int ledColor = root["ledcolor"];

  if (ledID == _ledID)
  {
    pixels.setPixelColor(0, ledColor);
    pixels.show();
  }
}

void ledOffEvent(const char * payload, size_t length)
{
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(payload);

  int ledID = root["ledid"];

  if (ledID == _ledID)
  {
    pixels.setPixelColor(0, 0);
    pixels.show();
  }
}

void connectEvent(const char * payload, size_t length)
{
  USE_SERIAL.printf("Successfully connected!");
}
