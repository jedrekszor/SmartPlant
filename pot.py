#!/usr/bin/env python
import serial
import thingspeak
import sys
from datetime import datetime, timedelta
from time import sleep
channelID = 901590
writeKey = 'CGRVU95MW1UUTXW6'
readKey = '7BJKCP38KWKV2C64'
timeout = 0
hour = 0
watchdog = 0
treshold = 0
defaultTreshold = 65

ser=serial.Serial(port='/dev/ttyACM0',
                  baudrate=9600,
                  parity=serial.PARITY_NONE,
                  stopbits=serial.STOPBITS_ONE,
                  bytesize=serial.EIGHTBITS,
                  timeout=0)

channel = thingspeak.Channel(id=channelID, write_key=writeKey, api_key=readKey)

if len(sys.argv) > 1:
	treshold = int(sys.argv[1])
else:
	treshold = defaultTreshold

while 1:
    try:
        sleep(15);
        if timeout == 1:
            if datetime.now() >= hour:
                timeout = 0
        if ser.inWaiting()>0:
            watchdog = 0
            try:
                measure=ser.readline()
                print(measure)
                if measure.strip() == 'PumpOn':
		    print("pump on received")
                    try:
                        response = channel.update({'field1': int(airHum), 'field2': int(airTemp), 'field3': int(soilHum), 'field4': treshold, 'field5': 100})
                    except:
                        print("connection with the cloud failed")
                else:
                    airHum, airTemp, soilHum = measure.split(';')
                    soilHum = int(soilHum)
                    try:
                        response = channel.update({'field1': int(airHum), 'field2': int(airTemp), 'field3': int(soilHum), 'field4': treshold})
                    except:
                        print("connection with the cloud failed")
                    if soilHum < treshold and soilHum > 0 and timeout == 0:
                        ser.write('700')
                        timeout = 1
                        hour = datetime.now() + timedelta(hours=1)
            except:
                print("something wrong with the read")                
        else:
            watchdog = watchdog + 1
            if watchdog >= 3:
                print("no connection with ecoduino")
        
    except KeyboardInterrupt:
        GPIO.cleanup()
        
        
    #write API code CGRVU95MW1UUTXW6
