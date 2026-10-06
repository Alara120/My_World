// JavaScript voor de tekenfunctie op het canvas
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
const dialog = document.getElementById("sketchbook");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Lijninstellingen
ctx.strokeStyle = "#000000";
ctx.lineWidth = 4;
ctx.lineCap = "round";
ctx.lineJoin = "round";

function getCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return [(e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY];
}

function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = getCoordinates(e);
}

function draw(e) {
  if (!isDrawing) return;
  const [x, y] = getCoordinates(e);

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  [lastX, lastY] = [x, y];
}

function stopDrawing() {
  isDrawing = false;
}

// Pointer events werken voor muis, touch en pen
canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointerleave", stopDrawing);
canvas.addEventListener("pointercancel", stopDrawing);

// Wis knop
document.getElementById("clearBtn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Schetsboek openen
document.getElementById("sketchbook-open").addEventListener("click", () => {
  dialog.showModal();
});

// Sluit knop (kruisje)
document.querySelector(".close-btn").addEventListener("click", () => {
  dialog.close();
});

// Klik op de donkere achtergrond = sluiten
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

// Stop met tekenen als de dialog sluit (ook met Esc)
dialog.addEventListener("close", stopDrawing);
