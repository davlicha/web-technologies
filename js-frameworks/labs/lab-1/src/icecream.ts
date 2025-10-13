import promptSync = require('prompt-sync');


const prompt = promptSync();


const SIZES = {
    small: 10,
    large: 25,
};

const TOPPINGS = {
    chocolate: 5,
    caramel: 6,
    berries: 10,
};

const EXTRAS = {
    marshmallow: 5,
};


function calculateIceCreamCost(): void {
    let totalCost: number = 0;

    let size: string;
    while (true) {
        size = prompt("Оберіть розмір (small/large): ").toLowerCase();
        if (size === 'small' || size === 'large') {
            totalCost += SIZES[size];
            break;
        }
        console.log("Будь ласка, введіть 'small' або 'large'.");
    }

    let chosenToppings: string[];
    while (true) {
        const toppingsInput = prompt("Оберіть одну або декілька начинок (chocolate, caramel, berries), через кому: ").toLowerCase();
        chosenToppings = toppingsInput.split(',').map(t => t.trim());

        const validToppings = chosenToppings.filter(t => TOPPINGS.hasOwnProperty(t));

        if (validToppings.length > 0) {
            validToppings.forEach(t => {
                totalCost += TOPPINGS[t as keyof typeof TOPPINGS];
            });
            break;
        }
        console.log("Будь ласка, оберіть хоча б одну дійсну начинку.");
    }

    const addMarshmallow = prompt("Додати маршмелоу? (yes/no): ").toLowerCase();
    if (addMarshmallow === 'yes') {
        totalCost += EXTRAS.marshmallow;
    }

    console.log(`\n------------------------`);
    console.log(`Ваше замовлення:`);
    console.log(`- Розмір: ${size}`);
    console.log(`- Начинки: ${chosenToppings.join(', ')}`);
    if (addMarshmallow === 'yes') {
        console.log(`- Додатково: маршмелоу`);
    }
    console.log(`------------------------`);
    console.log(`✅ Загальна вартість: ${totalCost} грн`);
}

calculateIceCreamCost();