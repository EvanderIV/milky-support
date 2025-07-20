window.mobileAndTabletCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

document.addEventListener("DOMContentLoaded", function () {
  // Skip JS layout changes for troubleshoot page
  const isTroubleshootPage = window.location.pathname.includes("/troubleshoot");

  // Only add mobile class if not on troubleshoot page
  if (!isTroubleshootPage && window.mobileAndTabletCheck()) {
    document.body.classList.add("mobile");
  }

  // Mobile menu functionality (works on all pages)
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Initialize menu state
  let isMenuOpen = false;

  // Toggle menu function
  function toggleMenu(event) {
    event.stopPropagation(); // Prevent event from bubbling
    isMenuOpen = !isMenuOpen;
    navbar.classList.toggle("menu-open", isMenuOpen);
  }

  // Close menu function
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      navbar.classList.remove("menu-open");
    }
  }

  // Add event listeners
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  // Close menu when clicking links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (isMenuOpen) {
        e.stopPropagation(); // Prevent bubbling
        closeMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (isMenuOpen && !navbar.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });

  // Prevent scrolling when menu is open on mobile
  function toggleScrollLock() {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }

  // Update scroll lock when menu state changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        isMenuOpen = navbar.classList.contains("menu-open");
        toggleScrollLock();
      }
    });
  });

  observer.observe(navbar, { attributes: true });

  // Skip animation observer setup for troubleshoot page
  if (!isTroubleshootPage) {
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
  }

  // Handle hero image mask on scroll (skip for troubleshoot page)
  if (!isTroubleshootPage) {
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
  }
});
