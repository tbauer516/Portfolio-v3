// Do stuff on page load

const navToggle = document.querySelector('#nav-trigger');
const sections = document.querySelectorAll('.section');
const topHeight = 50;

const doResize = () => {
	for (let i = 0; i < sections.length; i++) {
		sections[i].setAttribute('style', 'min-height: ' + (window.innerHeight - ((i !== 0 ? 2 : 1) * topHeight)));
	}
}

window.addEventListener("resize", doResize);

document.addEventListener("DOMContentLoaded", doResize);

// =================================================
// Initialize ScrollSpy ============================
// =================================================

let lastId;
const topMenuHeight = 54;
const menuItems = Array.from(document.querySelectorAll('#sidebar a, #top a.nav'));
const scrollItems = [];
for (let i = 0; i < menuItems.length; i++) {
	scrollItems.push(document.getElementById(menuItems[i].getAttribute('href').slice(1)));
}

// =================================================
// On scroll, see which element is in the viewport =
// =================================================

window.addEventListener("scroll", () => {
	let cur = null;
	for (let i = scrollItems.length - 1; i >= 0; i--) {
		const item = scrollItems[i];
		if (item.getBoundingClientRect().top < topMenuHeight) {
			cur = item;
			break;
		}
	};

	if (lastId !== cur.id) {
		lastId = cur.id;

		for (let i = 0; i < menuItems.length; i++) {
			const item = menuItems[i];
			item.classList.remove('active');
			if (item.getAttribute('href').slice(1) == cur.id)
				item.classList.add('active');
		}
	}

	// console.log(cur);
	
	// cur = cur[cur.length - 1];
	// const id = cur && cur.length ? cur[0].id : "";

	// if (lastId !== id) {
	// 	lastId = id;

	// 	menuItems.map((item) => {
	// 		item.classList.remove('active');
	// 	})
	// 	.filter('[href="#' + id + '"]').addClass('active');
	// }
});

// =================================================
// On In Page Link click, scroll to element ========
// =================================================

menuItems.forEach((item) => {
	item.addEventListener('click', (event) => {
		const hash = event.target.getAttribute('href');
		event.target.blur();

		const elem = document.querySelector(hash);

		elem.scrollIntoView({ behavior: "smooth", block: "start" });
		
		navToggle.checked = false;
		
		event.preventDefault();
		event.returnValue = false;
		return false;
	})
});

// =================================================
// Clipboard.js for copying email to their clipboard
// =================================================

const clipboardTrigger = document.querySelector('#my-email');
const clipboardTooltip = document.querySelector('.tooltip');
const clipboard = new Clipboard(clipboardTrigger, {
	text: () => {
		return 'tbauer16@uw.edu';
	}
});

clipboardTrigger.addEventListener('onClick', (event) => {
	event.preventDefault();
	event.returnValue = false;
	return false;
});

clipboard.on('success', (e) => {
	clipboardTooltip.classList.add('tooltip-active');
	setTimeout(() => {
		clipboardTooltip.classList.remove('tooltip-active');
	}, 2000);
});

clipboard.on('error', (e) => {
	console.log(e);
});