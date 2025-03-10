function maxAndMin(array) {
    let max, min;
    max = Math.max.apply(Math, array);
    min = Math.min.apply(Math, array);
    alert('Max: ' + max + ', Min: ' + min);
    alert(max === min);
}

let array = [4, 2, 1, 23, 6, 2, 643, 1234, 6, 8]
maxAndMin(array);

function inRange(num, min, max) {
    return num >= min && num <= max;
}

function toggleBoolean(value) {
    return !value;
}

alert('Number in range?\n' + inRange(-1, -4, 5));
alert(toggleBoolean(true));

function scoreToString(score) {
    if (score >= 0 && score < 60) {return 'Незадовільно'}
    else if (score >= 60 && score < 75) {return 'Задовільно'}
    else if (score >= 75 && score < 90) {return 'Добре'}
    else if (score >= 90 && score <= 100) {return 'Відмінно'}
    else return 'Не існує!';
}

score = 55;
alert('Оцінка: ' + scoreToString(score));