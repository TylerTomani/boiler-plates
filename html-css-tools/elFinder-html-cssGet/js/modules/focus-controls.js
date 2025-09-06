export function initFocusControls() {
	const vibeCode = document.querySelector('#vibeCode');
	const nxtBtn = document.querySelector('#nxtBtn');
	const backBtn = document.querySelector('#backBtn');
	const mainCode = document.querySelector('#mainCode');
	const versionScript = document.querySelector('#versionScript');
	const versionCssSelectorsContainer = document.querySelector('.version-css-selectors-container');
	const copyCodesCssSelector = [...versionCssSelectorsContainer.querySelectorAll('.copy-code')];
	// const copyCodes = document.querySelectorAll('.copy-code')
	const backToTopBtn = document.querySelector('#backToTopBtn');
	
	let iCopy = 0;
	let browserToolsCodeFocus = false;	
	mainCode.addEventListener('focus', () => browserToolsCodeFocus = true);
	mainCode.addEventListener('focusout', () => browserToolsCodeFocus = false);
	// versionScript.addEventListener('keydown', e => {
	// 	if (e.shiftKey && e.key.toLowerCase() === 'b') {
	// 		backBtn.focus();
	// 	}
	// });

	copyCodesCssSelector.forEach((el, idx) => {
		el.addEventListener('focus', () => iCopy = idx);
	});

	document.addEventListener('keydown', e => {
		const key = e.key.toLowerCase();

		// if (browserToolsCodeFocus && !e.shiftKey) return;
		// if (!e.shiftKey) return;

		if (key === 'c') {
			if (e.metaKey) return;
			iCopy = e.shiftKey
				? (iCopy - 1 + copyCodesCssSelector.length) % copyCodesCssSelector.length
				: (iCopy + 1) % copyCodesCssSelector.length;
			copyCodesCssSelector[iCopy]?.focus();

		}
		if (!isNaN(key)) {
			const num = parseInt(key);
			if (num <= copyCodesCssSelector.length) {
				copyCodesCssSelector[num - 1].focus();
			}
		}
		// Focus shortcuts
		switch (key) {
			case 'm':
				mainCode.focus();
			 	break;
			case 'b': backBtn.focus(); break;
			case 'n': 
				if(browserToolsCodeFocus){
					nextBrowserTool.focus()
				} else {

					nxtBtn.focus(); 
				}
			break;
			case 'e': backToTopBtn.focus(); break;
			case 'v': vibeCode.focus(); break;
		}
	});
}

