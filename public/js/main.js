// add class to scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".bg-rawg");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

//preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 700);
  }, 700);
});
// menu links active
document.addEventListener("DOMContentLoaded", function () {
  var currentPage = window.location.pathname;
  var menuLinks = document.querySelectorAll(".navbar-nav a");
  menuLinks.forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
