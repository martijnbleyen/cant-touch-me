const el = document.getElementById("block");
const basePos = el.getBoundingClientRect();

window.addEventListener("mousemove", (e) => {
	// console.log(e);
	// console.log(el.getBoundingClientRect());
	const pos = el.getBoundingClientRect();
	const mousePos = { x: e.clientX , y : e.clientY };
	const yPos = basePos.y - mousePos.y;
	const xPos = basePos.x - mousePos.x;
	const isClose = (Math.abs(yPos) < 50 && Math.abs(xPos) < 50);

	console.log({yPos,xPos});
	if(!isClose){
		return false;
	}
	
	if( yPos && yPos < 20){
		console.log({yPos});
		el.style.transform = 'translateY(' + (20 - yPos) + 'px)';
	} else if( pos.y - mousePos.y > 20 && pos.y != basePos.y ) {

		console.log(el.style.transform);
		el.style.transform = 'translateY(0)';

	}
})

