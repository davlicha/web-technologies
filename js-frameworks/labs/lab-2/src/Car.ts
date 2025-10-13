abstract class Car {
    public readonly brand: string;
    protected model: string;
    private year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    getYear(): number {
        return this.year;
    }

    abstract getDescription(): void;
}

class Ford extends Car {
    private hasSync4: boolean;

    constructor(model: string, year: number, hasSync4: boolean) {
        super("Ford", model, year);
        this.hasSync4 = hasSync4;
    }

    getDescription(): void {
        console.log(
            `Car: ${this.brand} ${this.model}, Year: ${this.getYear()}, Has Sync4: ${this.hasSync4}`
        );
    }
}

class Tesla extends Car {
    public autopilotVersion: string;

    constructor(model: string, year: number, autopilotVersion: string) {
        super("Tesla", model, year);
        this.autopilotVersion = autopilotVersion;
    }

    getDescription(): void {
        console.log(
            `Car: ${this.brand} ${this.model}, Year: ${this.getYear()}, Autopilot: ${this.autopilotVersion}`
        );
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