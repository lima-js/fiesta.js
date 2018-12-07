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

const buildAgendaItem = (data, index) => `
	<li class="agenda-item">
		<div class="${index % 2 ? 'agenda-content-even' : 'agenda-content-odd'}">
			${data.photo ? `<div class="photo" style="background-image: url(${data.photo});"></div>` : ''}
			<h2 class="title">${data.name}</h2>
			${data.speaker && data.social ? `<p class="speaker"><a class="social" href="${data.social}">${data.speaker}</a></p>` :
			data.speaker ? `<p class="speaker">${data.speaker}</p>` : ''}
			<p class="time">${data.time}</p>
		</div>
	</li>
`;

const agenda = holder => {
	fetch('agenda.json').then(response => response.json())
	.then(data => holder.innerHTML = data.map(buildAgendaItem).join(''));
};

ready(() => {
	const paths = document.querySelectorAll('#blocks path');
	const agendaHolder = document.querySelector('#agenda');
	const agendaScroller = document.querySelector('#agenda-scroller');
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
	agenda(agendaHolder);
	agendaScroller.addEventListener('click', () => {
		animateScrollTo(agendaScroller);
	});
});
