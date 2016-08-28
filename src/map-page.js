import $ from 'jquery';
import {Page} from './framework/page.js';
import {GoogleMap} from './ui/google-map.js';
import {application} from './app.js';
import {Button} from './ui/button.js';


export class MapPage extends Page {

    constructor() {
        super('Map');
        this.map = null;
        this.markers = [];
    }

    createElement() {
        super.createElement();

        let styleString = 'margin:10px; width: 300px; height; 80px; font-size:18px;';
        let carsButton = new Button('Cars');
        let dronesButton = new Button('Drones');
        let centerOfMap = {
            lat: 40.783661,
            lng: -73.965883
        };
        this.map = new GoogleMap(centerOfMap, application.dataService.cars);
        this.map.appendToElement(this.element);

        carsButton.setStyleString(styleString);
        carsButton.appendToElement(this.element);
        carsButton.element.click(() => this.drop('cars'));

        dronesButton.setStyleString(styleString);
        dronesButton.appendToElement(this.element);
        dronesButton.element.click(() => this.drop('drones'));

    }

    markeri(filter) {
        for (let vehicle of application.dataService[filter]) {
            let [lat, long] = vehicle.latLong.split(' ');

            let myLatLong = new window.google.maps.LatLng(lat, long);

            this.markers.push(new window.google.maps.Marker({
                position: myLatLong,
                map: this.map.map,
                animation: window.google.maps.Animation.DROP
            }));
        }

    }

    clearMarkers() {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
    }

    drop(filter) {
        this.clearMarkers();
        this.markeri(filter);
    }


    getElementString() {
        return `<div style="margin: 20px;"><h3>Map</h3></div>`;
    }
}