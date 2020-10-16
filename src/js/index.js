import { Joystick } from './Joystick';
import videoMario from '../assets/video/Mario.mp4';
import videoZelda from '../assets/video/Zelda.mp4';
import video12 from '../assets/video/1-2.mp4';
import videoArms from '../assets/video/Arms.mp4';
import videoSnipper from '../assets/video/Snipperclip.mp4';

const leftJoystick = new Joystick(document.querySelector('.left-joycon .joystick'));
const rightJoystick = new Joystick(document.querySelector('.right-joycon .joystick'));
addEvents(leftJoystick, mouseMove);
addEvents(rightJoystick, mouseMove);

const btnHome = document.querySelector('.right-joycon .button-home');
const btnA = document.querySelector('.right-joycon .button-right');
const btnB = document.querySelector('.right-joycon .button-down');

const screen = document.querySelector('.screen');
const video = document.querySelector('.video');
const audioRun = document.querySelector('.runAudio');
const audioHome = document.querySelector('.homeAudio');
const audioOn = document.querySelector('.onAudio');
const audioOff = document.querySelector('.offAudio');


const mouse = { x: 0, y: 0 };

function mouseMove (e, joystick) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	requestAnimationFrame(() => joystick.update(mouse, joystick, screen, { right: moveRight, left: moveLeft }));
};

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

btnHome.addEventListener('click', (e) => {
	if (!screen.classList.contains('opacity')) {
		audioOn.play();
	} else {
		audioOff.play();
	}
	video.pause();
	video.src = '';
	screen.classList.toggle('opacity');
	screen.classList.remove('menu-2', 'menu-3', 'menu-4', 'menu-5');
});

const rightArrow = document.querySelector('.left-joycon .button-arrow-right');
rightArrow.addEventListener('click', (e) => {
	moveRight(screen);
});

const leftArrow = document.querySelector('.left-joycon .button-arrow-left');
leftArrow.addEventListener('click', (e) => {
	moveLeft(screen);
});

function moveRight (screen) {
	if (screen.classList.contains('opacity')) {
		if (!screen.classList.contains('menu-2')) {
			screen.classList.add('menu-2');
		} else {
			if (!screen.classList.contains('menu-3')) {
				screen.classList.add('menu-3');
			} else {
				if (!screen.classList.contains('menu-4')) {
					screen.classList.add('menu-4');
				} else {
					if (!screen.classList.contains('menu-5')) {
						screen.classList.add('menu-5');
					}
				}
			}
		}
	}
}

function moveLeft (screen) {
	if (screen.classList.contains('opacity')) {
		if (screen.classList.contains('menu-5')) {
			screen.classList.remove('menu-5');
		} else {
			if (screen.classList.contains('menu-4')) {
				screen.classList.remove('menu-4');
			} else {
				if (screen.classList.contains('menu-3')) {
					screen.classList.remove('menu-3');
				} else {
					if (screen.classList.contains('menu-2')) {
						screen.classList.remove('menu-2');
					}
				}
			}
		}
	}
}

btnA.addEventListener('click', (e) => {
	if (screen.classList.length === 2) {
		playVideo(videoZelda);
	}
	if (screen.classList.length === 3) {
		playVideo(videoMario);
	}
	if (screen.classList.length === 4) {
		playVideo(video12);
	}
	if (screen.classList.length === 5) {
		playVideo(videoArms);
	}
	if (screen.classList.length === 6) {
		playVideo(videoSnipper);
	}
});

btnB.addEventListener('click', (e) => {
	video.classList.remove('active');
	video.pause();
	audioHome.play();
	setTimeout(() => {
		video.src = '';
	}, 1000);
});

function playVideo (srcVideo) {
	audioRun.play();
	video.pause();
	video.src = srcVideo;
	video.load();
	setTimeout(() => {
		video.play();
	}, 1000);
	video.classList.add('active');
}
