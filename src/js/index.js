import { Joystick } from './Joystick';

const leftJoystick = new Joystick(document.querySelector('.left-joycon .joystick'));
const rightJoystick = new Joystick(document.querySelector('.right-joycon .joystick'));

const mouse = { x: 0, y: 0 };

const mouseMove = function (e, joystick) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	requestAnimationFrame(() => joystick.update(mouse, joystick));
};

addEvents(leftJoystick, mouseMove);
addEvents(rightJoystick, mouseMove);

function addMouseMove (mouseMove, joystick) {
	joystick.isActive = true;
	joystick.element.addEventListener('mousemove', function (e) { mouseMove(e, joystick); });
};

function addEvents (joystick, mouseMove) {
	joystick.element.addEventListener('mousedown', () => addMouseMove(mouseMove, joystick));
	removeEvents(mouseMove, joystick);
}

function removeEvents (mouseMove, joystick) {
	joystick.element.addEventListener('mouseup', () => removeMouseMove(mouseMove, joystick));
	joystick.element.addEventListener('mouseout', () => removeMouseMove(mouseMove, joystick));
}

function removeMouseMove (mouseMove, joystick) {
	joystick.isActive = false;
	joystick.element.removeEventListener('mousemove', function (e) { mouseMove(e, joystick); });
	requestAnimationFrame(() => joystick.update(mouse, joystick));
}
