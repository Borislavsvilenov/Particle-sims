const canvas = document.getElementById("simArea");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let canvasColor = "#000000";

ctx.fillStyle = canvasColor;
ctx.fillRect(0, 0, canvasWidth, canvasHeight)