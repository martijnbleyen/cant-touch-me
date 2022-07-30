import CantTouchMe from "./CantTouchMe.js";

const el = document.getElementById("ball");
const ctm = new CantTouchMe(el);

// makeElement(100, 100, 100);

// const size = 100;
// const maxX = Math.ceil(window.innerWidth / size);
// const maxY = Math.ceil(window.innerHeight / size);

// const allElements = [];
// for (let i = 0; i < maxY; i++) {
//     const y = i * size;
//     for (let j = 0; j < maxX; j++) {
//         const x = j * size;
//         makeElement(size, x, y);
//     }
// }

// function makeElement(size, x, y) {
//     const el = document.createElement("div");
//     el.style.width = size + "px";
//     el.style.height = size + "px";
//     el.style.border = "1px solid rgba(255,255,255,0.2)";
//     // el.style.borderRadius = "50%";
//     el.style.backgroundColor = "#000";
//     el.style.position = "absolute";
//     el.style.left = x + "px";
//     el.style.top = y + "px";
//     document.body.appendChild(el);
//     const radius = Math.random() * 150 + 400;
//     const ctm = new CantTouchMe(el, { radiusPerc: radius , bgColor : "#9999ff" });
//     allElements.push(ctm);
//     return el;
// }

// function resizeRadius() {
//     allElements.forEach((el) => {
//         const radius = Math.random() * 500 + 200;
//         el.setOptions({ radiusPerc: radius });
//     });
//     setTimeout(() => {
//         resizeRadius();
//     }, 2000);
// }

// resizeRadius();
