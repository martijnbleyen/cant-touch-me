const ball = document.getElementById("ball");
const ballWrap = document.getElementById("ballWrap");
// const bgBall = document.getElementById("bgBall");

const basePos = ball.getBoundingClientRect();

const radius = Math.max(basePos.width , basePos.height);
const ballSize = 10;

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

// const line = document.createElement("div");
// line.style.width = "100px";
// line.style.height = "1px";
// line.style.background = "salmon";
// line.style.position = "absolute";
// line.style.top = "50%";
// line.style.left = "50%";
// line.style.zIndex = "50";
// line.style.opacity = 0;
// line.style.transformOrigin = "left center";
// document.body.appendChild(line);

window.addEventListener("mousemove", (e) => {
    // console.log(e);
    // console.log(el.getBoundingClientRect());
    const mousePos = { x: e.clientX, y: e.clientY };
    const yPos = basePos.y + basePos.height / 2 - mousePos.y;
    const xPos = basePos.x + basePos.width / 2 - mousePos.x;
    const diagonal = Math.sqrt(Math.pow(xPos, 2) + Math.pow(yPos, 2));

    const angle = toDegrees(Math.atan2(yPos, xPos));
    console.log({ xPos, yPos, diagonal, angle });
    const ballX = (radius - diagonal) * Math.cos(toRadians(angle));
    const ballY = (radius - diagonal) * Math.sin(toRadians(angle));
    console.log({ xPos, yPos, diagonal, angle });

    // const xClose = xPos < boundry && xPos > -(pos.width + boundry);
    // const yClose = yPos < boundry && yPos > -(pos.height + boundry);
    // const isClose = xClose && yClose;
    requestAnimationFrame(() => {
        if (diagonal > radius) {
            // line.style.backgroundColor = "salmon";
            // bgBall.style.backgroundColor = "#ff99ff";
            ball.style.transform = `translate(0px, 0px)`;
        } else {
            ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
            // line.style.backgroundColor = "green";
            // bgBall.style.backgroundColor = "#99ff99";
        }

        // line.style.width = diagonal + "px";
        // line.style.transform = "rotate(" + (angle - 180) + "deg)";
    });
});

// for (let i = 0; i < 360; i += 15) {
//     let degrees = i;
//     let xCord = Math.cos(toRadians(degrees)) * radius;
//     let yCord = Math.sin(toRadians(degrees)) * radius;
//     console.log({ degrees, xCord, yCord });

//     let el = document.createElement("div");
//     el.style.position = "absolute";
//     el.style.width = ballSize + "px";
//     el.style.height = ballSize + "px";
//     el.style.opacity = "0.3";
//     el.style.marginLeft = radius - ballSize / 2 + "px";
//     el.style.marginTop = radius - ballSize / 2 + "px";
//     el.style.borderRadius = "50%";
//     el.style.backgroundColor = "salmon";
//     el.style.left = xCord + "px";
//     el.style.top = yCord + "px";
//     ballWrap.appendChild(el);
// }

// const xLine = document.createElement("div");
// xLine.style.width = "100vw";
// xLine.style.height = "1px";
// xLine.style.background = "red";
// xLine.style.position = "absolute";
// xLine.style.top = "50%";
// document.body.appendChild(xLine);

// const yLine = document.createElement("div");
// yLine.style.width = "1px";
// yLine.style.height = "100vh";
// yLine.style.background = "red";
// yLine.style.position = "absolute";
// yLine.style.left = "50%";
// document.body.appendChild(yLine);

// const crossLine1 = document.createElement("div");
// crossLine1.style.width = "1px";
// crossLine1.style.height = "100vh";
// crossLine1.style.background = "red";
// crossLine1.style.position = "absolute";
// crossLine1.style.left = "50%";
// crossLine1.style.transform = "rotate(45deg)";
// document.body.appendChild(crossLine1);

// const crossLine2 = document.createElement("div");
// crossLine2.style.width = "1px";
// crossLine2.style.height = "100vh";
// crossLine2.style.background = "red";
// crossLine2.style.position = "absolute";
// crossLine2.style.left = "50%";
// crossLine2.style.transform = "rotate(-45deg)";
// document.body.appendChild(crossLine2);
