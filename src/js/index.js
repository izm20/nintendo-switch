const leftJoystick = document.querySelector('.left-joycon .joystick');
const rightJoystick = document.querySelector('.right-joycon .joystick');

const CIR_OFFSET_X = 35.5;
const CIR_OFFSET_Y = 40;
const leftJoy = { x: leftJoystick.getBoundingClientRect().left + CIR_OFFSET_X, y: leftJoystick.getBoundingClientRect().top + CIR_OFFSET_Y };
const LEFT_ORIGIN_JOY = leftJoy;
const rightJoy = { x: rightJoystick.getBoundingClientRect().left + CIR_OFFSET_X, y: rightJoystick.getBoundingClientRect().top + CIR_OFFSET_Y };
const RIGHT_ORIGIN_JOY = rightJoy;
const mouse = { x: 0, y: 0 };
let thumb = false;

const mouseMove = (e, update) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	requestAnimationFrame(update);
};

const addMouseMove = () => {
	thumb = true;
	leftJoystick.addEventListener('mousemove', (e) => mouseMove(e, updateLeft));
	rightJoystick.addEventListener('mousemove', (e) => mouseMove(e, updateRight));
};

leftJoystick.addEventListener('mousedown', addMouseMove);
rightJoystick.addEventListener('mousedown', addMouseMove);

leftJoystick.addEventListener('mouseup', () => {
	thumb = false;
	leftJoystick.removeEventListener('mousemove', (e) => mouseMove(e, updateLeft));
	requestAnimationFrame(updateLeft);
});

rightJoystick.addEventListener('mouseup', () => {
	thumb = false;
	rightJoystick.removeEventListener('mousemove', (e) => mouseMove(e, updateRight));
	requestAnimationFrame(updateRight);
});

leftJoystick.addEventListener('mouseout', () => {
	thumb = false;
	leftJoystick.removeEventListener('mousemove', (e) => mouseMove(e, updateLeft));
	requestAnimationFrame(updateLeft);
});

rightJoystick.addEventListener('mouseout', () => {
	thumb = false;
	rightJoystick.removeEventListener('mousemove', (e) => mouseMove(e, updateRight));
	requestAnimationFrame(updateRight);
});

function updateJoy () {
	leftJoy.x = leftJoystick.getBoundingClientRect().left + CIR_OFFSET_X;
	leftJoy.y = leftJoystick.getBoundingClientRect().top + CIR_OFFSET_Y;
	rightJoy.x = rightJoystick.getBoundingClientRect().left + CIR_OFFSET_X;
	rightJoy.y = rightJoystick.getBoundingClientRect().top + CIR_OFFSET_Y;
}

const RANGE = 2;
const ROTATE_RANGE = 2.5;

function updateLeft () {
	if (thumb) {
		const offsetX = (leftJoy.x - mouse.x) / -RANGE;
		const offsetY = (leftJoy.y - mouse.y) / -RANGE;
		const rotateY = offsetX * ROTATE_RANGE;
		const rotateX = offsetY * -ROTATE_RANGE;
		console.log('y:', rotateX, 'x:', rotateY);
		leftJoystick.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) perspective(5000rem)`;

		updateJoy();
	} else {
		leftJoystick.style.transform = '';
		leftJoy.x = LEFT_ORIGIN_JOY.x;
		leftJoy.y = LEFT_ORIGIN_JOY.y;
	}
}

function updateRight () {
	if (thumb) {
		const offsetX = -(rightJoy.x - mouse.x) / RANGE;
		const offsetY = -(rightJoy.y - mouse.y) / RANGE;
		const rotateY = offsetX * ROTATE_RANGE;
		const rotateX = offsetY * -ROTATE_RANGE;
		console.log('y:', rotateX, 'x:', rotateY);
		rightJoystick.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) perspective(5000rem)`;
		updateJoy();
	} else {
		rightJoystick.style.transform = '';
		rightJoy.x = RIGHT_ORIGIN_JOY.x;
		rightJoy.y = RIGHT_ORIGIN_JOY.y;
	}
}
