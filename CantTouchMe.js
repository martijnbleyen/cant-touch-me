export default class CantTouchMe {
    constructor(el, options = {}) {
        this.el = el;

        this.basePos = this.el.getBoundingClientRect();
        this.elW = this.basePos.width;
        this.elH = this.basePos.height;

        this.radiusX = (this.elW / 2) * 1.25;
        this.radiusY = (this.elH / 2) * 1.25;


        CantTouchMe.init();
        CantTouchMe.add(this);
    }

    check(mousePos) {
        console.log("CHECKING", this);
        const basePos = this.basePos;
        const yPos = basePos.y + basePos.height / 2 - mousePos.y;
        const xPos = basePos.x + basePos.width / 2 - mousePos.x;
        const diagonal = Math.sqrt(Math.pow(xPos, 2) + Math.pow(yPos, 2));

        const radius = Math.abs(yPos) <= this.elH ? this.radiusX : this.radiusY;

        const angle = toDegrees(Math.atan2(yPos, xPos));
        console.log({ xPos, yPos, diagonal, angle });
        const ballX = (radius - diagonal) * Math.cos(toRadians(angle));
        const ballY = (radius - diagonal) * Math.sin(toRadians(angle));
        console.log({ xPos, yPos, diagonal, angle });
        requestAnimationFrame(() => {
            if (diagonal > radius) {
                ball.style.transform = `translate(0px, 0px)`;
            } else {
                ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
            }

        });
    }

    static elements = [];
    static isInitialized = false;

    static add(el) {
        this.elements.push(el);
    }

    static init() {
        if (CantTouchMe.isInitialized) return;

        CantTouchMe.isInitialized = true;

        window.addEventListener("mousemove", (e) => {
            const mousePos = { x: e.clientX, y: e.clientY };
            this.elements.forEach((el) => {
                console.log({el});
                el.check(mousePos);
            });
        });
    }
}
