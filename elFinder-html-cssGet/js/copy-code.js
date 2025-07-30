export function addCopyCodes() {
	const codeCopy = document.querySelectorAll('.copy-code');
	
	codeCopy.forEach(copycode => {
		copycode.addEventListener('keydown', e => {
			if (e.metaKey && e.key.toLowerCase() === 'c') {
				e.preventDefault();
				e.stopPropagation();
				animateAndCopy(e);
			}
		});

		copycode.addEventListener('click', e => {
			e.preventDefault();
			e.stopPropagation();
			animateAndCopy(e);
		});

		copycode.addEventListener('focusin', e => {
			if (e.target.classList.contains('long-code')) {
				e.target.scrollIntoView({ block: 'start', inline: 'nearest' });
			}
		});
	});
}

function animateAndCopy(e) {
	const el = e.target;
	el.classList.remove('decopied');
	el.classList.add('copied');

	setTimeout(() => {
		el.classList.remove('copied');
		el.classList.add('decopied');
	}, 250);

	const txt = el.tagName === 'TEXTAREA' ? el.value : el.innerText;
	copyToClipboard(txt);
}

function copyToClipboard(text) {
	navigator.clipboard.writeText(text).catch(err =>
		console.error('Clipboard copy failed:', err)
	);
}

addCopyCodes()