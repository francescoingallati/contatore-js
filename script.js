// Chiave unica per localStorage
const STORAGE_KEY = 'contatore-js:valore';

// Stato iniziale: valore salvato, se valido, altrimenti 0
let savedValue = 0;

try {
    savedValue = Number(localStorage.getItem(STORAGE_KEY));
} catch (error) {
    // storage bloccato: si parte da 0
}

let count;

if (Number.isInteger(savedValue)) {
    count = savedValue;
} else {
    count = 0;
}

// Funzioni
function buildElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

function updateDisplay() {
    valueDisplay.textContent = count;
    try {
        localStorage.setItem(STORAGE_KEY, count);
    } catch (error) {
        // storage bloccato: non si salva
    }
}

function changeBy(delta) {
    count += delta;
    updateDisplay();
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
    changeBy(1);
});

btnDecrease.addEventListener('click', () => {
    changeBy(-1);
});

btnReset.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});