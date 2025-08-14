import { mainTargetDiv } from './main-script.js'; // Make sure this path works for your setup
import { letterNav } from './letterNav.js';

/**
 * Inject HTML content from URL into mainTargetDiv.
 * Returns a Promise that resolves when content is injected.
 */
export async function injectContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status}`);
    }
    const html = await response.text();

    // Inject the HTML
    mainTargetDiv.innerHTML = html;

    // Now query the injected DOM
    const h3 = mainTargetDiv.querySelector('.header-codeColor-lesson h3');
    console.log(h3.textContent); // or whatever you want to do with it

    // Optional: call other functions that depend on injected content
    // letterNav();

    return Promise.resolve();
  } catch (error) {
    console.error('Error injecting content:', error);
    return Promise.reject(error);
  }
}
