// From npm/document-ready
function ready(callback) {
	if (typeof document === 'undefined') {
		throw new Error('document-ready only runs in the browser');
	}
	let state = document.readyState;
	if (state === 'complete' || state === 'interactive') {
		return setTimeout(callback, 0);
	}

	document.addEventListener('DOMContentLoaded', function onLoad() {
		callback();
	});
}

ready(() => {
	const paths = document.querySelectorAll('#blocks path');
	const paint = (node, opacity) => node.setAttribute('fill-opacity', opacity);
	const randomValue = (max, min = 1) => Math.floor(Math.random() * max) + min;
	const randomId = () => randomValue(paths.length - 1);
	const randomTimeout = () => randomValue(1000, 500);
	const randomOpacity = () => randomValue(10, 4) / 10;

	const painter = () => {
		const ids = [...Array(10)].map(() => randomId());
		let iterator = paths.length;
		while (iterator--) {
			paint(paths[iterator], 0.4);
		}
		ids.forEach(id => paint(paths[id], randomOpacity()));
		setTimeout(painter, randomTimeout());
	};

	painter();
});
