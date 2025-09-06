import { initFocusControls } from './modules/focus-controls.js';
import { initImgToggle } from './modules/image-controls.js';
import { addCopyCodes } from './copy-code.js';
const mainCode = document.querySelector('#mainCode');
const nextBrowserTool = document.querySelector('#nextBrowserTool')
const cssGet = 'browser-tool-scripts/cssGet.html'
const elCssSelector = 'browser-tool-scripts/elCssSelector.html'
const browserToolsArr = [elCssSelector,cssGet]
const h3ToolCode = document.querySelector('.tool-code h3')
let iBrowserToolsArr = 0

document.addEventListener("DOMContentLoaded", () => {
	initFocusControls();
	initImgToggle();
	changeBroswerTool(browserToolsArr[iBrowserToolsArr])
	addCopyCodes()
});


nextBrowserTool.addEventListener('keydown', e => {
	let key = e.key.toLowerCase()
	if(key === 'enter'){
		iBrowserToolsArr = (iBrowserToolsArr + 1) % browserToolsArr.length
		changeBroswerTool(browserToolsArr[iBrowserToolsArr])
		
	}
})
function changeBroswerTool(href){
	fetch(href)
	.then(response => response.text())
	.then(html => {
		// const temp = document.createElement('div');
		console.log(html)
		mainCode.innerHTML = ``
		mainCode.innerHTML = html;

		// const newCode = temp.querySelector('.copy-code');
		// mainCode.innerHTML = '';
		// mainCode.appendChild(newCode.closest('pre')); // safely add whole <pre> block

		addCopyCodes(); // now works!
	})
	.catch(() => {
		console.log('no browser tool script');
	});

	switch (iBrowserToolsArr) {
		case 0 :
			h3ToolCode.innerText = 'getUniqueSelector.js' 
			break
			;
		case 1 :
			h3ToolCode.innerText = 'getComputedStylesString.js' 
			const pToolCode = document.querySelector('.tool-code > p') 
			pToolCode.innerHTML = `Gets the CSS styles for the element passed in for <code class="m">$0</code>`
			break;

	}
}
