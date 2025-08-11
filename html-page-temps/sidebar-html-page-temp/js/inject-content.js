import { mainTargetDiv } from './main-script.js'; // Make sure this path works for your setup

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
    mainTargetDiv.innerHTML = html;
    return Promise.resolve();
  } catch (error) {
    console.error('Error injecting content:', error);
    return Promise.reject(error);
  }
}
