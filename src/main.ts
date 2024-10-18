import "./style.css";

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

const upgrade_1 = document.createElement("button");
upgrade_1.innerHTML = "Buy a Sisyphus: " + 0;
app.append(upgrade_1);

const upgrade_2 = document.createElement("button");
upgrade_2.innerHTML = "Buy a boulder pusher 2: " + 0;
app.append(upgrade_2);

const upgrade_3 = document.createElement("button");
upgrade_3.innerHTML = "Buy a boulder pusher 3: " + 0;
app.append(upgrade_3);

upgrade_1.addEventListener("click", function () {
  buyUpgrade(1);
});
upgrade_1.disabled = true;

upgrade_2.addEventListener("click", function() {
  buyUpgrade(2);
})
upgrade_2.disabled = true;

upgrade_3.addEventListener("click", function() {
  buyUpgrade(2);
})
upgrade_3.disabled = true;

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
  growthNum.innerHTML = "Miles Pushed Per Second: " + growthRate.toFixed(1).toString();

  if (counter >= 10) {
    upgrade_1.disabled = false;
  }
  if (counter >= 100) {
    upgrade_2.disabled = false;
  }
  if (counter >= 1000) {
    upgrade_3.disabled = false;
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
      timesPurchaced1 += 1;
      upgrade_1.innerHTML = "Buy a Sisyphus: " + timesPurchaced1;
      counter -= 10;
      if (counter < 10) {
        upgrade_1.disabled = true;
      }
      growthRate += 0.1;
      break;
    case 2:
      timesPurchaced2 += 1;
      upgrade_2.innerHTML = "Buy a boulder pusher 2: " + timesPurchaced2;
      counter -= 100;
      if(counter < 100){
        upgrade_2.disabled = true;
      }
      growthRate += 2;
      break;
    case 3:
      timesPurchaced3 += 1;
      upgrade_3.innerHTML = "Buy a boulder pusher 3: " + timesPurchaced3;
      counter -= 1000;
      if(counter < 1000){
        upgrade_3.disabled = true;
      }
      growthRate += 50;
    

  }
}
