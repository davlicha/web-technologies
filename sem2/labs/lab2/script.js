function task1(){
    function maxAndMin(array) {
        let max, min;
        max = Math.max.apply(Math, array);
        min = Math.min.apply(Math, array);
        alert('Max: ' + max + ', Min: ' + min);
    }

    function compareObjects(a, b) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        let keys = Object.keys(a);
        for (const key of keys) {
            if (a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    }

    let array = [4, 2, 1, 23, 6, 2, 643, 1234, 6, 8]
    maxAndMin(array);

    let a = {name: "David", color: "Good", age: 18}
    let b = {name: "David", age: 18, color: "Good"}

    compareObjects(a, b);
}

function task2(){
    function isInRange(num, min, max) {
        return num >= min && num <= max;
    }

    function toggleBoolean(value) {
        return !value;
    }

    alert('Is number in range?\n' + isInRange(-1, -4, 5));
    alert('Switched: ' + toggleBoolean(true));
}

function task3(){
    function scoreToString(score) {
        // if (score >= 0 && score < 60) {return 'Незадовільно'}
        // else if (score >= 60 && score < 75) {return 'Задовільно'}
        // else if (score >= 75 && score < 90) {return 'Добре'}
        // else if (score >= 90 && score <= 100) {return 'Відмінно'}
        // else return 'Не існує!';

        return (score >= 0 && score < 60) ? 'Незадовільно' :
            (score >= 60 && score < 75) ? 'Задовільно' :
                (score >= 75 && score < 90) ? 'Добре' :
                    (score >= 90 && score <= 100) ? 'Відмінно' :
                        'Не існує!';
    }

    score = 55;
    alert('Оцінка: ' + scoreToString(score));

    function seasoneByMonth(month) {
        if (month === 'січень' || month === 'грудень' || month === 'лютий') {return 'Зима'}
        else if (month === 'березень' || month === 'квітень' || month === 'травень') {return 'Весна'}
        else if (month === 'червень' || month === 'липень' || month === 'серпень') {return 'Літо'}
        else if (month === 'вересень' || month === 'жовтень' || month === 'листопад') {return 'Осінь'}
        else return 'Не існує такого місяця'

        // return (month === 'січень' || month === 'грудень' || month === 'лютий') ? 'Зима' :
        // (month === 'березень' || month === 'квітень' || month === 'травень') ? 'Весна' :
        // (month === 'червень' || month === 'липень' || month === 'серпень') ? 'Літо' :
        // (month === 'вересень' || month === 'жовтень' || month === 'листопад') ? 'Осінь' :
        // 'Не існує такого місяця';
    }

    month = prompt('Введіть місяць: ');
    alert(seasoneByMonth(month));
}

task1();
task2();
task3();