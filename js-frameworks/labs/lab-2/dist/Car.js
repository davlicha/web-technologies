"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Car {
    brand;
    model;
    year;
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    getYear() {
        return this.year;
    }
}
class Ford extends Car {
    hasSync4;
    constructor(model, year, hasSync4) {
        super("Ford", model, year);
        this.hasSync4 = hasSync4;
    }
    getDescription() {
        console.log(`Car: ${this.brand} ${this.model}, Year: ${this.getYear()}, Has Sync4: ${this.hasSync4}`);
    }
}
class Tesla extends Car {
    autopilotVersion;
    constructor(model, year, autopilotVersion) {
        super("Tesla", model, year);
        this.autopilotVersion = autopilotVersion;
    }
    getDescription() {
        console.log(`Car: ${this.brand} ${this.model}, Year: ${this.getYear()}, Autopilot: ${this.autopilotVersion}`);
    }
}
const fordMustang = new Ford("Mustang", 2022, true);
const fordFocus = new Ford("Focus", 2020, false);
const teslaModelS = new Tesla("Model S", 2023, "v12");
const teslaModel3 = new Tesla("Model 3", 2024, "v12.1");
fordMustang.getDescription();
fordFocus.getDescription();
teslaModelS.getDescription();
teslaModel3.getDescription();
