let array = [];
let isPaused = false;
let isStepMode = false;
let resolveStep;

const container = document.getElementById("array-container");
const explanation = document.getElementById("explanation");

function generateArray() {
    container.innerHTML = "";
    array = [];

    for (let i = 0; i < 15; i++) {
        let value = Math.floor(Math.random() * 300) + 20;
        array.push(value);

        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";
        container.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitIfPaused() {
    while (isPaused) {
        await sleep(100);
    }

    if (isStepMode) {
        await new Promise(resolve => resolveStep = resolve);
    }
}

function pauseSort() {
    isPaused = true;
}

function resumeSort() {
    isPaused = false;
}

function nextStep() {
    if (resolveStep) {
        resolveStep();
        resolveStep = null;
    }
}

async function startSort() {
    isPaused = false;
    isStepMode = true;
    await bubbleSort();
}

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {

            bars[j].classList.add("active");
            bars[j+1].classList.add("active");

            explanation.innerText =
                `Comparing ${array[j]} and ${array[j+1]}`;

            await waitIfPaused();
            await sleep(300);

            if (array[j] > array[j+1]) {

                explanation.innerText =
                    `Swapping ${array[j]} and ${array[j+1]}`;

                // Swap values
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;

                // Swap heights
                bars[j].style.height = array[j] + "px";
                bars[j+1].style.height = array[j+1] + "px";

                await sleep(300);
            }

            bars[j].classList.remove("active");
            bars[j+1].classList.remove("active");
        }

        bars[array.length - i - 1].classList.add("sorted");
    }

    explanation.innerText = "Sorting Completed!";
}
