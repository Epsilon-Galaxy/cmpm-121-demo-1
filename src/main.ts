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

button.addEventListener("click", pushBoulder);

const div = document.createElement("dive");
div.innerHTML = counter.toString();
app.append(div);

function pushBoulder(){
    counter++;
    div.innerHTML = counter.toString();
}
