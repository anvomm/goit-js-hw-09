const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

let colorChangeId = null;

refs.startBtn.addEventListener('click', onStartBtnClickColorChange);
refs.stopBtn.addEventListener('click', onStopBtnClickColorChangeStop);

function onStartBtnClickColorChange() {
    colorChangeId = setInterval(() => { document.body.style.backgroundColor = getRandomHexColor(); }, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
};

function onStopBtnClickColorChangeStop() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(colorChangeId);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
