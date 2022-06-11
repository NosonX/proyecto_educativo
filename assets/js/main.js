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
    })

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
} 