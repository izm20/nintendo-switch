export class Joystick {
	constructor (element) {
		this.element = element;
		this.CIR_OFFSET_X = 35.5;
		this.CIR_OFFSET_Y = 40;
		this.RANGE = 2;
		this.ROTATE_RANGE = 2.5;
		this.joyCoordinates = { x: this.element.getBoundingClientRect().left + this.CIR_OFFSET_X, y: this.element.getBoundingClientRect().top + this.CIR_OFFSET_Y };
		this.ORIGIN_JOY_COORDINATES = this.joyCoordinates;
		this.isActive = false;
	}

	update (mouse, self) {
		if (self.isActive) {
			const offsetX = (self.joyCoordinates.x - mouse.x) / -self.RANGE;
			const offsetY = (self.joyCoordinates.y - mouse.y) / -self.RANGE;
			const rotateY = offsetX * self.ROTATE_RANGE;
			const rotateX = offsetY * -self.ROTATE_RANGE;
			self.element.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) perspective(5000rem)`;
			self.updateCoordinates(self);
		} else {
			self.element.style.transform = '';
			self.joyCoordinates.x = self.ORIGIN_JOY_COORDINATES.x;
			self.joyCoordinates.y = self.ORIGIN_JOY_COORDINATES.y;
		}
	}

	updateCoordinates (self) {
		self.joyCoordinates.x = self.element.getBoundingClientRect().left + self.CIR_OFFSET_X;
		self.joyCoordinates.y = self.element.getBoundingClientRect().top + self.CIR_OFFSET_Y;
	}
}
