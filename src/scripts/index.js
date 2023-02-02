function testWebP(elem) {
  const WEBP = new Image();
  WEBP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  WEBP.onload = WEBP.onerror = function () {
    WEBP.height === 2
      ? document.body.classList.add("webp")
      : document.body.classList.add("no-webp");
  };
}

const FETCH_URL = "/";

document.addEventListener("DOMContentLoaded", function () {
  testWebP(document.body);

  new Swiper(".swiper-article", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".article-button-next",
      prevEl: ".article-button-prev",
    },
  });
  new Swiper(".swiper-image", {
    slidesPerView: 1.95,
    spaceBetween: 30,
    initialSlide: 1,
    centeredSlides: true,
    navigation: {
      nextEl: ".image-button-next",
      prevEl: ".image-button-prev",
    },
    // // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.95,
        spaceBetween: 10
      },
      576: {
        slidesPerView: 1.95,
        spaceBetween: 30,
      }
    }
  });

  const header = document.getElementById("main-header");
  const tray = document.getElementById("menu-tray");
  const overlay = document.getElementById("overlay");
  const menuLinks = document.getElementsByClassName("menu-click");
  const forms = document.forms;
  const popupBtns = document.querySelectorAll("[data-popup-open]");
  const popupOverlay = document.querySelector("[data-popup-close-all]");
  const popups = document.querySelectorAll("[data-popup-element]");
  const closePopup = document.querySelectorAll("[data-popup-close]");

  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        await fetch(FETCH_URL, {
          method: "POST",
          body: new FormData(forms[i]),
        });
      } catch (e) {
        console.error(e);
      }
    });
  };

  Array.from(popupBtns).forEach((button) => {
    button.addEventListener("click", () => {
      const popupId = button.getAttribute("data-pop-up");
      const popup = document.querySelector(`[data-popup-element=${popupId}]`);
      popupOverlay.classList.add("active");
      popup.classList.add("active");
    });
  });

  Array.from(closePopup).forEach((cls) => {
    cls.addEventListener("click", (e) => {
      if (!!e.target.closest("[data-popup-element]")) {
        e.target.closest("[data-popup-element]").classList.remove("active");
        popupOverlay.classList.remove("active");
      }
    });
  });

  popupOverlay.addEventListener("mousedown", (e) => {
    if (!e.target.closest("[data-popup-element]")) {
      Array.from(popups).forEach((popup) => {
        popupOverlay.classList.remove("active");
        popup.classList.remove("active");
      })
    }
  });

  Array.from(menuLinks).forEach((link) => {
    link.addEventListener("click", () => {
      if (tray.classList.contains("active")) {
        header.classList.remove("open");
        tray.classList.remove("active");
        overlay.classList.remove("active");
      }
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });

  tray.addEventListener("click", () => {
    if (tray.classList.contains("active")) {
      header.classList.remove("open");
      tray.classList.remove("active");
      overlay.classList.remove("active");
    } else {
      header.classList.add("open");
      tray.classList.add("active");
      overlay.classList.add("active");
    }
  });

  
});
