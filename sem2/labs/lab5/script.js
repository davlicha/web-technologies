const checkbox = document.getElementById("lamp-power");
let lamp = document.getElementById("lamp-picture");
let hint = document.getElementById("lamp-hint");


function getLampType() {
    const selected = document.querySelector('input[name="lamp-type"]:checked');
    return selected.id;

}

checkbox.addEventListener("change", (e) => {
    let lampType = getLampType();

    hint.style.display = "none";

    if (checkbox.checked) {
        if (lampType === "regular-lamp") {
            let power = prompt('Please select a power of light ("Regular" or "Full"): ');
            if (power.toLowerCase().trim() === "regular") {
                lamp.className = "lamp1-on";
            }
            else if (power.toLowerCase().trim() === "full") {
                lamp.className = "lamp1-full";
            }
            else {
                lamp.className = "lamp1-off";
                hint.textContent = "Incorrect power.";
                hint.style.display = "block";
            }
        }
        else if (lampType === "cool-lamp") {
            lamp.className = "lamp2-on";
        }
        else if (lampType === "omg-lamp") {
            lamp.className = "lamp3-on";}

    } else {
        if (lampType === "regular-lamp") {
            lamp.className = "lamp1-off";
        }
        else if (lampType === "cool-lamp") {
            lamp.className = "lamp2-off";
        }
        else if (lampType === "omg-lamp") {
            lamp.className = "lamp3-off";
        }
    }
})





let inactivityTime = 10000;
let timeout;

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        lampType = getLampType();
        if (lampType === "regular-lamp") {
            lamp.className = "lamp1-off";
        }
        else if (lampType === "cool-lamp") {
            lamp.className = "lamp2-off";
        }
        else if (lampType === "omg-lamp") {
            lamp.className = "lamp3-off";
        }
        hint.textContent = "Switch off!";
        hint.style.display = "block";
    }, inactivityTime);
}

document.addEventListener("mousemove", resetTimer);
document.addEventListener("keydown", resetTimer);
document.addEventListener("scroll", resetTimer);

resetTimer();


let redTime = 5;
let yellowTime = 3;
let greenTime = 7;

let currentState = "red";

const redLight = document.getElementById("red");
const yellowLight = document.getElementById("yellow");
const greenLight = document.getElementById("green");
const statusDiv = document.getElementById("status");

function changeLight(state) {
    redLight.classList.remove("active");
    yellowLight.classList.remove("active");
    greenLight.classList.remove("active");

    if (state === "red") {
        redLight.classList.add("active");
        statusDiv.textContent = "Червоний";
    } else if (state === "yellow") {
        yellowLight.classList.add("active");
        statusDiv.textContent = "Жовтий";
    } else if (state === "green") {
        greenLight.classList.add("active");
        statusDiv.textContent = "Зелений";
    }
}


function startTrafficLight() {
    changeLight("red");
    setTimeout(() => {
        changeLight("yellow");
        setTimeout(() => {
            changeLight("green");
            setTimeout(() => {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        yellowLight.classList.toggle("active");
                    }, i * 500);
                }
                setTimeout(() => {
                    changeLight("red");
                }, 1500);
            }, greenTime * 1000);
        }, yellowTime * 1000);
    }, redTime * 1000);
}

document.getElementById("startBtn").addEventListener("click", function() {
    startTrafficLight();
});

document.getElementById("nextBtn").addEventListener("click", function() {
    if (currentState === "red") {
        currentState = "yellow";
        changeLight("yellow");
    } else if (currentState === "yellow") {
        currentState = "green";
        changeLight("green");
    } else if (currentState === "green") {
        currentState = "red";
        changeLight("red");
    }
});

document.getElementById("setTimesBtn").addEventListener("click", function() {
    let redInput = prompt("Введіть тривалість червоного світла (секунди):", redTime);
    let yellowInput = prompt("Введіть тривалість жовтого світла (секунди):", yellowTime);
    let greenInput = prompt("Введіть тривалість зеленого світла (секунди):", greenTime);

    if (redInput && !isNaN(redInput) && redInput > 0) {
        redTime = parseInt(redInput);
    }
    if (yellowInput && !isNaN(yellowInput) && yellowInput > 0) {
        yellowTime = parseInt(yellowInput);
    }
    if (greenInput && !isNaN(greenInput) && greenInput > 0) {
        greenTime = parseInt(greenInput);
    }

    alert(`Нова тривалість: червоний - ${redTime} сек, жовтий - ${yellowTime} сек, зелений - ${greenTime} сек`);
});


function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    clock.innerHTML = `${hours}:${minutes}:<span class="blink">${seconds}</span>`;
}

setInterval(updateClock, 1000);

document.getElementById('startTimerBtn').addEventListener('click', function() {
    const endDate = new Date(document.getElementById('timerInput').value);
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date();
        const timeLeft = endDate - now;

        if (timeLeft <= 0) {
            countdownElement.innerHTML = "Таймер завершено!";
            clearInterval(countdownInterval);
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor(timeLeft / (1000 * 60 * 60)) % 24;
            const minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
            const seconds = Math.floor(timeLeft / 1000) % 60;
            countdownElement.innerHTML = `${days} днів, ${hours} год. ${minutes} хв. ${seconds} сек.`;
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});



document.getElementById('countdownBirthdayBtn').addEventListener('click', function() {
    const birthdayInput = document.getElementById('birthdayInput').value;
    const birthday = new Date(birthdayInput);

    if (birthday === "Invalid Date" || !birthdayInput) {
        alert("Введіть правильну дату!");
        return;
    }

    const now = new Date();
    const timeLeft = birthday - now;

    if (timeLeft <= 0) {
        document.getElementById('birthdayCountdown').innerHTML = "Вже святкували!";
    } else {
        const months = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)) % 30;
        const hours = Math.floor(timeLeft / (1000 * 60 * 60)) % 24;
        const minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
        const seconds = Math.floor(timeLeft / 1000) % 60;

        document.getElementById('birthdayCountdown').innerHTML =
            `${months} місяців, ${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд`;
    }
});



const products = new Map();
const orders = new Set();
const productHistory = new WeakMap();
const users = new WeakSet();

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);

    if (name && !isNaN(price) && !isNaN(stock)) {
        const id = Date.now();
        products.set(id, { name, price, stock });
        console.log(`Продукт ${name} додано у каталог.`);
    } else {
        console.log('Будь ласка, введіть коректні дані.');
    }
}

function searchProduct() {
    const searchName = document.getElementById('searchName').value;
    for (let [id, product] of products) {
        if (product.name.toLowerCase().includes(searchName.toLowerCase())) {
            console.log(`Продукт знайдено: ${product.name}, Ціна: ${product.price}, Кількість: ${product.stock}`);
        }
    }
}

function updateProduct() {
    const name = document.getElementById('updateName').value;
    const price = parseFloat(document.getElementById('updatePrice').value);
    const stock = parseInt(document.getElementById('updateStock').value);

    for (let [id, product] of products) {
        if (product.name.toLowerCase() === name.toLowerCase()) {
            product.price = price;
            product.stock = stock;
            console.log(`Продукт ${name} оновлено.`);
            break;
        }
    }
}

function deleteProduct() {
    const name = document.getElementById('deleteName').value;

    for (let [id, product] of products) {
        if (product.name.toLowerCase() === name.toLowerCase()) {
            products.delete(id);
            console.log(`Продукт ${name} видалено.`);
            break;
        }
    }
}

function makeOrder() {
    const name = document.getElementById('orderName').value;
    const quantity = parseInt(document.getElementById('orderQuantity').value);

    for (let [id, product] of products) {
        if (product.name.toLowerCase() === name.toLowerCase()) {
            if (product.stock >= quantity) {
                product.stock -= quantity;
                orders.add({ product: product.name, quantity });
                console.log(`Замовлення на ${quantity} одиниць продукту ${name} оформлено.`);
            } else {
                console.log('Не вистачає товару на складі.');
            }
            break;
        }
    }
}