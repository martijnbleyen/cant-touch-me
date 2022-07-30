import { toDegrees, toRadians } from "./utils.js";

export default class CantTouchMe {
    constructor(el, options = {}) {
        this.el = el;

        this.basePos = this.el.getBoundingClientRect();
        this.elW = this.basePos.width;
        this.elH = this.basePos.height;
        this.baseBgColor = this.el.style.backgroundColor;

        this.setOptions(options);

        CantTouchMe.init();
        CantTouchMe.add(this);
    }

    setOptions(options) {
        this.options = {
            radiusPerc: 125,
            ...options,
        };

        this.radiusX = ((this.elW / 2) * this.options.radiusPerc) / 100;
        this.radiusY = ((this.elH / 2) * this.options.radiusPerc) / 100;
    }

    check(mousePos) {
        // console.log("CHECKING", this);
        const basePos = this.basePos;
        const yPos = basePos.y + basePos.height / 2 - mousePos.y;
        const xPos = basePos.x + basePos.width / 2 - mousePos.x;
        const diagonal = Math.sqrt(Math.pow(xPos, 2) + Math.pow(yPos, 2));

        const radius = Math.abs(yPos) <= this.elH ? this.radiusX : this.radiusY;

        const angle = toDegrees(Math.atan2(yPos, xPos));
        // console.log({ xPos, yPos, diagonal, angle });
        const ballX = (radius - diagonal) * Math.cos(toRadians(angle));
        const ballY = (radius - diagonal) * Math.sin(toRadians(angle));
        requestAnimationFrame(() => {
            if (diagonal > radius) {
                // this.el.style.transform = `translate(0px, 0px)`;
                // this.el.animate({ transform: "translate(0px, 0px)" }, { duration: 300, iterations: 1 });
                const anim = this.el.animate({ transform: "translate(0px, 0px)" }, { duration: 100, iterations: 1 });
                anim.commitStyles();

                this.el.style.backgroundColor = this.baseBgColor;
                this.el.style.zIndex = "unset";
            } else {
                // this.el.style.transform = `translate(${ballX}px, ${ballY}px)`;
                const anim = this.el.animate({ transform: `translate(${ballX}px, ${ballY}px)` }, { duration: 100, iterations: 1 });
                anim.commitStyles();
                this.el.style.backgroundColor = this.options.bgColor;
                this.el.style.zIndex = 4;
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
            // console.log("MOUSE", mousePos);
            // console.log(this.elements);
            this.elements.forEach((el) => {
                // console.log({el});
                el.check(mousePos);
            });
        });
    }
}
