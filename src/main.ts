import "./style.css";


interface Item {
  name: string,
  cost: number,
  rate: number
};

const availableItems : Item[] = [
  {name: "🫸Buy a Boulder Pusher: " + 0, cost: 10, rate: 0.1},
  {name: "🫸Buy a Pushing Machine 5000: " + 0, cost: 100, rate: 2},
  {name: "🫸Buy a Sisyphus: " + 0, cost: 1000, rate: 50},
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

for(const item of availableItems){
  const tempButton = document.createElement("button");
  tempButton.innerHTML = item.name;
  app.append(tempButton);

  tempButton.addEventListener("click", function() {
    buyUpgrade(availableItems.indexOf(item) + 1);
  })
  tempButton.disabled = true;
  buttons.push(tempButton);
}
/*
const upgrade_1 = document.createElement("button");
upgrade_1.innerHTML = "🫸Buy a Boulder Pusher: " + 0;
app.append(upgrade_1);

const upgrade_2 = document.createElement("button");
upgrade_2.innerHTML = "🫸Buy a Pushing Machine 5000: " + 0;
app.append(upgrade_2);

const upgrade_3 = document.createElement("button");
upgrade_3.innerHTML = "🫸Buy a Sisyphus: " + 0;
app.append(upgrade_3);


upgrade_1.addEventListener("click", function () {
  buyUpgrade(1);
});
upgrade_1.disabled = true;

upgrade_2.addEventListener("click", function () {
  buyUpgrade(2);
});
upgrade_2.disabled = true;

upgrade_3.addEventListener("click", function () {
  buyUpgrade(3);
});
upgrade_3.disabled = true;
*/

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
      growthRate += 0.1;
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
  }
}
