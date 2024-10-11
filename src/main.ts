import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Boulder Pusher";
document.title = gameName;

const button = document.createElement("button");
button.innerHTML = "🪨";
app.append(button);

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
