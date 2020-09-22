
let allCells = document.querySelectorAll('.cell');
let canvas = document.querySelector('#canvas');
let pixels = document.querySelector('#pixels')
let button = document.querySelector('#btn');
let logo = document.querySelector('#logo');

let body = "";
let newDiv = "";

let totalRowsNeeded = 4;
let cellsPerRow = 4;

let writingToolChecked = "";
let writingTool = "";

let canvasSmall = "height: 250px; width: 250px;";
let canvasMedium = "height: 400px; width: 400px;";
let canvasLarge = "height: 600px; width: 600px;";
let sizeChosen = "";
let canvasSizeChosen = "";
let etchASketchChosen = "";

let newRow = "";
let newCell = "";

let currentRowNumber = 1;
let currentRowName = "";
let currentRow = 0;

let currentCellNumber = 1;
let totalCells = 0;

let colorChecked = '';
let color = '';
let cellOpacity = 0;
let addShade = 0.1;
let newOpacity = 0;

let buttonPressed = 'no';
let time = 0;
let test = 0;
let etchASketchContainer = '';

button.addEventListener('click', shakeScreen);

function shakeScreen() {
    
    if (buttonPressed == 'no') {
        buttonPressed = 'yes';
        runSetup();
    } else {
        etchASketchContainer = document.querySelector('#etch-a-sketch-container');
        etchASketchContainer.classList.add('etch-a-sketch-shake');
        delay();
    };
}

function delay() {
    setTimeout(function() {
        etchASketchContainer.classList.remove('etch-a-sketch-shake');
        runSetup();
    }, 1100)    
}

function runSetup() {    
    button.innerText = 'Press to shake and clear the screen';

    pixels = document.querySelector('#pixels') // set number of pixels

    totalRowsNeeded = pixels.value; // set number of rows
    cellsPerRow = pixels.value; // set number of cells per row

    replaceCanvas(); // replace the canvas with a blank one
    //addLogo(); // add logo

    createDivRows(); // create all the rows on the canvas
    createDivCells(); // create all the cells in the rows

    currentRowNumber = 1; // reset the row number for the next canvas
    allCells = document.querySelectorAll('.cell'); // grab all the cells

    allCells.forEach((cell) => {
        cell.addEventListener('mouseover', colorCell); // start the coloring
    });
};

function replaceCanvas() {
    canvasSize();

    canvas = document.querySelector('#canvas');
    body = canvas.parentElement;
    body.removeChild(canvas);

    newDiv = document.createElement('div');
    newDiv.id = 'canvas';
    newDiv.classList.remove('hidden');
    etchASketchChosen = 'etch-a-sketch-' + sizeChosen;

    newDiv.classList.add(etchASketchChosen);
    newDiv.style = canvasSizeChosen;
    
    body.appendChild(newDiv);
};

function canvasSize() { 
    let x = document.querySelector('input[name="canvas-size"]:checked')
    let y = document.querySelector('#dial-left');
    let z = document.querySelector('#dial-right');
    if (x.value == 'small') {
        canvasSizeChosen = canvasSmall;
        logo.classList = 'logoSmall';
        y.classList = 'dial-left-small';
        z.classList = 'dial-right-small';
        sizeChosen = "small";
    } else if (x.value == 'medium') {
        canvasSizeChosen = canvasMedium;
        logo.classList = 'logoMedium';
        y.classList = 'dial-left-medium';
        z.classList = 'dial-right-medium';
        sizeChosen = "medium";
    } else {
        canvasSizeChosen = canvasLarge;
        logo.classList = 'logoLarge';
        y.classList = 'dial-left-large';
        z.classList = 'dial-right-large';
        sizeChosen = "large";
    }
}

function createDivRows() {
    for (x = 1; x <= totalRowsNeeded; x++) {
        canvas = document.querySelector('#canvas');
        newRow = document.createElement('div');
        newRow.id = "row-" + x;
        newRow.className = "row";
        canvas.appendChild(newRow);
    }
}

function createDivCells() {
    
    colorChecked = document.querySelector('input[name="color"]:checked');
    color = (colorChecked.value);
    
    for (;currentRowNumber <= totalRowsNeeded;) {

        currentRowName = "row-" + currentRowNumber;
        currentRow = document.getElementById(currentRowName);

        newCell = document.createElement('div');
        newCell.id = 'cell-' + currentRowNumber + "-" + currentCellNumber;
        newCell.className = "cell";
        newCell.style.opacity = "0.0";

        if (color == 'random') {
            newCell.style.backgroundColor = randomHSL();
        } else {
            newCell.style.backgroundColor = color;
        }

        currentRow.appendChild(newCell);
        
        currentCellNumber++;
        totalCells++
        
        if ((currentCellNumber - 1) == cellsPerRow) {
            currentRowNumber++;
            currentCellNumber = 1;
        }
    }
    console.log(totalCells);
    totalCells = 0;
}

function randomHSL() {
    let h = randomHue();
    let s = randomPercentage();
    let l = randomPercentage();
    return('hsl(' + h + ', ' + s + '%, ' + l +  '%)');
}

function randomHue() {
    return Math.floor(Math.random() * (360));
}

function randomPercentage () {
    return Math.floor(Math.random() * (101));
}

function colorCell(x) {
    writingToolChecked = document.querySelector('input[name="pen-or-pencil"]:checked');
    writingTool = writingToolChecked.value;
    if (this.style.opacity < 1) {
        if (writingTool == 'pen') {
            newOpacity = 1;
        } else {
            cellOpacity = this.style.opacity;
            newOpacity = parseFloat(cellOpacity) + addShade;
        }
        this.style.opacity = newOpacity;       
    };
};
