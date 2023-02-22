const grid = document.querySelector('.grid');
const range = document.querySelector('.settings__range');
const label = document.querySelector('.settings__slider label');
const btnApply = document.querySelector('#btnApply');

let defaultSize = Number(range.defaultValue);

label.textContent = defaultSize + ' x ' + defaultSize;
grid.style.gridTemplateColumns = `repeat(${defaultSize}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${defaultSize}, 1fr)`;
createGridItems(defaultSize);

function createGridItems(size) {
    const gridArea = Math.pow(size, 2);

    for (let i = 0; i < gridArea; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid__item');
        grid.appendChild(gridItem);
    }
}

btnApply.addEventListener('click', () => {
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
