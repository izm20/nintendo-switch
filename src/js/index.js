const win = { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight };

window.addEventListener('resize', function () {
	win.width = document.documentElement.clientWidth;
	win.height = document.documentElement.clientHeight;
});
const leftJoystick = document.querySelector('.left-joycon .joystick');
const joy = { x: leftJoystick.getBoundingClientRect().left + 35.5, y: leftJoystick.getBoundingClientRect().top + 40 };
const ORIGIN_JOY = joy;
const mouse = { x: 0, y: 0 };
let thumb = false;

const mouseMove = (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	requestAnimationFrame(update);
};

const addMouseMove = () => {
	thumb = true;
	leftJoystick.addEventListener('mousemove', mouseMove);
};

leftJoystick.addEventListener('mousedown', addMouseMove);

leftJoystick.addEventListener('mouseup', () => {
	thumb = false;
	leftJoystick.removeEventListener('mousemove', mouseMove);
	requestAnimationFrame(update);
});

leftJoystick.addEventListener('mouseout', () => {
	thumb = false;
	leftJoystick.removeEventListener('mousemove', mouseMove);
	requestAnimationFrame(update);
});

function updateJoy () {
	joy.x = leftJoystick.getBoundingClientRect().left + 35.5;
	joy.y = leftJoystick.getBoundingClientRect().top + 40;
}

const RANGE = 3;

function update () {
	if (thumb) {
		const offsetX = -(joy.x - mouse.x) / RANGE;
		const offsetY = -(joy.y - mouse.y) / RANGE;
		const xRotate = Math.abs(offsetX * 2);
		const yRotate = Math.abs(offsetY * 2);
		console.log('y:', yRotate, 'x:', xRotate);
		leftJoystick.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px) rotateY(${xRotate}deg) rotateX(${yRotate}deg) perspective(5000rem)`;
		updateJoy();
	} else {
		leftJoystick.style.transform = ``;
		joy.x = ORIGIN_JOY.x;
		joy.y = ORIGIN_JOY.y;
	}
}
