import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let counter: number = 0;

const gameName = "Boulder Pusher";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🪨";
app.append(button);

button.addEventListener("click", function() {pushBoulder(1)});

const div = document.createElement("dive");
div.innerHTML = counter.toString();
app.append(div);


let  zero: number = performance.now();
let timeElapsed: number;

function incrementBoulder(){
    timeElapsed = performance.now() - zero;
    zero = performance.now();
    pushBoulder(timeElapsed/1000);
    requestAnimationFrame(incrementBoulder);
}

requestAnimationFrame(incrementBoulder);

function pushBoulder(increment: number) {
  counter += increment;
  
  div.innerHTML = Math.trunc(counter).toString();
}
