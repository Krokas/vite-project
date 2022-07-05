import Binary from "./Binary";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;
const binary = new Binary();

app.append(binary.getHTML());
