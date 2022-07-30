import { toDegrees, toRadians } from "./utils.js";

export default class CantTouchMe {
    constructor(el, options = {}) {
        this.el = el;

        this.basePos = this.el.getBoundingClientRect();
        this.elW = this.basePos.width;
        this.elH = this.basePos.height;

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
        const basePos = this.basePos;
        const yPos = basePos.y + basePos.height / 2 - mousePos.y;
        const xPos = basePos.x + basePos.width / 2 - mousePos.x;
        const diagonal = Math.sqrt(Math.pow(xPos, 2) + Math.pow(yPos, 2));

        const radius = Math.abs(yPos) <= this.elH ? this.radiusX : this.radiusY;

        const angle = toDegrees(Math.atan2(yPos, xPos));
        const elX = (radius - diagonal) * Math.cos(toRadians(angle));
        const elY = (radius - diagonal) * Math.sin(toRadians(angle));
        requestAnimationFrame(() => {
            if (diagonal > radius) {
                const anim = this.el.animate({ transform: "translate(0px, 0px)" }, { duration: 100, iterations: 1 });
                anim.commitStyles();
            } else {
                const anim = this.el.animate({ transform: `translate(${elX}px, ${elY}px)` }, { duration: 100, iterations: 1 });
                anim.commitStyles();
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
                el.check(mousePos);
            });
        });
    }
}
