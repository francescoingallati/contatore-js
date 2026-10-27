// Chiave unica per localStorage
const STORAGE_KEY = 'valoreContatore';

let count = Number(localStorage.getItem(STORAGE_KEY));

function buildElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

// Mostra e salva il valore
function updateDisplay() {
    valueDisplay.textContent = count;
    localStorage.setItem(STORAGE_KEY, count);
}

// Creazione dell'interfaccia
const appContainer = document.getElementById('app');

const counterCard = buildElement('div', 'counter-container');
const title = buildElement('h1', 'counter-title', 'Contatore');

const valueDisplay = buildElement('div', 'counter-value');
valueDisplay.setAttribute('aria-live', 'polite'); 

const buttonContainer = buildElement('div', 'counter-buttons');

const btnDecrease = buildElement('button', 'btn', '−');
btnDecrease.setAttribute('aria-label', 'Diminuisci il valore di 1');

const btnIncrease = buildElement('button', 'btn', '+');
btnIncrease.setAttribute('aria-label', 'Aumenta il valore di 1');

const resetContainer = buildElement('div', 'counter-reset');
const btnReset = buildElement('button', 'btn-reset', 'Azzera');

// Assemblaggio nel DOM
buttonContainer.append(btnDecrease, btnIncrease);
resetContainer.append(btnReset);
counterCard.append(title, valueDisplay, buttonContainer, resetContainer);
appContainer.append(counterCard);

updateDisplay();

// Eventi
btnIncrease.addEventListener('click', () => {
    count++;
    updateDisplay();
});

btnDecrease.addEventListener('click', () => {
    count--;
    updateDisplay();
});

btnReset.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});