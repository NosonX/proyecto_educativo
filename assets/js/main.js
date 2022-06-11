window.onload = () => {
    const decreaseButtons = document.querySelectorAll('button.decrease');
    const increaseButtons = document.querySelectorAll('button.increase');

    // console.log(decreaseButtons);
    // console.log(increaseButtons);

    const changeInputNumber = (event, increase = false) => {
        const input = event.target.parentNode.querySelector('input');
        const inputValue = parseInt(input.value);
        input.value = increase ? inputValue + 1 : inputValue - 1;
    }

    decreaseButtons.forEach(button => {
        button.addEventListener('click', (event) => changeInputNumber(event));
    })

    increaseButtons.forEach(button => {
        button.addEventListener('click', (event) => changeInputNumber(event, true));
    })
}