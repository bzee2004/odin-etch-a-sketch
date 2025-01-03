
const contentBox = document.querySelector('#content');
const colorArr = ['red', 'orange', 'yellow', 'lightgreen', 'blue', 'powderblue', 'pink', 'violet', 'peach', 'turquoise'];
let isMouseDown = false;

function generateGrid(numSides) {
    contentBox.style = 
    `
    display: flex;
    flex-wrap: wrap;
    max-width: ${numSides*20}px;
    margin: 50px auto;
    `;

    for (let i = 0; i < numSides*numSides; i++) {
        const box = document.createElement('div');
        box.style = 
        `
        width: 20px;
        height: 20px;
        border: 1px solid black;
        box-sizing: border-box;
        background-color: white;
        `;
        box.id = `box-${i}`;

        const boxDarken = document.createElement('div');
        boxDarken.style = `
        background-color: black;
        opacity: -0.1;
        width: 100%;
        height: 100%;
        `;
        box.appendChild(boxDarken);

        box.onmouseenter = (e) => {
            if (isMouseDown) {
                const colorId = Math.floor(Math.random()*10);
                e.target.style.setProperty('background-color', colorArr[colorId]);
            }
            else if (e.target.style.getPropertyValue('background-color') == 'white') {
                e.target.style.setProperty('background-color', 'lightgray');
            }
        }
        box.onmouseleave = (e) => {
            if (e.target.style.getPropertyValue('background-color') == 'lightgray') {
                e.target.style.setProperty('background-color', 'white');
            }
        }
        box.onmousedown = e => { e.preventDefault(); isMouseDown = true; }
        box.onmouseup = e => { isMouseDown = false; }

        boxDarken.onmouseenter = (e) => {
            if (isMouseDown) {
                const newOpacity = (Number(e.target.style.getPropertyValue('opacity')) + 0.1).toFixed(1);
                e.target.style.setProperty('opacity', `${newOpacity}`);
            }
        }
        contentBox.appendChild(box);
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    contentBox.innerHTML = '';
    const numSides = document.querySelector('#num-squares').value;
    generateGrid(numSides);
})


generateGrid(16);
