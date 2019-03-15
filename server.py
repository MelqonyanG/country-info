from flask import Flask
import socketio
import eventlet
import json
import reverse_geocode
from countryinfo import CountryInfo

with open('server_config.json') as json_data_file:
    data_server = json.load(json_data_file)

SERVER = data_server.get('server')

APP = Flask(__name__)
SIO = socketio.Server()

@SIO.on('connect')
def on_connect(sid, data):
    print('user connected ' + sid)

@SIO.on('handleLatLng')
def on_handleLatLng(sid, data):
    coordinates = (data.get('lat'), data.get('lng')),
    location_info = reverse_geocode.search(coordinates)[0]
    country = location_info.get('country')
    try:
        country_info = CountryInfo(country).info()
    except:
        country_info = 'Unknow Country'
    SIO.emit('country_info', {'country_info': country_info,
            'location_info': location_info}, room=sid)

@SIO.on('disconnect')
def on_disconnect(sid):
    print('disconnect ' + sid)

if __name__ == '__main__':
    APP = socketio.Middleware(SIO, APP)
    eventlet.wsgi.server(eventlet.listen((SERVER.get('host'), SERVER.get('port'))), APP)
