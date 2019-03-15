# country-info

Country-info is app for getting information about your selected location from map.

  - Click to map for seleecting location.
  - If the number of selected areas exceeds seven, first selected are deleted consequently.


### Tech

Location-Activating uses a number of open source projects to work properly:
##### client side
* React js
* react-leaflet
* react-animated-slider
* socket.io-client
* Bootstrap
#####   server side
* Python3
* Flask
* eventlet
* socketio
* reverse_geocode
* countryinfo

### Installation

Location-Activating requires [Node.js](https://nodejs.org/) v4+ and [npm](https://www.npmjs.com/).

Install the dependencies and start the server.
```sh
$ cd country-info/
$ pip install -r requirements.txt
$ python server.py
```
Install the dependencies and start the client.
```sh
$ cd country-info/
$ npm install
$ npm start
```
Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```
or
```sh
localhost:3000
```
