import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [];

function createNewItem(name: string, cost: number, rate: number, description: string){
  availableItems.push({name: name, cost: cost, rate: rate, description: description})
}

createNewItem("🫸Buy a Boulder Pusher: " + 0, 10, 0.1, "A simple human stuck pushing a boulder");
createNewItem("🫸Buy a Pushing Machine 5000: " + 0, 100, 2, "A machine built for pushing boulders");
createNewItem("🫸Buy a Sisyphus: " + 0, 1000, 50, "A man doomed to push a boulder for eternity");
createNewItem("🫸Buy an Atlas: " + 0, 5000, 100, "A titan doomed to hold the earth forever, but now pushing a boulder");
createNewItem("Make the Boulder Lighter: " + 0, 100000, 10000, "Lightening the Load");

const app: HTMLDivElement = document.querySelector("#app")!;

//Number of meters boulder is pushed
let counter: number = 0;

const gameName = "Boulder Pusher";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Button to click to push boulder
const button = document.createElement("button");
button.innerHTML = "🪨";
app.append(button);

const buttons: HTMLButtonElement[] = [];

for (const item of availableItems) {
  const tempButton = document.createElement("button");
  tempButton.innerHTML = item.name;
  app.append(tempButton);

  tempButton.addEventListener("click", function () {
    buyUpgrade(availableItems.indexOf(item) + 1);
  });
  tempButton.disabled = true;
  buttons.push(tempButton);
}

//On button click perform push Boulder
button.addEventListener("click", function () {
  pushBoulder(1);
});

const div = document.createElement("div");
div.innerHTML = counter.toString();
app.append(div);

let zero: number = performance.now();
let timeElapsed: number;

const timesPurchased: number[] = [0, 0, 0, 0, 0];

//Growth rate of boulder pushes
let growthRate: number = 0;
const growthNum = document.createElement("div");
growthNum.innerHTML = growthRate.toString();
app.append(growthNum);

//increments boulder by growth rate
function incrementBoulder() {
  timeElapsed = performance.now() - zero;
  zero = performance.now();
  pushBoulder(growthRate * (timeElapsed / 1000));
  growthNum.innerHTML =
    "Miles Pushed Per Second: " + growthRate.toFixed(1).toString();

  updateButtonState();

  requestAnimationFrame(incrementBoulder);
}

function updateButtonState() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled =
      counter < fetchCost(i) * 1.15 ** fetchTimesPurchased(i);
  }
}

function fetchCost(index: number): number {
  const costs = [10, 100, 1000, 5000, 100000];
  return costs[index];
}

function fetchTimesPurchased(index: number): number {
  return timesPurchased[index];
}

requestAnimationFrame(incrementBoulder);

function pushBoulder(increment: number) {
  counter += increment;

  div.innerHTML = Math.trunc(counter).toString();
}

function updateButtonText(buttonIndex: number, timesPurchased: number){
  buttons[buttonIndex].innerHTML = buttons[buttonIndex].innerHTML.split(":")[0] + ": " + (timesPurchased + 1);
}

function deductCost(buttonIndex: number, timesPurchased: number): number {
  const costs = [10, 100, 1000, 5000, 100000];
  return costs[buttonIndex] * 1.15 ** timesPurchased;
}

function updateGrowthRate(upgradeIndex: number): number{
  const growthRates = [0.1, 2, 50, 100, 10000];
  return growthRates[upgradeIndex];
}

function buyUpgrade(upgrade: number){
  const buttonIndex = upgrade -1;
  const cost = deductCost(buttonIndex, timesPurchased[buttonIndex]);

  if (counter >= cost) {
    updateButtonText(buttonIndex, timesPurchased[buttonIndex]);
    counter -= cost;
    timesPurchased[buttonIndex] += 1;
    growthRate += updateGrowthRate(buttonIndex);

    if (counter < cost) {
        buttons[buttonIndex].disabled = true; // Disable button if not enough counter
    }
}
}

