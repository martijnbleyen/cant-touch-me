# Can't touch me
This class wil make (almost) any dom element untouchable with the mouse.

## Usage

```js
import CantTouchMe from "cant-touch-me";
const ctm = new CantTouchMe( document.getElementById("element") );
```

## Limitations
This class uses transform to update the position so this can't be used on elements that already use transform in any way.

## Todo list
- [ ] Add resize support
- [ ] Add customization options
- [ ] Add Typescript support if there are custom options