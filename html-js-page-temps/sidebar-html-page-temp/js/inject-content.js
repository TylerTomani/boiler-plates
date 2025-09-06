// inject-content.js
import { mainTargetDiv } from './main-script.js';
import { FocusManager } from './components/focusManager.js';

/**
 * Inject HTML content from a URL into mainTargetDiv.
 * Updates FocusManager with the new steps.
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

    // Grab all .step elements inside the new content
    const steps = mainTargetDiv.querySelectorAll('.step');
    FocusManager.setSteps(steps);

    return Promise.resolve();
  } catch (error) {
    console.error('Error injecting content:', error);
    return Promise.reject(error);
  }
}
