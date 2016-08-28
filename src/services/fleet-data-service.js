import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';
import {DataError} from './data-errors.js';

export class FleetDataService {

    constructor() {
        this.cars = [];
        this.drones = [];
        this.errors = [];
    }

    filterCarsByMake(filter){
        return this.cars.filter(car => car.make.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    }

    getCarsSortedByLicense() {
        return this.cars.sort(function (a, b) {
            if (a.license < b.license)
                return -1;
            if (a.license > b.license)
                return 1;
            return 0;
        });
    }

    getCarByLicense(license) {
        return this.cars.find(function (car) {
            return car.license === license;
        });
    }

    loadData(fleet) {
        for (let data of fleet) {
            switch (data.type) {
                case 'car':
                    if (this.validateCarData(data)) {
                        let car = this.loadCar(data);
                        if (car) {
                            this.cars.push(data);
                        }
                    } else {
                        let e = new DataError('invalid car data', data);
                        this.errors.push(e);
                    }
                    break;
                case 'drone':
                    if (this.validateDroneData(data)) {
                        let drone = this.loadDrone(data);
                        if (drone) {
                            this.drones.push(data);
                        }
                    } else {
                        let e = new DataError('invalid drone data', data);
                        this.errors.push(e);
                    }
                    break;
                default:
                    let e = new DataError('Invalid vehicle type', data);
                    this.errors.push(e);
                    break;
            }
        }
    }

    loadCar(car) {
        try {
            let c = new Car(car.license, car.model, car.latLong);
            c.miles = car.miles;
            c.make = car.make;
            return c;
        } catch (e) {
            this.errors.push(new DataError('error loading car', car));
        }
        return null;
    }

    loadDrone(drone) {
        try {
            let d = new Drone(drone.license, drone.mode, drone.latLong);
            d.airtimehours = drone.airtimehours;
            d.base = drone.base;
            return d;
        } catch (e) {
            this.errors.push(new DataError('error loading drone', drone));
        }
        return null;
    }

    validateCarData(car) {
        let requiredProperties = 'license model latLong miles make'.split(' ');
        let hasErrors = false;

        for (let field of requiredProperties) {
            if (!car[field]) {
                this.errors.push(new DataError(`invalid field: ${field}`, car));
                hasErrors = true;
            }
        }
        if (Number.isNaN(Number.parseFloat(car.miles))) {
            this.errors.push(new DataError('invalid mileage', car));
            hasErrors = true;
        }
        return !hasErrors;
    }

    validateDroneData(drone) {
        let requiredProperties = 'license type model airtimehours base latLong'.split(' ');
        let hasErrors = false;

        for (let field of requiredProperties) {
            if (!drone[field]) {
                this.errors.push(new DataError(`invalid field: ${field}`, car));
                hasErrors = true;
            }
        }
        if (Number.isNaN(Number.parseFloat(drone.airtimehours))) {
            this.errors.push(new DataError('invalid airtimehours', drone));
            hasErrors = true;
        }
        return !hasErrors;
    }
}