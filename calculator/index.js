const resultElement = document.querySelector('.js-result-input');
const computeChoices = ['+', '-','*','/'];
const numberArr = ['1', '2','3','4','5','6','7','8','9',]
const resultPixel = document.querySelector('.js-result-input');
let currentNumber = '';
let justComputed = false;
let pixelResultLength = parseFloat(window.getComputedStyle(resultPixel).fontSize);
let totalLength = '';

window.addEventListener('DOMContentLoaded', ()=> {resultElement.focus();});

function updateNumber(selectedButton) {
  let text = resultElement.value;
  let lastChar = text.at(-1);
  let splitText = text.split(/[+\-*/]/);
  let currentPart = splitText.at(-1);
  computeResultLength();
  if (justComputed) {
    if(!computeChoices.includes(selectedButton)) {
      clear();
    }
    justComputed = false;
  }
  if (selectedButton === '.' && currentPart.includes('.')) {
    return;
  }
  if (selectedButton === '=' && currentNumber === '') {
    return;
  }
  if (currentNumber ==='' && computeChoices.includes(selectedButton)) {
    return;
  }
  if (selectedButton === '0' && currentNumber ==='0' ) {
    return;
  }
  if (currentNumber === '0' && numberArr.includes(selectedButton)) {
    text = text.slice(0, -1);
    currentNumber = text;
  }
  else if (computeChoices.includes(lastChar)) {
    if (lastChar ==='+' && selectedButton === '+') {
      return;
    }
    else if (lastChar === '-' && selectedButton === '-') {
      return;
    }
    else if (lastChar === '*' && selectedButton === '*') {
      return;
    }
    else if (lastChar === '/' && selectedButton === '/') {
      return;
    }
    else {
      if (computeChoices.includes(selectedButton)) {
        text = text.slice(0, -1);
        currentNumber = text;
      }
    }
  }
  if(selectedButton === 'Clear') {
    clear();
    return;
  }
  if (selectedButton !== '=') {
    resultElement.value = `${String(currentNumber||'') + String(selectedButton)}`;
    currentNumber = resultElement.value;
  }
  else if (computeChoices.includes(lastChar) && lastChar !== '.') {
    return;
  }
  else {
    compute();
  }
  checkFont();
}

function compute() {
  let computeResult = eval(currentNumber);
  currentNumber = String(computeResult);
  resultElement.value = computeResult;
  justComputed = true;
  checkFont();
}

function clear() {
  resultElement.value = '';
  currentNumber = '';
  clearResultLength();
  checkFont();
}

function computeResultLength() {
  totalLength = Number(pixelResultLength + totalLength);
}

function clearResultLength() {
  totalLength = 0;
}

function checkFont() {
  if (totalLength < 300) {
    resultPixel.style.fontSize = '25px';
  }
  else if ( totalLength >= 300 && totalLength < 400) {
    resultPixel.style.fontSize = '20px';
  }
  resultElement.selectionStart = resultElement.selectionEnd = resultElement.value.length;
  resultElement.scrollLeft = resultElement.scrollWidth;
}

function deleteChar() {
  currentNumber = currentNumber.slice(0, -1);
  resultElement.value = currentNumber;
  checkFont();
  totalLength = Number(totalLength - pixelResultLength);
}

resultElement.addEventListener('keydown', (e) => {
  const allowedKeys = '0123456789+-*/.';
  const controlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

  if (!allowedKeys.includes(e.key) && !controlKeys.includes(e.key)) {
    e.preventDefault(); 
  }
});


/*
let fruits = 'banana,orange,apple';
let fruitsArr = fruits.split(',');
console.log(fruitsArr);
*/