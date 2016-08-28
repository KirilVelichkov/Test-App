import {Page} from './framework/page.js';
import {Image} from './ui/image.js';
import {Button} from './ui/button.js';
import {application} from './app.js';

export class HomePage extends Page{

    constructor(){
        super();
    }

    createElement(){
        super.createElement();

        let i = new Image('./images/drone.png');
        i.appendToElement(this.element);

        let styleString = 'margin:10px; width: 300px; height; 80px; font-size:18px;';
        let b = new Button('My Cars');
        b.setStyleString(styleString);
        b.appendToElement(this.element);
        b.element.click(() => application.activateRoute('Cars'));

        b = new Button('My Drones');
        b.setStyleString(styleString);
        b.appendToElement(this.element);
        b.element.click(() => application.activateRoute('Drones'));
    }

    getElementString(){
        return '<div style="text-align: center;"></div>';
    }
}