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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB0ZXN0V2ViUChlbGVtKSB7XHJcbiAgY29uc3QgV0VCUCA9IG5ldyBJbWFnZSgpO1xyXG4gIFdFQlAuc3JjID1cclxuICAgIFwiZGF0YTppbWFnZS93ZWJwO2Jhc2U2NCxVa2xHUmpvQUFBQlhSVUpRVmxBNElDNEFBQUN5QWdDZEFTb0NBQUlBTG1rMG1rMGlJaUlpSWdCb1N5Z0FCYzZXV2dBQS92ZWZmLzBQUDhiQS8vTHdZQUFBXCI7XHJcbiAgV0VCUC5vbmxvYWQgPSBXRUJQLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBXRUJQLmhlaWdodCA9PT0gMlxyXG4gICAgICA/IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIndlYnBcIilcclxuICAgICAgOiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJuby13ZWJwXCIpO1xyXG4gIH07XHJcbn1cclxuXHJcbmNvbnN0IEZFVENIX1VSTCA9IFwiL1wiO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIHRlc3RXZWJQKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICBuZXcgU3dpcGVyKFwiLnN3aXBlci1hcnRpY2xlXCIsIHtcclxuICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICBuZXh0RWw6IFwiLmFydGljbGUtYnV0dG9uLW5leHRcIixcclxuICAgICAgcHJldkVsOiBcIi5hcnRpY2xlLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gIG5ldyBTd2lwZXIoXCIuc3dpcGVyLWltYWdlXCIsIHtcclxuICAgIHNsaWRlc1BlclZpZXc6IDEuOTUsXHJcbiAgICBzcGFjZUJldHdlZW46IDMwLFxyXG4gICAgaW5pdGlhbFNsaWRlOiAxLFxyXG4gICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgIG5leHRFbDogXCIuaW1hZ2UtYnV0dG9uLW5leHRcIixcclxuICAgICAgcHJldkVsOiBcIi5pbWFnZS1idXR0b24tcHJldlwiLFxyXG4gICAgfSxcclxuICAgIC8vIC8vIFJlc3BvbnNpdmUgYnJlYWtwb2ludHNcclxuICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgIC8vIHdoZW4gd2luZG93IHdpZHRoIGlzID49IDMyMHB4XHJcbiAgICAgIDMyMDoge1xyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDEuOTUsXHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMFxyXG4gICAgICB9LFxyXG4gICAgICA1NzY6IHtcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjk1LFxyXG4gICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWhlYWRlclwiKTtcclxuICBjb25zdCB0cmF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51LXRyYXlcIik7XHJcbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3ZlcmxheVwiKTtcclxuICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibWVudS1jbGlja1wiKTtcclxuICBjb25zdCBmb3JtcyA9IGRvY3VtZW50LmZvcm1zO1xyXG4gIGNvbnN0IHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1wb3B1cC1vcGVuXVwiKTtcclxuICBjb25zdCBwb3B1cE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcG9wdXAtY2xvc2UtYWxsXVwiKTtcclxuICBjb25zdCBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtcG9wdXAtZWxlbWVudF1cIik7XHJcbiAgY29uc3QgY2xvc2VQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1wb3B1cC1jbG9zZV1cIik7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGZvcm1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGZldGNoKEZFVENIX1VSTCwge1xyXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgIGJvZHk6IG5ldyBGb3JtRGF0YShmb3Jtc1tpXSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBBcnJheS5mcm9tKHBvcHVwQnRucykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgY29uc3QgcG9wdXBJZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvcC11cFwiKTtcclxuICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wb3B1cC1lbGVtZW50PSR7cG9wdXBJZH1dYCk7XHJcbiAgICAgIHBvcHVwT3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIEFycmF5LmZyb20oY2xvc2VQb3B1cCkuZm9yRWFjaCgoY2xzKSA9PiB7XHJcbiAgICBjbHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgIGlmICghIWUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1wb3B1cC1lbGVtZW50XVwiKSkge1xyXG4gICAgICAgIGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1wb3B1cC1lbGVtZW50XVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIHBvcHVwT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgcG9wdXBPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcclxuICAgIGlmICghZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLXBvcHVwLWVsZW1lbnRdXCIpKSB7XHJcbiAgICAgIEFycmF5LmZyb20ocG9wdXBzKS5mb3JFYWNoKChwb3B1cCkgPT4ge1xyXG4gICAgICAgIHBvcHVwT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIEFycmF5LmZyb20obWVudUxpbmtzKS5mb3JFYWNoKChsaW5rKSA9PiB7XHJcbiAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0cmF5LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xyXG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcclxuICAgICAgICB0cmF5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gMCkge1xyXG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB0cmF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBpZiAodHJheS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcclxuICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xyXG4gICAgICB0cmF5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgICAgdHJheS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIFxyXG59KTtcclxuIl0sImZpbGUiOiJpbmRleC5qcyJ9
