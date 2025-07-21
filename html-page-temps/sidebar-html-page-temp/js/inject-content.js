// js/inject-content.js
document.addEventListener("DOMContentLoaded", () => {
  const mainTargetDiv = document.querySelector("#mainTargetDiv");

  const sidebarLinks = document.querySelectorAll(".side-bar a[href]");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      const href = link.getAttribute("href");
      if (!href || !mainTargetDiv) return;

      try {
        const response = await fetch(href);
        if (!response.ok) throw new Error(`Failed to load ${href}`);

        const html = await response.text();
        mainTargetDiv.innerHTML = html;
        mainTargetDiv.setAttribute("data-href", href);
      } catch (err) {
        console.error("Injection error:", err);
        mainTargetDiv.innerHTML = `<p class="error">Could not load ${href}</p>`;
      }
    });
  });

  // Optionally auto-load default if specified
  const defaultHref = mainTargetDiv.getAttribute("data-href");
  if (defaultHref) {
    document.querySelector(`.side-bar a[href="${defaultHref}"]`)?.click();
  }
});
