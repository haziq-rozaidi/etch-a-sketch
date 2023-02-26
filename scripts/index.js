const grid = document.querySelector('.grid');
const range = document.querySelector('.settings__range');
const label = document.querySelector('.settings__slider label');
const inputColor = document.querySelector('.settings__color');
const btnNormal = document.querySelector('#btnNormal');
const btnRainbow = document.querySelector('#btnRainbow');
const btnEraser = document.querySelector('#btnEraser');
const btnReset = document.querySelector('#btnReset');

let defaultSize = Number(range.defaultValue);
let isNormal = false;
let isRainbow = false;
let isEraser = false;

// Initialise grid with grid items
label.textContent = defaultSize + ' x ' + defaultSize;
grid.style.gridTemplateColumns = `repeat(${defaultSize}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${defaultSize}, 1fr)`;
createGridItems(defaultSize);

// Activate normal mode
btnNormal.classList.add('btn_active');
isNormal = true;

function createGridItems(size) {
    const gridArea = Math.pow(size, 2);

    for (let i = 0; i < gridArea; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid__item');
        grid.appendChild(gridItem);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function getRandomColor() {
    const color = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
    return color;
}

function changeBackgroundColor(gridItem, isNormal, isRainbow, isEraser) {
    if (isNormal) {
        const color = inputColor.value;
        gridItem.style.backgroundColor = color;
    }
    else if (isRainbow) {
        const color = getRandomColor();
        gridItem.style.backgroundColor = color;
    }
    else if (isEraser) {
        const color = '#FFF';
        gridItem.style.backgroundColor = color;
    }
}

function handleClick(e) {
    const btn = e.target;

    btnNormal.classList.remove('btn_active');
    btnRainbow.classList.remove('btn_active');
    btnEraser.classList.remove('btn_active');

    isNormal = isRainbow = isEraser = false;

    if (btn === btnNormal) {
        btnNormal.classList.add('btn_active');
        isNormal = true;
    }
    else if (btn === btnRainbow) {
        btnRainbow.classList.add('btn_active');
        isRainbow = true;
    }
    else if (btn === btnEraser) {
        btnEraser.classList.add('btn_active');
        isEraser = true;
    }
}

btnNormal.addEventListener('click', handleClick);

btnRainbow.addEventListener('click', handleClick);

btnEraser.addEventListener('click', handleClick);

btnReset.addEventListener('click', () => {
    const size = range.value;
    grid.replaceChildren();
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    createGridItems(size);
});

range.addEventListener('input', (e) => {
    const value = e.target.value;
    label.textContent = value + ' x ' + value;
});

grid.addEventListener('mousedown', (e) => {
    const gridItem = e.target;
    changeBackgroundColor(gridItem, isNormal, isRainbow, isEraser);
})

grid.addEventListener('mouseover', (e) => {
    const gridItem = e.target;
    if (e.buttons === 1) {
        changeBackgroundColor(gridItem, isNormal, isRainbow, isEraser);
    }
});
