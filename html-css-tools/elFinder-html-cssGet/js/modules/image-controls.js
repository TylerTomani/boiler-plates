export function initImgToggle() {
	const elementImg = document.getElementById("elementImg");
	const copyCodes = document.querySelectorAll(".version-elements-container .copy-code");
	const toggleBtns = document.querySelectorAll(".black-click-img-box");
	copyCodes.forEach(el => {
		el.addEventListener("keydown", e => {
			if (e.key === "Enter") {
				e.preventDefault();
				const newSrc = el.dataset.img;
				if (newSrc) {
					elementImg.src = newSrc;
					toggleImg();
				}
			}
		});

		el.addEventListener("focus", () => {
			const newSrc = el.dataset.img;
			if (newSrc) elementImg.src = newSrc;
		});
	});

	toggleBtns.forEach(el => {
		el.addEventListener("click", () => {
			const codeEl = el.closest('.code-container')?.querySelector('.copy-code');
			if (!codeEl) return;

			const newSrc = codeEl.dataset.img;
			if (newSrc) {
				elementImg.src = newSrc;
				toggleImg();
				codeEl.focus();
			}
		});
	});

	elementImg?.addEventListener('click', toggleImg);

	function toggleImg() {
		elementImg.classList.toggle('enlarge');
	}
}
