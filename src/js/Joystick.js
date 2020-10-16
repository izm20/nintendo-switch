export class Joystick {
	constructor (element) {
		this.element = element;
		this.CIR_OFFSET_X = 23;
		this.CIR_OFFSET_Y = 25;
		this.RANGE = 2;
		this.ROTATE_RANGE = 2.5;
		this.joyCoordinates = { x: this.element.getBoundingClientRect().left + this.CIR_OFFSET_X, y: this.element.getBoundingClientRect().top + this.CIR_OFFSET_Y };
		this.ORIGIN_JOY_COORDINATES = this.joyCoordinates;
		this.isActive = false;
		this.countLeft = 0;
		this.countRight = 0;
	}

	update (mouse, self, screen, moveScreen) {
		if (self.isActive) {
			const offsetX = (self.joyCoordinates.x - mouse.x) / -self.RANGE;
			const offsetY = (self.joyCoordinates.y - mouse.y) / -self.RANGE;
			const rotateY = offsetX * self.ROTATE_RANGE;
			const rotateX = offsetY * -self.ROTATE_RANGE;

			console.log(offsetX, offsetY);
			self.element.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) perspective(5000rem)`;
			self.updateCoordinates(self);

			if (offsetX >= 5) {
				if (self.countRight >= 20) {
					moveScreen.right(screen);
					self.countRight = 0;
				}
				self.countRight++;
			} else if (offsetX <= -6) {
				if (self.countLeft >= 20) {
					moveScreen.left(screen);
					self.countLeft = 0;
				}
				self.countLeft++;
			}
		} else {
			self.element.style.transform = '';
			self.joyCoordinates.x = self.ORIGIN_JOY_COORDINATES.x;
			self.joyCoordinates.y = self.ORIGIN_JOY_COORDINATES.y;
			self.countLeft = 0;
			self.countRight = 0;
		}
	}

	updateCoordinates (self) {
		self.joyCoordinates.x = self.element.getBoundingClientRect().left + self.CIR_OFFSET_X;
		self.joyCoordinates.y = self.element.getBoundingClientRect().top + self.CIR_OFFSET_Y;
	}
}
