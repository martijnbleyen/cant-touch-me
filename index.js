const el = document.getElementById("block");
const basePos = el.getBoundingClientRect();
const pos = el.getBoundingClientRect();
const boundry = 50;

window.addEventListener("mousemove", (e) => {
    // console.log(e);
    // console.log(el.getBoundingClientRect());
    const mousePos = { x: e.clientX, y: e.clientY };
    const yPos = basePos.y - mousePos.y;
    const xPos = basePos.x - mousePos.x;

    const xClose = xPos < boundry && xPos > -(pos.width + boundry);
    const yClose = yPos < boundry && yPos > -(pos.height + boundry);
    const isClose = xClose && yClose;

    // console.log({ yPos, xPos });
    if (!isClose) {
        el.style.backgroundColor = "red";
    } else {
        el.style.backgroundColor = "green";
    }

    if (isClose) {
        el.style.transform = "translate(" + (boundry - xPos) + "px," + (boundry - yPos) + "px)";
    } else {
        el.style.transform = "translate(0,0)";
    }
});

function animate({ timing, draw, duration }) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction);
        console.log({ progress });

        draw(progress); // draw it

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function makeEaseOut(timing) {
    return function (timeFraction) {
        return 1 - timing(1 - timeFraction);
    };
}

function quad(timeFraction) {
    return Math.pow(timeFraction, 2);
}
function circ(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction));
}
function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
        }
    }
}
const animBlock = document.getElementById("amimBlock");
// setTimeout(() => {
//     animate(
//         {
//             duration: 1000,
//             // timing: quad,
//             timing: circ,
//             draw: (progress) => {
//                 console.log(progress);
//                 animBlock.style.top = progress * 100 + "%";
//                 animBlock.style.transform = "translateY(" + progress * -100 + "px)";
//             },
//         },
//         1000
//     );
// }, 1000);

const blockCount = 200;
const windowWidth = window.innerWidth;
const blockSize = windowWidth / blockCount;
for (let i = 0; i < blockCount; i++) {
    const block = document.createElement("div");
    block.classList.add("anim-block");
    block.style.width = blockSize + "px";
    block.style.height = blockSize + "px";
    block.style.left = i * blockSize + "px";
    block.style.top = "0px";
    document.body.appendChild(block);

    setTimeout(() => {
        animate(
            {
                duration: 1000,
                // timing: quad,
                timing: makeEaseOut(circ),
                draw: (progress) => {
                    block.style.top = progress * 100 + "%";
                    // block.style.transform = "translateY(" + progress * - blockSize + "px)";
                },
            },
            1000
        );
    }, (i * 3) + 1000);
}
