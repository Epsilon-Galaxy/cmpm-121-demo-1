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
upgrade_1.innerHTML = "Buy a Sisyphus";
app.append(upgrade_1);

upgrade_1.addEventListener("click", function () {
  buyUpgrade(1);
});
upgrade_1.disabled = true;

//On button click perform push Boulder
button.addEventListener("click", function () {
  pushBoulder(1);
});

const div = document.createElement("dive");
div.innerHTML = counter.toString();
app.append(div);

let zero: number = performance.now();
let timeElapsed: number;

//Growth rate of boulder pushes
let growthRate: number = 0;

//increments boulder by growth rate
function incrementBoulder() {
  timeElapsed = performance.now() - zero;
  zero = performance.now();
  pushBoulder(growthRate * (timeElapsed / 1000));

  if (counter >= 10) {
    upgrade_1.disabled = false;
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
      counter -= 10;
      if (counter < 10) {
        upgrade_1.disabled = true;
      }
      growthRate += 1;
  }
}
