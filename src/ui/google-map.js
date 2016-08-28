import {BaseElement} from './base-element.js';

export class GoogleMap extends BaseElement {

    constructor(centerOfMap, data) {
        super();
        this.centerOfMap = centerOfMap;
        this.data = data;
        this.map = null;
    }

    createElement() {
        super.createElement();

        setTimeout(() => {
            this.map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: this.centerOfMap
            });
        }, 0);
    }

    getElementString(){
        return `<div style="width:800px; height: 400px;" id="map"></div>`;
    }
}