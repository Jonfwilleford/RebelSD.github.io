document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item a");
  const indicator = document.querySelector(".nav-indicator");
  const tabHeader = document.querySelector(".tab-header");
  const tabContent = document.querySelector("#tab-content");

  // Move the indicator under active nav item
  function moveIndicatorTo(element) {
    const offsetTop = element.offsetTop;
    indicator.style.top = offsetTop + "px";
  }

  // Set active nav item and indicator
  function setActiveNav(clickedLink) {
    navItems.forEach(link => {
      const li = link.parentElement;
      if (link === clickedLink) {
        li.classList.add("active");
        moveIndicatorTo(li);
      } else {
        li.classList.remove("active");
      }
    });
  }

  // Load HTML file content into the right sidebar
  async function loadContent(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const html = await response.text();
      tabHeader.textContent = url.replace(".html", "").charAt(0).toUpperCase() + url.replace(".html", "").slice(1);
      tabContent.innerHTML = html;
    } catch (error) {
      tabHeader.textContent = "Error";
      tabContent.innerHTML = `<p>Could not load content: ${error.message}</p>`;
    }
  }

  navItems.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const url = link.getAttribute("href");

      setActiveNav(link);
      loadContent(url);

      // Optional: update URL hash for bookmarking
      const hash = "#" + url.replace(".html", "");
      history.pushState(null, "", hash);
    });
  });

  // On page load, load content based on URL hash or default to home.html
  function initialLoad() {
    const hash = window.location.hash.substring(1) || "home";
    const url = `${hash}.html`;

    // Find matching nav link
    const initialLink = Array.from(navItems).find(link => link.getAttribute("href") === url) || navItems[0];
    setActiveNav(initialLink);
    loadContent(url);
  }

  // Handle browser back/forward buttons
  window.addEventListener("popstate", () => {
    const hash = window.location.hash.substring(1) || "home";
    const url = `${hash}.html`;
    const link = Array.from(navItems).find(link => link.getAttribute("href") === url) || navItems[0];
    setActiveNav(link);
    loadContent(url);
  });

  initialLoad();

  // Animate boxes sliding in
  const leftBox = document.querySelector(".left-box");
  const rightBox = document.querySelector(".right-box");
  const topBox = document.querySelector(".top-box");
  const bottomBox = document.querySelector(".bottom-box");

  // Slight delay so CSS transition triggers smoothly
  setTimeout(() => {
    leftBox.classList.add("active");
    rightBox.classList.add("active");
    topBox.classList.add("active");
    bottomBox.classList.add("active");
  }, 100);

  // Set initial indicator position
  const activeItem = document.querySelector(".nav-item.active") || navItems[0];
  moveIndicatorTo(activeItem);
  updateContent(activeItem.textContent);
});
