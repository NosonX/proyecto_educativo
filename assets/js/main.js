window.onload = () => {
    // Increase and Decrease buttons
    const decreaseButtons = document.querySelectorAll('button.decrease');
    const increaseButtons = document.querySelectorAll('button.increase');

    const changeInputValue = (event, amount) => {
        const input = event.target.parentNode.querySelector('input');
        const value = parseInt(input.value);
        input.value = value + amount;
    };

    decreaseButtons.forEach((button) => {
        button.addEventListener('click', (event) => changeInputValue(event, -1));
    });

    increaseButtons.forEach((button) => {
        button.addEventListener('click', (event) => changeInputValue(event, 1));
    });

    // Collapsable panel
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach(sectionHeader => {
        sectionHeader.addEventListener('click', (event) => {
            const excerciseContainer = event.target.parentNode.querySelector('.excersices-container');

            if (excerciseContainer.classList.contains('close')) {
                excerciseContainer.classList.remove('close');
            } else {
                excerciseContainer.classList.add('close');
            }
        });
    });

    // Generate Test
    let test = {
        sumas: [],
        restas: [],
        multiplicaciones: [],
        divisiones: []
    };

    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

    const getHtmlExcercise = (index, testKey) => {
        const min = parseInt(document.querySelector('input[name="min"]').value);
        const max = parseInt(document.querySelector('input[name="max"]').value);
        const number1 = getRandomNumber(min, max);
        const number2 = getRandomNumber(min, max);
        const valueToComplete = getRandomNumber(0, 2);
        const numbers = [
            number1,
            number2,
            testKey == 'sumas' ? number1 + number2
            : testKey == 'restas' ? number1 - number2
            : testKey == 'multiplicaciones' ? number1 * number2
            : number1 / number2,
            valueToComplete
        ];
        const operationSymbol = testKey == 'sumas' ? '+'
            : testKey == 'restas' ? '-'
            : testKey == 'multiplicaciones' ? 'x'
            : '/';

        test[testKey].push(numbers);

        const excerciseElement = document.createElement('article');
        excerciseElement.classList.add('excercise');
        let content = `
                <span class="excersiceNumber">${index + 1})</span>
                <p>
                    <span>${valueToComplete == 0 ? null : numbers[0]} ${operationSymbol}&nbsp</span>
                    <span>${valueToComplete == 1 ? null : numbers[1]}</span>
                    <span>&nbsp= ${valueToComplete == 2 ? null : numbers[2]}</span>
                </p>
        `;
        content = content.replace('null', '<input type="number"/>');
        excerciseElement.innerHTML = content;

        return excerciseElement;
    }

    const createExcercises = (key) => {
        const nExcercises = parseInt(document.querySelector('input[name="nExcersices"]').value);
        const excersices = document.getElementById(key).querySelector('.excersices-container');
        excersices.innerHTML = '';

        for (let index = 0; index < nExcercises; index++) {
            const sumas = getHtmlExcercise(index, key);
            excersices.appendChild(sumas);
        }
    }

    const showSections = () => {
        const excersiceTypes = [
            {
                checkbox: document.querySelector('input[type="checkbox"][name="sumas"]'),
                section:  document.getElementById('sumas')
            },
            {
                checkbox: document.querySelector('input[type="checkbox"][name="restas"]'),
                section:  document.getElementById('restas')
            },
            {
                checkbox: document.querySelector('input[type="checkbox"][name="multiplicaciones"]'),
                section:  document.getElementById('multiplicaciones')
            },
            {
                checkbox: document.querySelector('input[type="checkbox"][name="divisiones"]'),
                section:  document.getElementById('divisiones')
            }
        ];


        excersiceTypes.forEach(type => {
            if (type.checkbox.checked) {
                type.section.classList.remove('hide');
                createExcercises(type.checkbox.name)
            } else {
                type.section.classList.add('hide');
            }
        })

        document.querySelector('.calificarBtn').classList.remove('hide');
    }

    const generateTest = (event) => {
        test = {
            sumas: [],
            restas: [],
            multiplicaciones: [],
            divisiones: []
        };
        event.preventDefault();
        showSections();
    }

    const generateButton = document.getElementById('generateTest');
    generateButton.addEventListener('click', generateTest);

    // Get results
    const getResults = () => {
        const results = [];

        Object.keys(test).forEach(key => {
            if (test[key].length) {
                const answers = document.getElementById(key).querySelectorAll('input[type="number"]');

                for (let i = 0; i < answers.length; i++) {
                    const answer = parseInt(answers[i].value);
                    const indexToCompare = test[key][i][3];
                    const value = test[key][i][indexToCompare];
                    const isValid = answer === value;
                    results.push(isValid);

                    if (isValid) {
                        answers[i].parentNode.parentNode.parentNode.classList.remove('wrong');
                        answers[i].parentNode.parentNode.parentNode.classList.add('correct');
                    } else {
                        answers[i].parentNode.parentNode.parentNode.classList.remove('correct');
                        answers[i].parentNode.parentNode.parentNode.classList.add('wrong');
                    }
                }
            }
        });

        const total = results.length;
        const good = results.filter(result => result).length;
        const wrong = results.filter(result => !result).length;
        const nota = good * 100 / total

        alert(`
            Total: ${total}
            Correctas: ${good}
            Incorrectas: ${wrong}
            Nota: ${nota}
        `);
    }

    const getResultsButton = document.getElementById('calificarBtn');
    getResultsButton.addEventListener('click', getResults);
}
