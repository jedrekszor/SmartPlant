#include <dht11.h>

#define moisture A2
#define dht11pin 9
dht11 dht;

int airHum;
int airTemp;
int soilHum;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int check;
  check = dht.read(dht11pin);
  airHum = dht.humidity;
  airTemp = dht.temperature;
  soilHum = analogRead(moisture);

  
  Serial.print(airHum);
  Serial.print(";");
  Serial.print(airTemp);
  Serial.print(";");
  Serial.println(soilHum);
  if(Serial.available() > 0)
  {
    turnPump(Serial.read());
  }
  delay(1000);
}

void turnPump(float msec)
{
  Serial.print("pump;On;");
  Serial.println(msec);
  delay(msec);
  Serial.println("pump;Off;fam");
}
