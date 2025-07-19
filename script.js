document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-in-scroll, .slide-in-right")
    .forEach((element) => {
      observer.observe(element);
    });

  // Handle hero image mask on scroll
  const heroImage = document.querySelector(".hero-image");
  let lastScrollPosition = 0;
  const scrollThreshold = 300; // Adjust this value to control how quickly the mask appears

  function updateImageMask() {
    const scrollPosition = window.scrollY;
    const maskPosition = Math.max(
      0,
      100 - (scrollPosition / scrollThreshold) * 100
    );
    heroImage.style.setProperty("--mask-position", `${maskPosition}%`);
    lastScrollPosition = scrollPosition;
  }

  window.addEventListener("scroll", () => {
    if (heroImage) {
      window.requestAnimationFrame(updateImageMask);
    }
  });
});
