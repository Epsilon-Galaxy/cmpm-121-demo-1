import "./style.css";


interface Item {
  name: string,
  cost: number,
  rate: number,
  description: string,
};

const availableItems: Item[] = [
  { name: "🫸Buy a Boulder Pusher: " + 0, cost: 10, rate: 0.1, description: "A simple human stuck pushing a boulder" },
  { name: "🫸Buy a Pushing Machine 5000: " + 0, cost: 100, rate: 2, description: "A machine built for pushing boulders" },
  { name: "🫸Buy a Sisyphus: " + 0, cost: 1000, rate: 50, description: "A man doomed to push a boulder for eternity" },
  { name: "Buy an Atlas: " + 0, cost: 5000, rate: 100, description: "A titan doomed to hold the earth forever, but now pushing a boulder" },
  { name: "Make the Boulder Lighter: " + 0, cost: 100000, rate: 10000, description: "Lighting the load" }
];


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

const buttons: HTMLButtonElement[] = []

for (const item of availableItems) {
  const tempButton = document.createElement("button");
  tempButton.innerHTML = item.name;
  app.append(tempButton);

  tempButton.addEventListener("click", function () {
    buyUpgrade(availableItems.indexOf(item) + 1);
  })
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

let timesPurchaced1: number = 0;
let timesPurchaced2: number = 0;
let timesPurchaced3: number = 0;
let timesPurchaced4: number = 0;
let timesPurchaced5: number = 0;

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

  if (counter >= 10 * 1.15 ** timesPurchaced1) {
    buttons[0].disabled = false;
  }
  if (counter >= 100 * 1.15 ** timesPurchaced2) {
    buttons[1].disabled = false;
  }
  if (counter >= 1000 * 1.15 ** timesPurchaced3) {
    buttons[2].disabled = false;
  }
  if (counter >= 5000 * 1.15 ** timesPurchaced4) {
    buttons[3].disabled = false;
  }
  if (counter >= 100000 * 1.15 ** timesPurchaced5) {
    buttons[4].disabled = false;
  }

  requestAnimationFrame(incrementBoulder);
}

requestAnimationFrame(incrementBoulder);

function pushBoulder(increment: number) {
  counter += increment;

  div.innerHTML = Math.trunc(counter).toString();
}

function buyUpgrade(upgrade: number) {
  switch (upgrade) {
    case 1:
      buttons[0].innerHTML = "🫸Buy a Boulder Pusher: " + (timesPurchaced1 + 1);
      counter -= 10 * 1.15 ** timesPurchaced1;
      timesPurchaced1 += 1;
      if (counter < 10 * 1.15 ** timesPurchaced1) {
        buttons[0].disabled = true;
      }
      growthRate += 0.5;
      break;
    case 2:
      buttons[1].innerHTML = "🫸Buy a Pushing Machine 5000: " + (timesPurchaced2 + 1);
      counter -= 100 * 1.15 ** timesPurchaced2;
      timesPurchaced2 += 1;
      if (counter < 100 * 1.15 ** timesPurchaced2) {
        buttons[1].disabled = true;
      }
      growthRate += 2;
      break;
    case 3:
      buttons[2].innerHTML = "🫸Buy a Sisyphus: " + (timesPurchaced3 + 1);
      counter -= 1000 * 1.15 ** timesPurchaced3;
      timesPurchaced3 += 1;
      if (counter < 1000 * 1.15 ** timesPurchaced3) {
        buttons[2].disabled = true;
      }
      growthRate += 50;
      break;
    case 4:
      buttons[3].innerHTML = "Buy an Atlas: " + (timesPurchaced4 + 1);
      counter -= 5000 * 1.15 ** timesPurchaced4;
      timesPurchaced4 += 1;
      if (counter < 5000 * 1.15 ** timesPurchaced4) {
        buttons[3].disabled = true;
      }
      growthRate += 100;
      break;
    case 5:
      buttons[4].innerHTML = "Make the Boulder Lighter: " + (timesPurchaced5 + 1);
      counter -= 100000 * 1.15 ** timesPurchaced5;
      timesPurchaced5 += 1;
      if (counter < 100000 * 1.15 ** timesPurchaced5) {
        buttons[4].disabled = true;
      }
      growthRate += 10000;
      break;
  }
}
