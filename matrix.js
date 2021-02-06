const columns = getComputedStyle(document.querySelector('.container'))
	.getPropertyValue('grid-template-columns')
	.split(' ').length;

const boxes = Array.from(document.querySelectorAll('.box'));
const displayArea = document.querySelector('.display');

const setSelected = select(display);
const moveTo = startFrom(0);

setSelected(boxes[0]);

function display(item) {
	displayArea.textContent = item.textContent;
}

function select(callback) {
	let selected;
	return function (item) {
		if (selected) {
			selected.classList.remove('selected');
		}
		selected = item;
		selected.classList.add('selected');
		callback(selected);
	};
}

function startFrom(startPoint) {
	let current = startPoint;
	return function (array, step, callback) {
		current += step;
		if (current >= array.length) {
			step = current - array.length;
			current = 0;
			current += step;
		} else if (current < 0) {
			step = current;
			current = array.length;
			current += step;
		}
		callback(array[current]);
		return current;
	};
}

document.addEventListener('keydown', function (e) {
	switch (e.key) {
		case 'ArrowLeft':
			moveTo(boxes, -1, setSelected);
			break;
		case 'ArrowRight':
			moveTo(boxes, 1, setSelected);
			break;
		case 'ArrowDown':
			moveTo(boxes, columns, setSelected);
			break;
		case 'ArrowUp':
			moveTo(boxes, -columns, setSelected);
			break;
		default:
			return;
	}
});