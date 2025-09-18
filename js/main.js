// Mobile menu toggle
const mobileToggle = document.querySelector(".mobile-toggle");
const navMenu = document.querySelector(".nav-menu");

mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Smooth scrolling - FIXED VERSION
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Only prevent default and scroll if it's a valid anchor (not just '#')
    if (href && href !== "#" && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

// Add click outside to close mobile menu
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
    navMenu.classList.remove("active");
  }
});
